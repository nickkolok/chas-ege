(function() {
	'use strict';

	var c = sluchch(1, 9).pm();
	var d = sluchch(2, 99);
	var o = sluchch(2, 99);
	var x = sluchch(1, 9).pm();
	var b = d - c * x;

	chas2.task.setEquationTask({
		parts: ['(' + b + '+' + c + 'x)', d],
		wrapper: ['\\log_{' + o + '}', ''],
		roots: x,
		enablePartsSubtraction: 1,
	}, {
		tags: {
			log: 1,
		},

		analys: 'Решение:' +
			'$$\\log_{' + o + '}{(' + b + '+' + c + 'x)}=' + '\\log_{' + o + '}{' + d + '}\\ \\Rightarrow \\ ' + b + '+' + c +
			'x=' + d + ' \\ \\Rightarrow \\ ' + c + 'x=' + (d - b) + ' \\ \\Rightarrow \\ x=' + (d - b) / c + '$$' +
			'Ответ: $x=' + x +'.'+ '$',
	});
})();
//26648 
//Сергей Алендарь
