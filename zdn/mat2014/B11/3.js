(function() {
	'use strict';

	var m = sluchch(1, 37),
		n = sluchch(1, m - 1),

		a = m * m - n * n,
		b = 2 * m * n,
		c = m * m + n * n,
		d = '-',
		f,
		g,
		h,
		v = sluchch(1, 3);

	switch(v){
		case 1:
			h = a;
			f = c;
			g = b;
			break;

		case 2:
			h = b;
			f = c;
			g = a;
			break;

		case 3:
			d = '+';
			h = c;
			f = a;
			g = b;
			break;
	}

	chas2.task.setTask({
		text: 'Найдите значение выражения $$\\sqrt{'+f+'^{2}'+d+g+'{^2}}$$',
		answers: [''+h,
		],
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 0,
			'tri': 0,
		},
	});

})();
