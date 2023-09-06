retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function kf(x) {
		return kxd(k, d, x);
	}

	function kxd(k, d, x) {
		return k * x + d;
	}

	function pf(x) {
		return parabl(a, b, c, x);
	}

	function parabl(a, b, c, x) {
		return a * x * x + b * x + c;
	}
	let x1 = sluchch(-6, 5);
	let x2 = slKrome(x1, -20, 20);
	let y1 = sluchch(-7, 5);
	let y2 = sluchch(7, 20).pm();
	let k = (y1 - y2) / (x1 - x2);
	if (!k.isZ() || !k)
		return;
	let d = y1 - k * x1;
	if (!d.isZ())
		return;

	let a = sluchch(1, 3).pm();
	let b = k - a * (x1 + x2);
	let c = d + x1 * x2 * a;

	let D = b * b - 4 * a * c;
	let x0 = -b / (2 * a);
	let y0 = parabl(a, b, c, x0);
	if (D < 0 || !D.isPolnKvadr() || (Math.abs(x0) > 6 || Math.abs(y0) > 5))
		return;
	let pointsP = intPoints(pf, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
	});
	if (pointsP.length < 3)
		return;
	let pointsK = intPoints(kf, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
	});
	if (pointsK.length < 2)
		return;
	let answ, find;
	if (sl1()) {
		find = 'ординату';
		answ = y2;
	} else {
		find = 'абсциссу';
		answ = x2;
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

		ct.lineWidth = 0.1;

		ct.scale(20, -20);
		//График
		graph9AdrawFunction(ct, kf, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		graph9AdrawFunction(ct, pf, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, pointsK, 2, 0.15);
		graph9AmarkCircles(ct, pointsP, 3, 0.15);
		graph9AmarkCircles(ct, [x1, y1], 1, 0.15); //на всякий случай точку пересечения
		//буква
		ct.fillStyle = "blue";
		ct.font = "18px liberation_sans";
		ct.scale(1 / 20, -1 / 20);
		ct.fillText('A', 20 * x1 - 10, -20 * y1 - 10);
	};
	let pryamay;
	if (!d && sl1())
		pryamay = 'kx+d';
	else
		pryamay = (['k', k].iz() + 'x +' + ['d', d].iz()).replace('+0', '').plusminus();

	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=' + pryamay +
			'$ и $g(x)=ax^2+bx+c$,' +
			' которые пересекаются в точках $A$ и $B$. Найдите ' + find + ' точки $B$.',
		answers: answ,
		analys: '$f(x)=' + (k + 'x+' + d).replace('+0', '').plusminus() + `;$<br>` +
			'$g(x)=' + (a + 'x^2+' + b + 'x+' + c).replace('+0', '').plusminus() + '.$<br>' +
			'$A(' + x1 + ';' + y1 + ')$<br>' +
			'$B(' + x2 + ';' + y2 + ')$',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509149 509158
