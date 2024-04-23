retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function pryam(k, b, x) {
		return k * x + b;
	}

	function fp(x) {
		return pryam(k, b, x);
	}

	function sq(a, c, x) {
		return a * Math.sqrt(x) + c;
	}

	function fs(x) {
		return sq(a, c, x);
	}

	let x1 = Math.pow(sluchch(0, 10, 0.5), 2);
	let c = sluchch(-10,10);
	let a = sluchch(1, 20).pm();
	let y1 = a * x1.sqrt() + c;
	let k = sluchch(0.25, 20,0.25).pm();
	let b = y1 - k * x1;
	if (a * a - 4 * k * (b - c) != 0)
		return;
	if (x1.abs() < 7 && y1.abs() < 7 && x1.isZ() && y1.isZ())
		return; // Точку видно
	let pointss = intPoints(fs, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (pointss.length < 2)
		return;
	let pointsp = intPoints(fp, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (pointsp.length < 2)
		return;
	let find, answ;
	if (sl1()) {
		answ = x1;
		find = 'абсциссу';
	} else {
		answ = y1;
		find = 'ординату';
	}
	let paint1 = function(ct) {
		let h = 400;
		let w = 400;
		//Оси координат
		ct.drawCoordinatePlane (w, h, {
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
		graph9AdrawFunction(ct, fs, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.01,
		});
		graph9AdrawFunction(ct, fp, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, pointss, 2, 0.15);
		graph9AmarkCircles(ct, pointsp, 2, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=a\\sqrt{x}+c$ и $g(x)=kx+b$,' +
			' которые пересекаются в точке $A$. Найдите ' + find + ' точки $A$.',
		answers: answ,
		analys: '$f(x)=' + (a + '\\sqrt{x}+' + c + '$').plusminus() + '<br>' +
			'$g(x)=' + (k + 'x+' + b).plusminus() + '$<br>' +
			'$A(' + x1 + ';' + y1 + ')$<br>',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509275
