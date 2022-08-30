(function(){'use strict';

var a=sluchch(1,9).pm();
var b=slKrome(a,-9,9);
var x=sluchch(1,9).pm();
var c=slKrome([-1*a*x,-1*b*x,-1*a*x+1,-1*a*x-1],-9,9);

chas2.task.setEquationTask({
	parts: [a*x+c, (a-b)+'x+'+(b*x+c)],
    wrapper: ['\\frac{'+[sluchch(2,99),1].iz()+'}{', '}'],
	roots: x,
	enablePartsSubtraction: 1,
});
})();

//77383
//Белозоров Никита
