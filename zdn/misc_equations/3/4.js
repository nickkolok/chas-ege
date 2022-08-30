(function(){'use strict';

var a=sluchch(2,9);
var d=sluchch(1,4);
var x=sluchch(1,9).pm();
var b=sluchch(1,9).pm();
var c=a.pow(d)-b*x;

chas2.task.setEquationTask({
	parts: ['\\log_{\\frac{1}{'+a+'}}{('+[c,b+'x'].slag()+')}', '-'+d],
	roots: x,
	enablePartsSubtraction: 1,
},{
	tags: {log:1},
});
})();
