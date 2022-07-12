(function(){'use strict';

var a=sluchch(-9,9);
var b=sluchch(1,9).pm();

chas2.task.setEquationTask({
	parts: ['('+b+'x+'+a*b+')^2', (4*a*b*b)+'x'],
	roots: a,
	enablePartsSubtraction: 1,
});
})();

//77369
//Белозоров Никита
