(function(){
NAinfo.requireApiVersion(0, 0);

var v1=sl1();
var right=[
    ["$2\\pi\\sqrt{\\frac{l}{g}}$",],
    ["$\\frac{1}{2\\pi\\}sqrt{\\frac{g}{l}}$","$\\frac{1}{2\\pi\\sqrt{\\frac{l}{g}}}$",],
];


NAtask.setTask({
    text:"Каким выражением определяется "+["период","частота"][v1]+" колебаний математического маятника?",
    answers:right[v1],
    wrongAnswers:[
        "$\\pi\\sqrt{\\frac{l}{g}}$",
        "$2\\sqrt{\\frac{l}{g}}$",
        "$\\sqrt{\\frac{l}{g}}$",
        "$\\frac{1}{\\pi\\sqrt{\\frac{g}{l}}}$",
        "$\\frac{1}{2\\sqrt{\\frac{l}{g}}}$",
        "$2\\pi\\sqrt{\\frac{g}{l}}$",
        "$\\pi\\sqrt{\\frac{g}{2l}}$",
    ].concat(right[1-v1]),
});

AtoB();
})();
