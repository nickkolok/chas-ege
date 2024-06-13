(function() {

	var task = sluchch(0, 2);
	var cat_a = sluchch(1, 100),
		cat_b = sluchch(1, 100);

	if (task === 0)
		while (!Math.sqrt(cat_a * cat_a + cat_b * cat_b).isZ()) {
			cat_a = sluchch(1, 30);
			cat_b = sluchch(1, 30);
		}

	var txt, ver;
	switch (task) {
	case 0:
		txt = (
			'Катеты прямоугольного треугольника равны ' +
			cat_a + ' и ' + cat_b + '. ' +
			'Найдите гипотенузу.');
		ver = [Math.sqrt(cat_a * cat_a + cat_b * cat_b)];
		break;
	case 1:
		txt = (
			'Катеты прямоугольного треугольника равны ' +
			cat_a + ' и ' + cat_b + '. ' +
			'Найдите площадь этого треугольника.');
		ver = [0.5 * cat_a * cat_b];
		break;
	case 2:
		txt = (
			'В прямоугольном треугольнике один катет равен равен ' +
			cat_a + ', а другой ' +
			(cat_a == cat_b // is equal
				? 'равен ему. ' : 'на ' + Math.abs(cat_b - cat_a) +
				(cat_a < cat_b // not equal: cat_a != cat_b
					? ' больше его. ' : ' меньше его. ')) +
			'Найдите площадь треугольника.');
		ver = [0.5 * cat_a * cat_b];
		break;
	}

	chas2.task.setTask({
		text: txt,
		answers: ver,
	})
})();
