(function(){'use strict';

var a=sluchch(0.5,20,0.5).pm();

var b=sluchch(1,9);
var c=slKrome([-b,0,b],-10,10,0.5);

chas2.task.setEquationTask({
	parts: [(b-c)+'x+'+2*a*c, (b-c)+'x+'+((-2)*a*b)],
	wrapper: ['(', ')^2'],
	roots: a,
	enablePartsSubtraction: 1,
});
})();

//77368
//510118
//Белозоров Никита
