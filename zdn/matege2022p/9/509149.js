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
		minX: -5,
		maxX: 6,
		minY: -5.5,
		maxY: 5.5
	});
	if (pointsP.length < 3)
		return;
	let pointsK = intPoints(kf, {
		minX: -5,
		maxX: 6,
		minY: -5.5,
		maxY: 5.5
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
		let h = 300;
		let w = 300;
		//Оси координат 
		graph9AdrawAxes_20_300(ct);
		ct.translate(10, -10);
		//График
		ct.lineWidth = 0.1;
		ct.translate(h / 2, h / 2);
		//буква
		ct.font = "15px liberation_sans";
		ct.fillText('A', 20 * x1 + 10, -20 * y1 + 10);
		ct.scale(20, -20);
		graph9AdrawFunction(ct, kf, {
			minX: -6,
			maxX: 6,
			minY: -7,
			maxY: 5.7,
			step: 0.05,
		});
		graph9AdrawFunction(ct, pf, {
			minX: -6,
			maxX: 5.7,
			minY: -7,
			maxY: 6,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, pointsK, 2, 0.15);
		graph9AmarkCircles(ct, pointsP, 3, 0.15);
		ct.fillKrug(x1, y1, 0.15); //на всякий случай точку пересечения
	};
	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=' + (k + 'x+' + b).replace('+0', '').plusminus() +
			'$ и $g(x)=ax^2+bx+c$,' +
			' которые пересекаются в точках $A$ и $B$. Найдите ' + find + ' точки $B$.',
		answers: answ,
		analys: '$' + (k + 'x+' + d).replace('+0', '').plusminus() + `$<br/>` +
			'$' + (a + 'x^2+' + b + 'x+' + c).replace('0x+', '').replace('+0', '').plusminus() + '$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//509149 509158
