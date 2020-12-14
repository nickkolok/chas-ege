(function(){'use strict';

var x=sluchch(-9,9);
var b=sluchch(1,9);
var c=sluchch(1,9);
var x=sluchch(1,9);
var power = sl(2,5);
var a = Math.pow(c,power)-b*x;
var textpower = ('['+power+']').esli(power!=2);

chas2.task.setEquationTask({
	parts: [ '\\sqrt'+textpower+'{'+[a,b+'x'].slag()+'}', c],
	roots: x,
	enablePartsSubtraction: 1,
});
})();
// В том числе РешуЕГЭ 501205
