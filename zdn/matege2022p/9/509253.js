retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function parabl(a, b, c, x) {
		return a * x * x + b * x + c;
	}

	function f1(x) {
		return parabl(a1, b1, c1, x);
	}

	function f2(x) {
		return parabl(a2, b2, c2, x);
	}
	let x1 = sluchch(-5, 5);
	let x2 = slKrome(x1, 6, 20).pm();

	let a1 = sluchch(1, 2).pm();
	let a2 = slKrome(a1.abs(), 1, 10).pm();
	let a3 = a1 - a2;

	let b3 = -a3 * (x1 + x2);
	let b1 = sluchch(0, 20).pm();
	let b2 = b1 - b3;

	let c3 = a3 * x1 * x2;
	let c1 = sluchch(0, 20).pm();
	let c2 = c1 - c3;

	let D1 = b1 * b1 - 4 * a1 * c1;
	let D2 = b2 * b2 - 4 * a2 * c2;
	if (!D1.isPolnKvadr() || D1 < 0 || D2 < 0)
		return;

	let x01 = -b1 / (2 * a1);
	let y01 = f1(x01);
	if (Math.abs(x01) > 6 || Math.abs(y01) > 5)
		return;

	let x02 = -b2 / (2 * a2);
	let y02 = f2(x02);

	if (Math.abs(x02) > 6 || Math.abs(y02) > 5)
		return;
	if (f1(x1).abs() > 5.5)
		return;

	let points1 = intPoints(f1, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (points1.length < 3)
		return;
	let points2 = intPoints(f2, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (points2.length > 2)
		return;
	let find, answ;
	if (sl1()) {
		find = 'ординату';
		answ = f1(x2);
	} else {
		find = 'абсциссу';
		answ = x2;
	}
	let paint1 = function(ct) {
		h = 400;
		w = 400;
		//Оси координат (сразу со стрелками)
		ct.drawCoordinatePlane (w, h, {
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
		graph9AdrawFunction(ct, f1, {
			minX: -8.5,
            maxX: 8.5,
            minY: -9.5,
            maxY: 7.7,
            step: 0.05,
		});
		graph9AdrawFunction(ct, f2, {
			minX: -8.5,
            maxX: 8.5,
            minY: -9.5,
            maxY: 7.7,
            step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, points1, 3, 0.15);
		graph9AmarkCircles(ct, points2, 3, 0.15);
		graph9AmarkCircles(ct, [
			[x1, f1(x1)]
		], 1, 0.15);
		ct.fillStyle = "blue";
		ct.font = "18px liberation_sans";
		ct.scale(1 / 20, -1 / 20);
		ct.fillText('A', 20 * x1 - 10, -20 * f1(x1));
	};
	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=' + [c2, b2, a2].mn_txt('x') +
			'$ и $g(x)=ax^{2} +bx+c$, которые пересекаются в точках $A$ и $B$. Найдите ' + find + ' точки $B$.',
		answers: answ,
		analys: '$f(x)=' + [c2, b2, a2].mn_txt('x') + '$' +
			',<br>' +
			'$g(x)=' + [c1, b1, a1].mn_txt('x') + '$' +
			'.<br>' +
			'$A(' + x1 + ';' + f1(x1) + ')$<br>' +
			'$B(' + x2 + ';' + f2(x2) + ')$',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509253 509262
