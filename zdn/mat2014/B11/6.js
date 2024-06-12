(function() {
	'use strict';

	var a = sluchch(2, 9),
		b = sluchch(2, 3),
		f = sluchch(1, b - 1),
		c = sluchch(0.01, 9.99, 0.01),
		z = sluchch(1, 4);

	chas2.task.setTask({
		text: ('Найдите значение выражения $$\\frac{'+a.pow(b)+'^{'+(z+c).toFixedLess(5).toStandart()+'}}{'+a.pow(f)+'^{'+(z+c*b/f).toFixedLess(5).toStandart()+'}}$$').plusminus(),
		answers: [''+a.pow(z),
		],
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 1,
			'tri': 0,
		},
	});

})();
