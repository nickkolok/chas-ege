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
	switch (sl(1, 3)) {
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
		question = 'корень уравнения $';
		if (sl1()) {
			a1 = a;
			question += 'ax+';
		}
		if (sl1() || !a1) {
			b1 = b;
			question += 'bx+';
		}
		if (sl1() || !d1) {
			c1 = c;
			question += 'c+';
		}
		if (sl1()) {
			d1 = d;
			question += 'd+';
		}
		question = question.slice(0, -1) + '=' + q + '$';
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
	}
	let sign = '';
	if (question.includes('всех') || question.includes('корень')) {
		if (b > 0)
			sign = '$b' + ['>', '\\geq'].iz() + '0$, ';
		else
			sign = '$b' + ['<', '\\leq'].iz() + '0$, ';
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
			'|bx+c|$, где числа $a$, $b$, $c$ и $d$ — целые ' + sign + '. Найдите ' +
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
