(function() {
	retryWhileError(function() {
		'use strict';

		var b = sluchch(1, 10).pm();
		var c = sluchch(2, 5);
		var k = sluchch(2, 3);
		var a=b.abs()*sluchch(1,10)+k;
		var pm = " ";
                var bome = b>0 ? '>' : '<';


		var x = [];

		var x1 = (k - a) / b;
		genAssertZ1000(x1, "Один из корней очень нецелый");
		x.pushIf(x1, a + b * x1 !== 1 && a + b * x1 > 0);

		if (c % 2 === 0) {
			var x2 = (-k- a) / b;
			genAssertZ1000(x2, "Один из корней очень нецелый");
			x.pushIf(x2, a + b * x2 !== 1 && a + b * x2 > 0 && x1 !== x2);
			pm="\\pm";
		}
		genAssertNonempty(x, "А корней-то и нет!");

		chas2.task.setEquationTask({
			parts: ['\\log_{' + [a, b + 'x'].slag() + '}{' + k.pow(c) + '}', c],
			roots: x,
			enablePartsSubtraction: 1,
			handleMultipleRoots: 'randomExceptList',
			forceMultipleRoots: sl(4),

		}, {
			tags: {
				log: 1,
			},
			analys: 'Решение:' +
				'$$\\log_{' + a+'+'+ b + 'x' + '}{' + k.pow(c) + '}='+c+' \\ \\Rightarrow'+
				'\\begin{cases} ('+b+'x+'+a+')^{'+c+'}='+k.pow(c)+'\\\\~\\\\'+b+'x+'+a+'>0 \\\\~\\\\'+b+'x+'+a+'\\neq1 \\end{cases} \\ \\Rightarrow'+
				'\\begin{cases} '+b+'x+'+a+'='+pm+k+'\\\\~\\\\x'+bome+'\\frac{'+-a+'}{'+b+'} \\\\~\\\\x\\neq\\frac{'+(-a+1)+'}{'+b+'} \\end{cases} \\ \\Rightarrow'+
				' '+b+'x+'+a+'='+k+'\\ \\Rightarrow'+' x='+x+'.$$'+
				'Ответ: $x=' + x +'.'+ '$',
		});

	});
})();
//77382 
//Сергей Алендарь
