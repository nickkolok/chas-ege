(function(){
	'use strict';

	var a = sluchch(2, 9),
		c = slKrome(a, 2, 9),
		b = slKrome(isZ, 0.1, 4.9, 0.1),
		f = sluchch(1, 4),
		d = slKrome(f, 1, 4),
		g = sluchch(1, [f,d].minE() - 1);
	(a - 1) * (a - 2) * (a - 4)||(f -= sluchch(1, 4));
	(c - 1) * (c - 2) * (c - 4)||(d -= sluchch(1, 4));

	chas2.task.setTask({
		text: ('Найдите значение выражения $$\\frac{'+a+'^{'+
			   (b+f).toFixedLess(6).toStandart()+'}\\cdot{'+c+'^{'+
			   (b+d).toFixedLess(6).toStandart()+'}}}{'+(a*c)+'^{'+
			   (b+g).toFixedLess(6).toStandart()+'}}$$').plusminus(),
		answers: a.pow(f-g)*c.pow(d-g),
		tags: {
				'log': 0,
				'prz': 0,
				'drs': 1,
				'tri': 0,
			},
	});

})();
