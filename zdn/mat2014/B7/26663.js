(function(){'use strict';

var b=sluchch(1,8);
var c=sluchch(b+1,9);
var sgn=[-1,1].iz();

var a=sluchch((c/b).ceil(),15);

chas2.task.setEquationTask({
	parts: [sgn+b.texfrac(c)+'x', (a*b).texmixedfrac(c)],
	roots: a*sgn,
	enablePartsSubtraction: 1,
});
})();

//26663
//26662
//Белозоров Никита
