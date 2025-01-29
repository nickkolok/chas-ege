(function(){'use strict';

var g=sluchch(1,49);
var x=sluchch(1,9);
var b=sluchch(1,9).pm();
var d=slKrome(b,1,9).pm();
var c=g-b*x;
var f=g-d*x;

chas2.task.setEquationTask({
	parts: [ [c,b+'x'].slag(), [f,d+'x'].slag() ],
	wrapper: ['\\log_{'+sluchch(2,99)+'}{(', ')}'],
	roots: x,
	enablePartsSubtraction: 1,
},{
	tags: {log:1},
});
})();
