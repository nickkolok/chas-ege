retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		let angle = b * x * Math.PI + c * factor * Math.PI;
		switch (trigfuncs) {
		case 'sin':
			return a * Math.sin(angle) + d;
		case 'cos':
			return a * Math.cos(angle) + d;
		}
	}
	let trigfuncs = ['sin', 'cos'].iz();
	let a = sluchch(1, 6).pm();
	let b = (1).pm();
	let c = sl1().pm();
	let d = sl(-5, 5);
	if (a.abs() + d.abs() > 6)
		return;
	let factor = sl(0.5, 1.5, 0.5).pm();
	if (factor * c == 2)
		return;
	let formula = 'a\\' + trigfuncs + '(b \\pi x+' + (factor).texfracpi(1) + ' c)+d';
	if (trigfuncs == 'sin') {
		let variant = [
			['a', a.ts()],
			['b', b.ts()],
		].iz();
		formula = formula.replace(variant[0], variant[1]);
	}
	let sign = '<';
	if (a > 0)
		sign = '>';
	let p = intPoints(f, {
		minX: -6,
		maxX: 7,
		minY: -6,
		maxY: 5,
	});
	if (p.length < 1)
		return;
	let question, answ;
	switch (sl(1, 3)) {
	case 1:
		let x1 = sl(5, 10).pm();
		question = '$f(' + x1 + ')$';
		answ = f(x1);
		if ((answ * 1000).isZ())
			break;
	case 2:
		let x2 = sl(5, 10).pm();
		question = '$f(f(' + x2 + '))$';
		answ = f(f(x2));
		if ((answ * 1000).isZ())
			break;
	case 3:
		let st = [
			['произведение', a * b * c * d],
			['сумму', a + b + c + d]
		].iz();
		answ = st[1];
		question = st[0] + ' всех коэффициентов';
		break;
	}
	let limits;
	if (c > 0)
		limits = '[0, 2\\pi)';
	else
		limits = '(-2\\pi, 0]';
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		ct.drawCoordPlane(w, h, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13,
		}, 20);
		//График
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {
			minX: -6.3,
			maxX: 7,
			minY: -7,
			maxY: 6,
			step: 0.05,
		});
		graph9AmarkCircles(ct, p, 4, 0.15);
	};

	NAtask.setTask({
		text: 'На рисунке изображён график функции $f(x)=' + formula.plusminus() + '$, где  $a$, $b$, $c$ и $d$ - целые' +
			(', а $a' + sign + '0$').esli(trigfuncs == 'sin' && formula.includes('a')) + ', $c \\in ' + limits + '$' +
			'. Найдите ' + question +
			'.',
		answers: answ,
		analys: ('$f(x)=' + a + '\\' + trigfuncs + '(' + b.ts() + '\\pi  x+' + (factor).texfracpi(1) + '\\cdot' + '('.esli(
				c < 0) + c + ')'.esli(c < 0) + ')+' + d).replace(
				'+0', '').plusminus() +
			'$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//564542
