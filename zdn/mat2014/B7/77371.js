(function(){'use strict';

var b=sluchch(1,8);
var c=sluchch(b+1,9);

var a=sluchch((c/b).ceil(),10);

chas2.task.setEquationTask({
	parts: [b.texfrac(c)+'x^2', (a*a*b).texmixedfrac(c)],
	roots: [a,-a],
	enablePartsSubtraction: 1,
	handleMultipleRoots: 'randomExceptList',
});
})();

//77371
//Белозоров Никита
