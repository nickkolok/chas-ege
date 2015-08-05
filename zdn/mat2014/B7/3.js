(function(){'use strict';

var c=sluchch(1,9).pm();
var d=sluchch(2,99);
var x=sluchch(1,9).pm();
var b=d-c*x;

chas2.task.setEquationTask({
	parts: ['('+b+'+'+c+'x)',d],
	wrapper: ['\\log_{'+sluchch(2,99)+'}', ''],
	roots: x,
	enablePartsSubtraction: 1,
},{
	tags: {log:1},
});
})();
