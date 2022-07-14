retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return (k * x + b).abs() + c;
	}

	function f1(x) {
		return -k * x - b + c;
	}

	function f2(x) {
		return k * x + b + c;
	}
	let k = sl(1, 10).pm();
	let b = sl(-8, 8);
	let c = sl(-8, 8);
	if ((-b / k).abs() > 5.5 || f(-b / k).abs() > 5)
		return;
	let limits = [
		[-6, -b / k],
		[-b / k, 6]
	];
	if (k < 0)
		limits = [
			[-b / k, 6],
			[-6, -b / k]
		];

	let p1 = intPoints(f1, {
		minX: limits[0][0],
		maxX: limits[0][1],
		minY: -6,
		maxY: 5,
	});
	if (p1.length < 2)
		return;
	let p2 = intPoints(f2, {
		minX: limits[1][0],
		maxX: limits[1][1],
		minY: -6,
		maxY: 5,
	});
	if (p2.length < 2)
		return;
	let formula = ('|kx+b|+c');

	let question, answ;
	switch (sl(1, 2)) {
	case 1:
		let x = sl(6, 10).pm();
		question = '$f(' + x + ')$';
		answ = f(x);
		break;
	case 2:
		let st = [
			['произведение $k \\cdot b \\cdot c$', k * b * c],
			['сумму $k+b+c$', k + b + c]
		].iz();
		answ = st[1];
		question = st[0];
		break;
	}
	let sign = [
		['>', ' \\geq '].iz(), ['>', '\\geq'].iz()
	];
	if (k < 0)
		sign[0] = ['<', ' \\leq '].iz();
	if (b < 0)
		sign[1] = ['<', ' \\leq '].iz();
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
		//график
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {
			minX: -6.3,
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
		text: 'На рисунке изображён график функции вида $f(x)=' + formula +
			'$, где числа $b$, $c$ и $k$ — целые, $k' + sign[0] + '0$, $b' + sign[1] + '0$. Найдите ' + question + '.',
		answers: answ,
		analys: '$f(x)=|' + (k + 'x+' + b + '|+' + c).plusminus() + '$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//56382403
