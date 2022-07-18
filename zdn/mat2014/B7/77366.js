(function(){'use strict';

var a=sluchch(1,9).pm();
var b=slKrome(2*a.abs(),1,9).pm();
var k=[1,sluchch(2,9)].iz();

chas2.task.setEquationTask({
	parts: [k, '\\frac{'+a*a*k+'}{'+'x^2+'+(-2*a*b-b*b)+'}'],
	roots: [a+b,-1*(a+b)],
	enablePartsSubtraction: 1,
    handleMultipleRoots: 'randomExceptList',
});
})();

//77366
//Белозоров Никита
