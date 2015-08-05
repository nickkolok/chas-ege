(function(){'use strict';

var a=sluchch(1,9);
var d=sluchch(2,9);
var x=sluchch(1,9).pm();
var b=sluchch(1,9).pm();
var c=a*d*d-b*x;

chas2.task.setEquationTask({
	parts: ['\\sqrt{\\frac{'+a+'}{'+[c,b+'x'].slag()+'}}', 1 .texfrac(d)],
	roots: x,
	enablePartsSubtraction: 1,
	enablePartsExchange: 0,
});

})();
//Обзад 26660
//Николай Авдеев
