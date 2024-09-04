retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return a * x.pow(2) + b * x.abs() + c;
	}
	let c = sl(1, 10, 0.5).pm();
	let b = sl(1, 10, 0.5).pm();
	let a = b.pow(2) / (4 * c);
	if (!(a * 1000).isZ())
		return;
	let p = intPoints(f, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
	});
	if (p.length < 2)
		return;
	for (let i = 0; i < p.length; i++)
		p[i][0] = p[i][0].pm();
	let formula = 'ax^2+b|x|+c';
	if (p.length == 2) {
		let variant = [
			['a', a.ts()],
			['b', b.ts()],
			['c', c.ts()],
		].iz();
		formula = formula.replace(variant[0], variant[1]).plusminus();
	}

	let question, answ;
	switch (sl(1, 3)) {
	case 1:
		let num1 = sl(-10, 10);
		question = 'значение дискриминанта уравнения $f(x)=' + num1 + '$';
		answ = b.pow(2) - 4 * (c - num1) * a;
		if ((answ * 1000).isZ())
			break;
	case 2:
		let x = sl(6, 10).pm();
		question = '$f(' + x + ')$';
		answ = f(x);
		break;
	case 3:
		let st = [
			['произведение', a * b * c],
			['сумму', a + b + c]
		].iz();
		answ = st[1];
		question = st[0] + ' всех коэффициентов многочлена';
		break;
	}
	let paint1 = function(ct) {
		let h = 400;
		let w = 400;
		//Оси координат
		ct.drawCoordPlane(w, h, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13,
		}, 20);
		//график
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, p, 3, 0.15);
	};

	NAtask.setTask({
		text: 'На рисунке изображён график функции вида $f(x)=' + formula +
			'$. Найдите ' + question + '.',
		answers: answ,
		analys: '$f(x)=' + (a.ts() + 'x^2+' + b.ts() + '|x|+' + c.ts()).plusminus() + '$',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//56382402
