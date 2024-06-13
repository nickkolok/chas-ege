(function() {
	'use strict';

	var a = sluchch(2, 19),
		b = sluchch(1, 3),
		c = sluchch(0.01, 0.99, 0.01),
		d = sluchch(1, 2),
		z = sluchch(1, 4),
		f = (z - b * c) / d,
		m =[
				[
					a.pow(b).toFixedLess(5).toStandart(),
					c.toFixedLess(5).toStandart()
				],
				[
					a.pow(d).toFixedLess(5).toStandart(),
					f.toFixedLess(5).toStandart()
				],
		].shuffle(),
		x = (a * a * b / c).toFixedLess(5);

	chas2.task.setTask({
		text: ('Найдите значение выражения $$'+m[0][0]+'^{'+m[0][1]+'}\\cdot'+m[1][0]+'^{'+m[1][1]+'}$$').plusminus(),
		answers: [''+a.pow(z),
		],
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 0,
			'tri': 0,
		},
	});

})();
