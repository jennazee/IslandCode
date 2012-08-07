#!/usr/bin/python

import re, sys, string

# def get_data_file(url, data=None, headers={}):
# 	req = urllib2.Request(url=url)
# 	for key in headers:
# 		req.add_header(key, headers[key])
# 	site = urllib2.urlopen(req)
# 	data = site.read()
# 	headers = site.info()
# 	site.close()
# 	output = open('data.txt', 'w')
# 	output.write(data)
# 	output.close()
# 	return data, headers

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

	moreheader = raw_input('Extra header labels (e.g.: item,condition,factor1,factor2): ')

	for line in pretext:
		if re.match('#', line):
			continue
		else:
			text.append(line)

	#skip is 0 until we reach an "Acceptability Judgment line"
	first = 1;

	for line in range(len(text)):
		if re.search('AcceptabilityJudgment', text[line]):
			if first:
				processed.append(text[line])
				first=0
			else:
				toAmend = processed.pop()
				toAdd=''
				splits = re.split('NULL,', text[line])
				for thing in splits[1:]:
					if thing is not '':
						toAdd = str(toAdd + ',' + thing.strip(','))
				processed.append(str(toAmend.strip()+ toAdd))
				first = 1
		#if the line is a question line, there's more to append
		if re.search('Question', text[line]):
			toAmend = processed.pop()
			part = re.split('\$', text[line])[1]
			part.strip('$')
			parts = part.split('%2C')
			print parts
			processed.append(str(toAmend.strip()+ ','+ string.join(parts, ',')+'\n'))
			
	output = open('data.txt', 'w')

	header = 'Time sent,MD5 Hash of IP Address,Controller,Item Number,Element Number,Type,Group,Stimulus,Answer,RT,'

	output.write(str(header+moreheader+'\n'))

	for line in processed:
		output.write(line)
	output.close()

parse_results_file(sys.argv[1])