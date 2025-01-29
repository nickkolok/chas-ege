(function(){retryWhileError(function(){'use strict';

var a=sluchch(1,9).pm();
var b=sluchch(1,9).pm();
var c=sluchch(1,9).pm();
var d=sluchch(1,9).pm();

var sqrtD = (a*a+4*b*c*c-4*a*c*d).sqrt();
genAssert(sqrtD.isZ(), "Корень из дискриминанта не извлекается");

var x = [];

var x1 = (a-2*c*d+sqrtD)/(2*c*c);
genAssertZ1000(x1, "Один из корней очень нецелый");
x.pushIf(x1, c*x1+d>=0);

var x2 = (a-2*c*d-sqrtD)/(2*c*c);
genAssertZ1000(x2, "Один из корней очень нецелый");
x.pushIf(x2, c*x2+d>=0 && x1 != x2);

genAssertNonempty(x, "А корней-то и нет!");

chas2.task.setAdditiveEquationTask({
    parts: [ '\\sqrt{'+[a+'x', b].slag()+'}', (-c)+'x', -d],
	roots: x,
	enablePartsSubtraction: 1,
	handleMultipleRoots: 'randomExceptList',
	forceMultipleRoots: sl(4),
});
});})();

//628738
//Белозоров Никита
