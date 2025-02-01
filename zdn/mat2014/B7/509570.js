(function(){'use strict';

var a=sluchch(-9,9);
var b=slKrome(a,-9,9);
var d=sluchch(1,9).pm();
var x=slKrome(-d,-9,9);
var c=slKrome([-a*x,-b*x],-9,9);

chas2.task.setEquationTask({
	parts: [(b-a)+'x+'+(a*x+c), b*x+c],
	wrapper: ['\\frac{','}{'+'x+'+d+'}'],
	roots: x,
	enablePartsSubtraction: 1,
});
})();

//509570
//Белозоров Никита
