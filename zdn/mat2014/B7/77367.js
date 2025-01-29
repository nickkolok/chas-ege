(function(){'use strict';

var a=sluchch(1,9).pm();
var b=slKrome(a.abs(),1,9).pm();
var x1=sluchch(1,9,0.5).pm();
var x2=slKrome([-x1,0],-9,9);

chas2.task.setEquationTask({
	parts: [a+b, '\\frac{'+((a*a-b*b)*(x1+x2)).ts(1)+'x'+'}{'+(a-b)+'x^2+'+(x1*x2*(a-b)).ts(1)+'}'],
	roots: [x1,x2],
	enablePartsSubtraction: 1,
	handleMultipleRoots: 'randomExceptList',
});
})();

//77367
//Белозоров Никита
