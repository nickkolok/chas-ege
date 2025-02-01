(function(){'use strict';

var a=sluchch(1,9).pm();
var c=sluchch(1,9).pm();
var b=slKrome([c.sqrt(), -1*c.sqrt(), a*a/c, -a],-9,9);

chas2.task.setEquationTask({
	parts: ['\\frac{'+(-1*b*b+c)+'x+'+(a*a*a-b*c)+'}{'+(a+b)+'x+'+c+'}',a-b],
	roots: a,
	enablePartsSubtraction: 1,
});
})();

//26664
//Белозоров Никита
