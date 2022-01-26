(function(){retryWhileError(function(){'use strict';

var b=sluchch(1,9).pm();
var a=sluchch(1,9).pm();
var k=sluchch(1,9).pm();

var sqrtD = (4*a*k*k+b*b).sqrt();
genAssert(sqrtD.isZ(), "Корень из дискриминанта не извлекается");

var x = [];

var x1 = (b-sqrtD)/(2*k*k);
genAssertZ1000(x1, "Один из корней очень нецелый");
x.pushIf(x1, k*x1 >= 0 && a+b*x1 >= 0);

var x2 = (b+sqrtD)/(2*k*k);
genAssertZ1000(x2, "Один из корней очень нецелый");
x.pushIf(x2, k*x2 >= 0 && a+b*x2 >=0 && x1 != x2);

genAssertNonempty(x, "А корней-то и нет!");

chas2.task.setEquationTask({
	parts: [ '\\sqrt{'+[a,b+'x'].slag()+'}', k+'x'],
	roots: x,
	enablePartsSubtraction: 1,
	handleMultipleRoots: 'randomExceptList',
	forceMultipleRoots: sl(4),
});

});})();
// В том числе 26668
