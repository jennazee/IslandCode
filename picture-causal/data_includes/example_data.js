var shuffleSequence = seq("consent", "intro", sepWith("sep", seq(randomize("practice"))), "post-practice", "setcounter", sepWith("sep", seq(randomize("causal"))), "sr", "debrief");
var practiceItemTypes = ["practice"];

var manualSendResults = true;

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: '',
        errorMessage: ''
    },
    "DashedSentence", {
        mode: "self-paced reading"
    },
    "AcceptabilityJudgment", {
        as: ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        presentAsScale: true,
        instructions: "Click the boxes to answer.",
        leftComment: "Not at all",
        rightComment: "Extremely Influential",
        timeout: null
    },
    "Question", {
        hasCorrect: false,
        timeout: 1
    },
    "Message", {
        hideProgressBar: true
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

var items = [

    // New in Ibex 0.3-beta-9. You can now add a '__SendResults__' controller in your shuffle
    // sequence to send results before the experiment has finished. This is NOT intended to allow
    // for incremental sending of results -- you should send results exactly once per experiment.
    // However, it does permit additional messages to be displayed to participants once the
    // experiment itself is over. If you are manually inserting a '__SendResults__' controller into
    // the shuffle sequence, you must set the 'manualSendResults' configuration variable to 'true', since
    // otherwise, results are automatically sent at the end of the experiment.
    //
    ["sr", "__SendResults__", { }],

    ["sep", "Separator", { }],

    // New in Ibex 0.3-beta19. You can now determine the point in the experiment at which the counter
    // for latin square designs will be updated. (Previously, this was always updated upon completion
    // of the experiment.) To do this, insert the special '__SetCounter__' controller at the desired
    // point in your running order. If given no options, the counter is incremented by one. If given
    // an 'inc' option, the counter is incremented by the specified amount. If given a 'set' option,
    // the counter is set to the given number. (E.g., { set: 100 }, { inc: -1 })
    //
    ["setcounter", "__SetCounter__", { }],

    // NOTE: You could also use the 'Message' controller for the experiment intro (this provides a simple
    // consent checkbox).

    
    ["intro", "Form", {
        html: { include: "causal_intro.html" }
    } ],

    ["info", "Form", {
        html: { include: "info.html" },
        validators: {
            ID: function (s) { if (s.match('[0-9]')) return true; else return "Bad value for ID number!"; },
        }
    } ],

    ["consent", "Form", {
        html: { include: "consent.html" }
    } ],
    
    ["post-practice", "Form", {
        html: { include: "post-practice.html" }
    } ],
    
    ["debrief", "Form", {
        html: { include: "debrief.html" }
    } ],

    ["practice", 'AcceptabilityJudgment', {s: 'How much of a role does the flavor of ice cream have in deciding to eat it?'}],
    ["practice", 'AcceptabilityJudgment', {s: 'When putting on a coat in the morning, how influential is the weather outside?'}],
    ["practice", 'AcceptabilityJudgment', {s: 'How much does drinking a cup of coffee depend on how tired the drinker is?'}],
    ["practice", 'AcceptabilityJudgment', {s: 'If you buy a cookie, how much does it depend on how much it costs?'}],
    ["practice", 'AcceptabilityJudgment', {s: 'How much does eating at a restaurant depend on the type of food they serve?'}],
    ["practice", 'AcceptabilityJudgment', {s: 'When someone goes to a concert, how much does it matter who is playing?'}],

[['causal',1], 'AcceptabilityJudgment', {s: 'If you play a CD, how much does it depend on who it is by?'}, 'Question', {q: '$CD,play$', as:['']}],
[['causal',1], 'AcceptabilityJudgment', {s: 'If you sell a CD, how much does it depend on who it is by?'}, 'Question', {q: '$CD,sell$', as:['']}],
[['causal',1], 'AcceptabilityJudgment', {s: 'If you scratch a CD, how much does it depend on who it is by?'}, 'Question', {q: '$CD,scratch$', as:['']}],
[['causal',1], 'AcceptabilityJudgment', {s: 'If you listen to a CD, how much does it depend on who it is by?'}, 'Question', {q: '$CD,listen to$', as:['']}],

[['causal',2], 'AcceptabilityJudgment', {s: 'How much does passing a mural depend on what it depicts?'}, 'Question', {q: '$MURAL,pass$', as:['']}],
[['causal',2], 'AcceptabilityJudgment', {s: 'How much does planning a mural depend on what it depicts?'}, 'Question', {q: '$MURAL,plan$', as:['']}],
[['causal',2], 'AcceptabilityJudgment', {s: 'How much does designing a mural depend on what it depicts?'}, 'Question', {q: '$MURAL,design$', as:['']}],
[['causal',2], 'AcceptabilityJudgment', {s: 'How much does painting over a mural depend on what it depicts?'}, 'Question', {q: '$MURAL,paint over$', as:['']}],

[['causal',3], 'AcceptabilityJudgment', {s: 'How much does climbing on a sculpture depend on what it depicts?'}, 'Question', {q: '$SCULPTURE,climb on$', as:['']}],
[['causal',3], 'AcceptabilityJudgment', {s: 'How much does breaking the arm off of a sculpture depend on what it depicts?'}, 'Question', {q: '$SCULPTURE,break the arm off of$', as:['']}],
[['causal',3], 'AcceptabilityJudgment', {s: 'How much does creating a sculpture depend on what it depicts?'}, 'Question', {q: '$SCULPTURE,create$', as:['']}],
[['causal',3], 'AcceptabilityJudgment', {s: 'How much does exhibiting a sculpture depend on what it depicts?'}, 'Question', {q: '$SCULPTURE,exhibit$', as:['']}],

[['causal',4], 'AcceptabilityJudgment', {s: 'When completing a thesis, how much does the topic of the work matter?'}, 'Question', {q: '$THESIS,complete$', as:['']}],
[['causal',4], 'AcceptabilityJudgment', {s: 'When presenting a thesis, how much does the topic of the work matter?'}, 'Question', {q: '$THESIS,present$', as:['']}],
[['causal',4], 'AcceptabilityJudgment', {s: 'When failing a thesis, how much does the topic of the work matter?'}, 'Question', {q: '$THESIS,fail$', as:['']}],
[['causal',4], 'AcceptabilityJudgment', {s: 'When binding a thesis, how much does the topic of the work matter?'}, 'Question', {q: '$THESIS,bind$', as:['']}],

[['causal',5], 'AcceptabilityJudgment', {s: 'How much does opening a book depend on the topic of the book?'}, 'Question', {q: '$BOOK,open$', as:['']}],
[['causal',5], 'AcceptabilityJudgment', {s: 'How much does ordering a book depend on the topic of the book?'}, 'Question', {q: '$BOOK,order$', as:['']}],
[['causal',5], 'AcceptabilityJudgment', {s: 'How much does recommending a book depend on the topic of the book?'}, 'Question', {q: '$BOOK,recommend$', as:['']}],
[['causal',5], 'AcceptabilityJudgment', {s: 'How much does spilling water a book depend on the topic of the book?'}, 'Question', {q: '$BOOK,spill water on$', as:['']}],

[['causal',6], 'AcceptabilityJudgment', {s: 'In discussing an article, how much does its topic play a role? '}, 'Question', {q: '$ARTICLE,discuss$', as:['']}],
[['causal',6], 'AcceptabilityJudgment', {s: 'In publishing an article, how much does its topic play a role? '}, 'Question', {q: '$ARTICLE,publish$', as:['']}],
[['causal',6], 'AcceptabilityJudgment', {s: 'In editing an article, how much does its topic play a role? '}, 'Question', {q: '$ARTICLE,edit$', as:['']}],
[['causal',6], 'AcceptabilityJudgment', {s: 'In recycling an article, how much does its topic play a role? '}, 'Question', {q: '$ARTICLE,recycle$', as:['']}],

[['causal',7], 'AcceptabilityJudgment', {s: 'How much of a role does who or what a movie is about have in renting it?'}, 'Question', {q: '$MOVIE,rent$', as:['']}],
[['causal',7], 'AcceptabilityJudgment', {s: 'How much of a role does who or what a movie is about have in returning it?'}, 'Question', {q: '$MOVIE,return$', as:['']}],
[['causal',7], 'AcceptabilityJudgment', {s: 'How much of a role does who or what a movie is about have in filming it?'}, 'Question', {q: '$MOVIE,film$', as:['']}],
[['causal',7], 'AcceptabilityJudgment', {s: 'How much of a role does who or what a movie is about have in driving to it?'}, 'Question', {q: '$MOVIE,drive to$', as:['']}],

[['causal',8], 'AcceptabilityJudgment', {s: 'When one publishes an essay, how much does it matter what it is about?'}, 'Question', {q: '$ESSAY,publish$', as:['']}],
[['causal',8], 'AcceptabilityJudgment', {s: 'When one crumples up an essay, how much does it matter what it is about?'}, 'Question', {q: '$ESSAY,crumple up$', as:['']}],
[['causal',8], 'AcceptabilityJudgment', {s: 'When one forgets an essay, how much does it matter what it is about?'}, 'Question', {q: '$ESSAY,forget$', as:['']}],
[['causal',8], 'AcceptabilityJudgment', {s: 'When one praises an essay, how much does it matter what it is about?'}, 'Question', {q: '$ESSAY,praise$', as:['']}],

[['causal',9], 'AcceptabilityJudgment', {s: 'How much does it matter who a portrait is of when sketching it?'}, 'Question', {q: '$PORTRAIT,sketch$', as:['']}],
[['causal',9], 'AcceptabilityJudgment', {s: 'How much does it matter who a portrait is of when stealing it?'}, 'Question', {q: '$PORTRAIT,steal$', as:['']}],
[['causal',9], 'AcceptabilityJudgment', {s: 'How much does it matter who a portrait is of when straightening it?'}, 'Question', {q: '$PORTRAIT,straighten$', as:['']}],
[['causal',9], 'AcceptabilityJudgment', {s: 'How much does it matter who a portrait is of when hanging it?'}, 'Question', {q: '$PORTRAIT,hang$', as:['']}],

[['causal',10], 'AcceptabilityJudgment', {s: 'How much does defacing a monument depend on who the monument is to?'}, 'Question', {q: '$MONUMENT,deface$', as:['']}],
[['causal',10], 'AcceptabilityJudgment', {s: 'How much does visiting a monument depend on who the monument is to?'}, 'Question', {q: '$MONUMENT,visit$', as:['']}],
[['causal',10], 'AcceptabilityJudgment', {s: 'How much does sitting on a monument depend on who the monument is to?'}, 'Question', {q: '$MONUMENT,sit on$', as:['']}],
[['causal',10], 'AcceptabilityJudgment', {s: 'How much does admiring a monument depend on who the monument is to?'}, 'Question', {q: '$MONUMENT,admire$', as:['']}],

[['causal',11], 'AcceptabilityJudgment', {s: 'When writing a letter, how much does it matter who its recipient is?'}, 'Question', {q: '$LETTER,write$', as:['']}],
[['causal',11], 'AcceptabilityJudgment', {s: 'When sending a letter, how much does it matter who its recipient is?'}, 'Question', {q: '$LETTER,send$', as:['']}],
[['causal',11], 'AcceptabilityJudgment', {s: 'When ripping up a letter, how much does it matter who its recipient is?'}, 'Question', {q: '$LETTER,rip up$', as:['']}],
[['causal',11], 'AcceptabilityJudgment', {s: 'When putting a stamp on a letter, how much does it matter who its recipient is?'}, 'Question', {q: '$LETTER,put a stamp on$', as:['']}],

[['causal',12], 'AcceptabilityJudgment', {s: 'When making a photocopy, how much does it matter what the photocopy is of?'}, 'Question', {q: '$PHOTOCOPY,make$', as:['']}],
[['causal',12], 'AcceptabilityJudgment', {s: 'When folding a photocopy, how much does it matter what the photocopy is of?'}, 'Question', {q: '$PHOTOCOPY,fold$', as:['']}],
[['causal',12], 'AcceptabilityJudgment', {s: 'When stapling a photocopy, how much does it matter what the photocopy is of?'}, 'Question', {q: '$PHOTOCOPY,staple$', as:['']}],
[['causal',12], 'AcceptabilityJudgment', {s: 'When reading a photocopy, how much does it matter what the photocopy is of?'}, 'Question', {q: '$PHOTOCOPY,read$', as:['']}],

[['causal',13], 'AcceptabilityJudgment', {s: 'If someone stands near an advertisement, to what extent does it matter what it is advertising?'}, 'Question', {q: '$ADVERTISEMENT,stand near$', as:['']}],
[['causal',13], 'AcceptabilityJudgment', {s: 'If someone sees an advertisement, to what extent does it matter what it is advertising?'}, 'Question', {q: '$ADVERTISEMENT,see$', as:['']}],
[['causal',13], 'AcceptabilityJudgment', {s: 'If someone obscures an advertisement, to what extent does it matter what it is advertising?'}, 'Question', {q: '$ADVERTISEMENT,obscure$', as:['']}],
[['causal',13], 'AcceptabilityJudgment', {s: 'If someone criticizes an advertisement, to what extent does it matter what it is advertising?'}, 'Question', {q: '$ADVERTISEMENT,criticize$', as:['']}],

[['causal',14], 'AcceptabilityJudgment', {s: 'In exploring a model of something, how much does it matter what it was of?'}, 'Question', {q: '$MODEL,explore$', as:['']}],
[['causal',14], 'AcceptabilityJudgment', {s: 'In building a model of something, how much does it matter what it was of?'}, 'Question', {q: '$MODEL,build$', as:['']}],
[['causal',14], 'AcceptabilityJudgment', {s: 'In dropping a model of something, how much does it matter what it was of?'}, 'Question', {q: '$MODEL,drop$', as:['']}],
[['causal',14], 'AcceptabilityJudgment', {s: 'In cracking a model of something, how much does it matter what it was of?'}, 'Question', {q: '$MODEL,crack$', as:['']}],

[['causal',15], 'AcceptabilityJudgment', {s: 'How much does losing a pamphlet depend on what that pamphlet is about?'}, 'Question', {q: '$PAMPHLET,lose$', as:['']}],
[['causal',15], 'AcceptabilityJudgment', {s: 'How much does searching for a pamphlet depend on what that pamphlet is about?'}, 'Question', {q: '$PAMPHLET,search for$', as:['']}],
[['causal',15], 'AcceptabilityJudgment', {s: 'How much does distributing a pamphlet depend on what that pamphlet is about?'}, 'Question', {q: '$PAMPHLET,distribute$', as:['']}],
[['causal',15], 'AcceptabilityJudgment', {s: 'How much does stepping on a pamphlet depend on what that pamphlet is about?'}, 'Question', {q: '$PAMPHLET,step on$', as:['']}],

[['causal',16], 'AcceptabilityJudgment', {s: 'How much does the subject of a biography is of matter in citing it?'}, 'Question', {q: '$BIOGRAPHY,cite$', as:['']}],
[['causal',16], 'AcceptabilityJudgment', {s: 'How much does the subject of a biography is of matter in checking it out?'}, 'Question', {q: '$BIOGRAPHY,check out$', as:['']}],
[['causal',16], 'AcceptabilityJudgment', {s: 'How much does the subject of a biography is of matter in disagreeing with it?'}, 'Question', {q: '$BIOGRAPHY,disagree with$', as:['']}],
[['causal',16], 'AcceptabilityJudgment', {s: 'How much does the subject of a biography is of matter in closing it?'}, 'Question', {q: '$BIOGRAPHY,close$', as:['']}],

[['causal',17], 'AcceptabilityJudgment', {s: 'If one recites a poem, how much of a role does the topic of the poem play?'}, 'Question', {q: '$POEM,recite$', as:['']}],
[['causal',17], 'AcceptabilityJudgment', {s: 'If one composes a poem, how much of a role does the topic of the poem play?'}, 'Question', {q: '$POEM,compose$', as:['']}],
[['causal',17], 'AcceptabilityJudgment', {s: 'If one flips past a poem, how much of a role does the topic of the poem play?'}, 'Question', {q: '$POEM,flip past$', as:['']}],
[['causal',17], 'AcceptabilityJudgment', {s: 'If one dislikes a poem, how much of a role does the topic of the poem play?'}, 'Question', {q: '$POEM,dislike$', as:['']}],

[['causal',18], 'AcceptabilityJudgment', {s: 'How much does taking a photograph depend on what the photograph is of?'}, 'Question', {q: '$PHOTOGRAPH,take$', as:['']}],
[['causal',18], 'AcceptabilityJudgment', {s: 'How much does getting fingerprints on a photograph depend on what the photograph is of?'}, 'Question', {q: '$PHOTOGRAPH,get fingerprints on$', as:['']}],
[['causal',18], 'AcceptabilityJudgment', {s: 'How much does framing a photograph depend on what the photograph is of?'}, 'Question', {q: '$PHOTOGRAPH,frame$', as:['']}],
[['causal',18], 'AcceptabilityJudgment', {s: 'How much does tearing a photograph depend on what the photograph is of?'}, 'Question', {q: '$PHOTOGRAPH,tear$', as:['']}],

[['causal',19], 'AcceptabilityJudgment', {s: 'When retracting a claim, how much does it matter who the claim is about?'}, 'Question', {q: '$CLAIM,retract$', as:['']}],
[['causal',19], 'AcceptabilityJudgment', {s: 'When supporting a claim, how much does it matter who the claim is about?'}, 'Question', {q: '$CLAIM,support$', as:['']}],
[['causal',19], 'AcceptabilityJudgment', {s: 'When verifying a claim, how much does it matter who the claim is about?'}, 'Question', {q: '$CLAIM,verify$', as:['']}],
[['causal',19], 'AcceptabilityJudgment', {s: 'When falsifying a claim, how much does it matter who the claim is about?'}, 'Question', {q: '$CLAIM,falsify$', as:['']}],

[['causal',20], 'AcceptabilityJudgment', {s: 'When someone hears a rumor, how much does it matter who it is about?'}, 'Question', {q: '$RUMOR,hear$', as:['']}],
[['causal',20], 'AcceptabilityJudgment', {s: 'When someone believes a rumor, how much does it matter who it is about?'}, 'Question', {q: '$RUMOR,believe$', as:['']}],
[['causal',20], 'AcceptabilityJudgment', {s: 'When someone repeats a rumor, how much does it matter who it is about?'}, 'Question', {q: '$RUMOR,repeat$', as:['']}],
[['causal',20], 'AcceptabilityJudgment', {s: 'When someone dispels a rumor, how much does it matter who it is about?'}, 'Question', {q: '$RUMOR,dispel$', as:['']}],

[['causal',21], 'AcceptabilityJudgment', {s: 'How much does the topic of a story matter when telling it?'}, 'Question', {q: '$STORY,tell$', as:['']}],
[['causal',21], 'AcceptabilityJudgment', {s: 'How much does the topic of a story matter when overhearing it?'}, 'Question', {q: '$STORY,overhear$', as:['']}],
[['causal',21], 'AcceptabilityJudgment', {s: 'How much does the topic of a story matter when making it up?'}, 'Question', {q: '$STORY,make up$', as:['']}],
[['causal',21], 'AcceptabilityJudgment', {s: 'How much does the topic of a story matter when interrupting it?'}, 'Question', {q: '$STORY,interrupt$', as:['']}],

[['causal',22], 'AcceptabilityJudgment', {s: 'If someone were to fall asleep during a play, how much does it matter who the play is by?'}, 'Question', {q: '$PLAY,fall asleep during$', as:['']}],
[['causal',22], 'AcceptabilityJudgment', {s: 'If someone were to review a play, how much does it matter who the play is by?'}, 'Question', {q: '$PLAY,review$', as:['']}],
[['causal',22], 'AcceptabilityJudgment', {s: 'If someone were to direct a play, how much does it matter who the play is by?'}, 'Question', {q: '$PLAY,direct$', as:['']}],
[['causal',22], 'AcceptabilityJudgment', {s: 'If someone were to star in a play, how much does it matter who the play is by?'}, 'Question', {q: '$PLAY,star in$', as:['']}],

[['causal',23], 'AcceptabilityJudgment', {s: 'How much does what a hypothesis is about play into rejecting it?'}, 'Question', {q: '$HYPOTHESIS,reject$', as:['']}],
[['causal',23], 'AcceptabilityJudgment', {s: 'How much does what a hypothesis is about play into confirming it?'}, 'Question', {q: '$HYPOTHESIS,confirm$', as:['']}],
[['causal',23], 'AcceptabilityJudgment', {s: 'How much does what a hypothesis is about play into testing it?'}, 'Question', {q: '$HYPOTHESIS,test$', as:['']}],
[['causal',23], 'AcceptabilityJudgment', {s: 'How much does what a hypothesis is about play into formulating it?'}, 'Question', {q: '$HYPOTHESIS,formulate$', as:['']}],

[['causal',24], 'AcceptabilityJudgment', {s: 'How much does what a tune is from matter when someone hums it?'}, 'Question', {q: '$TUNE,hum$', as:['']}],
[['causal',24], 'AcceptabilityJudgment', {s: 'How much does what a tune is from matter when someone recognizes it?'}, 'Question', {q: '$TUNE,recognize$', as:['']}],
[['causal',24], 'AcceptabilityJudgment', {s: 'How much does what a tune is from matter when someone sings it?'}, 'Question', {q: '$TUNE,sing$', as:['']}],
[['causal',24], 'AcceptabilityJudgment', {s: 'How much does what a tune is from matter when someone improvises over it?'}, 'Question', {q: '$TUNE,improvise over$', as:['']}],

];