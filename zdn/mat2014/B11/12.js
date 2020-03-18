(function(){
	'use strict';

	var a = slKrome([90, 180, 270], 1, 359),
		at = '{' + a.ts() + '^\\circ}',

		v1 = sl1(),//Если 1, то косинус снизу.
		p1 = sluchch(2, 99).pm(),
		p2 = 2 .pow(sl(-2, 4)) * 5 .pow(sl(-2, 4)) .pm(),
		b = v1 ? p1 : p2,
		c = v1 ? p2 : p1,
		f = [
				[b.ts() + '(\\cos^2' + at + '-\\sin^2' + at + ')', 1],
				[b.ts() + '(1-2\\sin^2' + at + ')', 1],
				[b.ts() + '(2\\cos^2' + at + '-1)', 1],
				[b.ts() + '-' + (2 * b).ts() + '\\sin^2' + at, 1],
				[(2 * b).ts() + '\\cos^2' + at + '-' + b.ts(), 1],

				[b.ts() + '(\\sin^2' + at + '-\\cos^2' + at + ')', -1],
				[b.ts() + '(1-2\\cos^2' + at + ')', -1],
				[b.ts() + '(2\\sin^2' + at + '-1)', -1],
				[b.ts() + '-' + (2 * b).ts() + '\\cos^2' + at, -1],
				[(2 * b).ts() + '\\sin^2' + at + '-' + b.ts(), -1],
		].iz(),

		vyr1 = f[0],
		vyr2 = c.ts() + '\\cos' + (2 * a).ts() + '^\\circ',

		y = '\\frac{' + (v1 ? vyr1 : vyr2) + '}{' + (v1 ? vyr2 : vyr1) + '}';

	chas2.task.setTask({
		text: ('Найдите значение выражения $$'+
			   y+'$$').plusminus().ts(),
		answers: [(p1 / p2).ts(),
		],
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 0,
			'tri': 0,
		},
	});

})();
//Обзад 26756
//Николай Авдеев
