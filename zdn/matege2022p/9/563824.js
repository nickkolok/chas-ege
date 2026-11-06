retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return a * x + plusminus * (b * x + c).abs() + d;
	}
		//Почему бы и не отрицание модуля?)
	let plusminus = (1).pm();
	let znack;
	if (plusminus > 0)
		znack = '+';
	else
		znack = '-';
	let a = sl(1, 10, 0.5).pm();
	let b = slKrome(a.abs(), 1, 10, 0.5).pm();
	let c = sl(-10, 10, 0.5);
	let d = sl(-10, 10, 0.5);
	let p1 = intPoints(f, {
		minX: -c / b,
		maxX: 5,
		minY: -6,
		maxY: 5
	});
	if (p1.length < 2)
		return;
	let p2 = intPoints(f, {
		minX: -5,
		maxX: -c / b,
		minY: -6,
		maxY: 5
	});
	if (p2.length < 2)
		return;
	let a1 = 0,
		b1 = 0,
		c1 = 0,
		d1 = 0;
	let question, answ, q;
	switch (sl(1, 4)) {
	case 1:
		if (f(-c / b).abs() > 7 && (-100 * c / b).isZ()) {
			question = [
				['ординату', f(-c / b)],
				['абсциссу', -c / b]
			].iz();
			answ = question.pop();
			question += ' вершины графика';
			break;
		}
	case 2:
		q = sl(-10, 10, 0.5);
		let variant = ['ax', 'bx'].iz(sl(1, 2));
		if (sl1())
			variant.push('c');
		if (sl1())
			variant.push('d');
		question = 'найдите корень уравнения $' + variant.slag() + '=' + q + '$';
		if (question.includes('ax'))
			a1 = a;
		if (question.includes('bx'))
			b1 = b;
		if (question.includes('c'))
			c1 = c;
		if (question.includes('d'))
			d1 = d;
		answ = (-c1 - d1 + q) / (a1 + b1);
		if ((answ * 100).isZ())
			break;
	case 3:
		question = [
			['сумму', a + b + c + d],
			['произведение', a * b * c * d]
		].iz();
		answ = question.pop();
		question += ' всех коэффициентов';
		break;
	case 4:
		q = [
			[a, '$a$'],
			[b, '$b$'],
			[c, '$c$'],
			[d, '$d$']
		].iz();
		question = q.pop();
		answ = q;
		break;
	}
	let sign = '';
	if (question.includes('всех') || question.includes('корень') || question.includes('b') || question.includes('c')) {
		if (b > 0)
			sign = ', $b' + ['>', '\\geq'].iz() + '0$, ';
		else
			sign = ', $b' + ['<', '\\leq'].iz() + '0$, ';
		if (c >= 0) {
			if (!c)
				sign += '$c \\geq 0$';
			else
				sign += '$c' + ['>', '\\geq'].iz() + '0$';
		} else
			sign += '$c' + ['<', '\\leq'].iz() + '0$';
	}
	let paint1 = function(ct) {
		h = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		//график
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {
			minX: -6,
			maxX: 7,
			minY: -7,
			maxY: 6,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, p1, 2, 0.15);
		graph9AmarkCircles(ct, p2, 2, 0.15);
	};

	NAtask.setTask({
		text: 'На рисунке изображён график функции вида $f(x)=ax+d' + znack +
			'|bx+c|$' + sign + '. Найдите ' +
			question + '.',
		answers: answ,
		analys: '$f(x)=' + (a + 'x+' + (d) + '' + znack + '|' + b + 'x+' + c).plusminus() + '|$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//563824
