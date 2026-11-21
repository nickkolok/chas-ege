(function() {
	'use strict';

	var a = sluchch(2, 9),
		b = sluchch(2, 4),
		f = sluchch(1, b - 1),
		m = sluchch(1, 9),
		g = sluchch(1, 9),
		z = sluchch(1, 4),
		c = z * m - g;

	chas2.task.setTask({
		text: ('Найдите значение выражения $$'+a.pow(b)+'^{'+c.frac(b*m)+'}\\cdot'+
				a.pow(f)+'^{'+g.frac(f*m)+'}$$').plusminus(),
		answers: a.pow(z),
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 1,
			'tri': 0,
		},
	});

})();
