(function(){'use strict';

var a=sluchch(-9,9);
var c=sluchch(1,9).pm();
var b=[sluchch(1,9).pm(),-2*a*c+1].iz();

chas2.task.setAdditiveEquationTask({
	parts: [
		c*c+'x^2',
		2*a*b*c+b*b,
		(-1)+'('+c+'x+'+b+')^2',
	],
	roots: a,
});
})();

//77370
//Белозоров Никита
