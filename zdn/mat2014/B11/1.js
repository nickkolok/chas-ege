(function() {
	'use strict';

	var a = sluchch(2,99),
		b = sluchch(1,89),
		c = sluchch(1,2),
		d = sluchch(1,99),
		f = (c%2)?(-1):(1),
		g = ['\\cos','\\sin'].shuffle();

	chas2.task.setTask({
		text: ('Найдите значение выражения $$\\frac{'+a+g[0]+' '+b+'^\\circ}{'+g[1]+' '+(90+c*180-b)+'^\\circ}+'+d+'$$').plusminus(),
		answers: [''+(a*f+d),
			],
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 0,
			'tri': 1,
		},
	});

})();
