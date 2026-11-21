(function() {
	'use strict';

	var a = sluchch(2, 9),
		c = slKrome(a, 2, 9),
		b = slKrome(isZ, 0.1, 4.9, 0.1),
		f = sluchch(1, 4),
		d = slKrome(f, 1, 4),
		g = sluchch(1, [f, d].minE() - 1),
		m,
		n,
		p,
		v,
		y;
	(a - 1) * (a - 2) * (a - 4)||(f -= sluchch(1, 4));
	(c - 1) * (c - 2) * (c - 4)||(d -= sluchch(1, 4));
	m = ['\\cdot', ':    '];
	n = [1, -1];
	p = [];
	v = sl1();
	p[0] = m[v] + (a * c) + '^{' + ((-b - g) * n[v]).ts() + '}';
	v = sl1();
	p[1] = m[v] + a + '^{' + ((b + f) * n[v]).ts() + '}';
	v = sl1();
	p[2] = m[v] + c + '^{' + ((b + d) * n[v]).ts() + '}';
	p.shuffle();
	p.toStandart();
	y = '1' + p.soed();
	y = y.replace('1\\cdot', '');

	chas2.task.setTask({
		text: ('Найдите значение выражения $$'+y+'$$').plusminus(),
		answers: a.pow(f-g)*c.pow(d-g),
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 1,
			'tri': 0,
		},
	});

})();
