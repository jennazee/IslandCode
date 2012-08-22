#!/usr/bin/python

import re, sys, string, urllib2

local_file = 'data.txt'

def get_data_file(url, data=None, headers={}):
	req = urllib2.Request(url=url)
	for key in headers:
		req.add_header(key, headers[key])
	site = urllib2.urlopen(req)
	data = site.read()
	headers = site.info()
	site.close()
	output = open(local_file, 'w')
	output.write(data)
	output.close()
	return data, headers

def parse_results_file(filename):
	"""
	This method takes in a results file created by ibex, and strips
	out the comments
	"""
	file = open(filename, 'r')
	pretext=[line for line in file.readlines() if line.strip()]
	file.close()

	text = []
	processed = []
	languages = 'NONE'
	ID = 'NONE'
	
	moreheader = raw_input('Extra header labels from question field (e.g.: item,condition,factor1,factor2): ')
	stim_type = raw_input('What type are your stims? (i.e. AcceptabilityJudgment): ')
	output_loc = raw_input('Where would you like to put your parsed file? (enter filename path): ')
	
	for line in pretext:
		if re.match('#', line):
			continue
		else:
			text.append(line)

	#skip is 0 until we reach an "Acceptability Judgment line"
	first = 1;

	for line in range(len(text)):
		#get their info
		if re.search('Form', text[line]):
			if re.search('number', text[line]):
				ID = re.split('number,', text[line])[1].strip()
			elif re.search('age', text[line]):
				languages = re.split('age,', text[line])[1].strip()
		if re.search('AcceptabilityJudgment', text[line]):
			if first:
				#print 'first'
				processed.append(str(ID+ ','+languages+','+text[line]))
				first=0
			else:
				toAmend = processed.pop()
				#print str('toAmend: ' + toAmend)
				toAdd=''
				splits = re.split('NULL,', text[line])
				for thing in splits[1:]:
					if thing is not '':
						toAdd = str(toAdd + ',' + thing.strip(','))
				#print str('toAdd: ' + toAdd)
				processed.append(str(toAmend.strip()+ toAdd))
				first = 1
		#if the line is a question line, there's more to append
		if re.search('Question', text[line]):
			toAmend = processed.pop()
			part = re.split('\$', text[line])[1]
			part.strip('$')
			parts = part.split('%2C')
			processed.append(str(toAmend.strip()+ ','+ string.join(parts, ',')+'\n'))
			
	output = open(output_loc, 'w')

	header = 'ID,Languages,Time sent,MD5 Hash of IP Address,Controller,Item Number,Element Number,Type,Group,Stimulus,Answer,RT,'

	output.write(str(header+moreheader+'\n'))

	for line in processed:
		output.write(line)
	output.close()



#########################################

online = raw_input('Is your data file on the internet? (y/n): ')
print online == 'y'
if online is 'y':
	online_file = raw_input('What\'s the URL where is your data file located?: ')
	local_file = raw_input('Where would you like to put your raw file? (enter filename path): ')
	get_data_file(online_file)
else:
	local_file = raw_input('Where is your raw data file? (enter filename path): ')

parse_results_file(local_file)
print "All done! Enjoy your clean data!"