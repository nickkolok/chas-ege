(function(){'use strict';

var x=sluchch(-9,9);
var b=sluchch(1,9);
var c=sluchch(1,9);
var x=sluchch(1,9);
var a=c*c-b*x;

chas2.task.setEquationTask({
	parts: [ '\\sqrt{'+[a,b+'x'].slag()+'}', c],
	roots: x,
	enablePartsSubtraction: 1,
});
})();
