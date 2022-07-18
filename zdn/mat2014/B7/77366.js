(function(){'use strict';

var a=sluchch(1,9).pm();
var b=slKrome(2*a.abs(),1,9).pm();

chas2.task.setEquationTask({
	parts: [1, '\\frac{'+a*a+'}{'+'x^2+'+(-2*a*b-b*b)+'}'],
	roots: [a+b,-1*(a+b)],
	enablePartsSubtraction: 1,
    handleMultipleRoots: 'randomExceptList',
});
})();

//77366
//Белозоров Никита
