retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return x * x / a + b * x + c;
	}

	let a = sluchch(2, 10, 0.5).pm();
	let b = sl(-10, 10, 0.5);
	let c = sl(-10, 10, 0.5);
	let points = intPoints(f, {
		minX: -5,
		maxX: 6,
		minY: -5.5,
		maxY: 5.5
	});
	if (points.length < 3)
		return;
	let question, answ;
	switch (sl(1, 4)) {
	case 1:
		let num1 = sl(-10, 10);
		question = 'значение дискриминанта уравнения $f(x)=' + num1 + '$';
		answ = b.pow(2) - 4 * (c - num1) / a;
		if ((answ * 1000).isZ())
			break;
	case 2:
		let num2 = sl(5, 10).pm();
		question = 'значение $f(' + num2 + ')$';
		answ = f(num2);
		if ((answ * 1000).isZ())
			break;

	case 3:
		let num3 = sl(1, 10).pm();
		let num4 = slKrome(num3.abs, 1, 10).pm();
		let signs = [
			['+', f(num3) + f(num4)],
			['-', f(num3) - f(num4)],
			['\\cdot', f(num3) * f(num4)],
		].iz();
		question = 'значение $f(' + num3 + ') ' + signs[0] + ' f(' + num4 + ')$';
		answ = signs[1];
		if ((answ * 1000).isZ())
			break;
	case 4:
		let x0 = -b * a / 2;
		let y0 = f(x0);
		if (x0.abs() < 5 && y0.abs() < 6 && y0.isZ() && x0.isZ())
			return;
		if (sl1()) {
			question = 'абсциссу вершины параболы';
			answ = x0;
		} else {
			question = 'ординату вершины параболы';
			answ = y0;
		}
	}
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		ct.lineWidth = 0.1;
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		//График
		graph9AdrawFunction(ct, f, {
			minX: -6,
			maxX: 6,
			minY: -7,
			maxY: 5.7,
			step: 0.05,
		});

		//точки
		graph9AmarkCircles(ct, points, 3, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображен график функции $f(x)=\\frac{x^2}{a}+bx+c$, где $a, b$ и $c$ - целые. Найдите ' +
			question + '.',
		answers: answ,
		analys: ('$f(x)=\\frac{' + 'x^2}{' + a + '}+' + b + 'x+' + c).plusminus() + '$'
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//562061 562153
