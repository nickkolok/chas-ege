(function(){'use strict';

var a=sluchch(-9,9);
var b=sluchch(1,9);
var c=sluchch(-9,-2);
var d=sluchch(1,9);

chas2.task.setEquationTask({
	parts: [(b-c)+'x+'+d, (-c)+'x+'+(a*b+d)],
	wrapper: ['\\frac{'+sluchch(1,99)+'}{', '}'],
	roots: a,
	enablePartsSubtraction: 1,
});
})();
