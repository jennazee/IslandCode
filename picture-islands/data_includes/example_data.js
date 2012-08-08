var shuffleSequence = seq("consent", "info", "intro", "practice1", "sep", sepWith("sep", seq(randomize("practice"))), "post-practice", "setcounter", sepWith("sep", seq(randomize("picture-acc"))), "sr", "debrief");
var practiceItemTypes = ["practice"];

var manualSendResults = true;

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: '',
        errorMessage: '',
    },
    "DashedSentence", {
        mode: "self-paced reading"
    },
    "AcceptabilityJudgment", {
        as: ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        presentAsScale: true,
        instructions: "Click the boxes to answer.",
        leftComment: "(Extremely Unnatural)", rightComment: "(Extremely Natural)",
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

    ["sep", "Separator", {}],

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
    
    ["info", "Form", {
        html: { include: "info.html" },
        validators: {
            ID: function (s) { if (s.match('[0-9]')) return true; else return "Bad value for ID number!"; },
        }
    } ],


    [["picture-acc",1], "AcceptabilityJudgment", {s: "The music store owner played a CD by David Bowie"},
                "Question", {q: "$play,CD,base$", as:['']}],
    [["picture-acc",1], "AcceptabilityJudgment", {s: "Who did the music store play a CD by?"},
                "Question", {q: "$play,CD,q$", as:['']}],
    [["picture-acc",1], "AcceptabilityJudgment", {s: "Which singer did the music store owner play a CD by?"},
                "Question", {q: "$play,CD,dl-q$", as:['']}],

    [['picture-acc', 2], "AcceptabilityJudgment", {s:"The schoolchildren passed a mural of Albert Einstein."},
    "Question", {q:"$mural,pass,base$", as:['']}],
    [['picture-acc', 2], "AcceptabilityJudgment", {s:"Who did the schoolchildren pass a mural of?"},
    "Question", {q:"$mural,pass,q$", as:['']}],
    [['picture-acc', 2], "AcceptabilityJudgment", {s:"Which scientist did the schoolchildren pass a mural of?"},
    "Question", {q:"$mural,pass,dl-q$", as:['']}],
    
    ["intro", "Form", {
        html: { include: "picture_intro.html" }
    } ],
    
    ["consent", "Form", {
        html: { include: "consent.html" }
    } ],
    
    ["prac-1-debrief", "Form", {
        html: { include: "prac-1-debrief.html" }
    } ],
    
    ["post-practice", "Form", {
        html: { include: "post-practice.html" }
    } ],
    
    ["debrief", "Form", {
        html: { include: "debrief.html" }
    } ],
    
    ["practice1", "AcceptabilityJudgment", {s: "This is the first practice sentence."}],
    
    ["practice", "AcceptabilityJudgment", {s: "The girl went to the zoo. She saw a zebra"}],
    ["practice", "AcceptabilityJudgment", {s: "The kids lost the soccer ball in the bushes."}],
    ["practice", "AcceptabilityJudgment", {s: "The cat stared at the fish in the aquarium."}],
    ["practice", "AcceptabilityJudgment", {s: "The doctor was tired after a long day at work."}],
    ["practice", "AcceptabilityJudgment", {s: "Sam brought Cindy a cake for her birthday. This made Cindy happy."}]
    
    ];