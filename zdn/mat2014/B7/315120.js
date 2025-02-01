(function(){'use strict';

var a=sluchch(2,7);
var x=sluchch(1,9).pm();
var n=sluchch(2,5);
var b=slKrome([a,a/n],-9,9);

chas2.task.setEquationTask({
	parts: ['\\log_{'+a.pow(n)+'}{'+a+'^{'+(b*n-a)+'x+'+a*x+'}}', b*x,],
	roots: x,
	enablePartsSubtraction: 1,
});
})();

//315120
//Белозоров Никита
