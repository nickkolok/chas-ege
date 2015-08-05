(function(){'use strict';

var a=sluchch(2,9);
var f=sluchch(2,9);
var d=sluchch(1,4);
var x=sluchch(1,9).pm();
var b=sluchch(1,9).pm();
var c=f.pow(d)-b*x;

var h='\\log_{'+a+'}{';

chas2.task.setEquationTask({
	parts: [h+'('+[c,b+'x'].slag()+')}', d+h+f+'}'],
	roots: x,
	enablePartsSubtraction: 1,
},{
	tags: {log:1},
});
})();
