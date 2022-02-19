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

	let x1 = Math.pow(sluchch(0, 10), 2); //36
	let y1 = sluchch(8, 20).pm();
	let k = sluchch(1, 20,0.5).pm();
	let a = sluchch(1, 20).pm();
	let c = y1 - a * Math.sqrt(x1);
	let b = y1 - k * x1;
	if (a * a - 4 * k * (b - c) != 0)
		return;
	let pointss = intPoints(fs, {
		minX: -5,
		maxX: 5,
		minY: -5.5,
		maxY: 5.5,
		step: 1,
	});
	if (pointss.length < 2)
		return;
	let pointsp = intPoints(fp, {
		minX: -5,
		maxX: 5,
		minY: -5.5,
		maxY: 5.5,
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
		graph9AdrawFunction(ct, fs, {
			minX: -6.5,
			maxX: 7,
			minY: -7,
			maxY: 6,
			step: 0.01,
		});
		graph9AdrawFunction(ct, fp, {
			minX: -6.5,
			maxX: 7,
			minY: -7,
			maxY: 6,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, pointss, 2, 0.15);
		graph9AmarkCircles(ct, pointsp, 2, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=a\\sqrt{x}+c$ и $g(x)=kx+b$,' +
			' которые пересекаются в точке $A$. Найдите ' + find + ' точки $А$.',
		answers: answ,
		analys: '$f(x)=' + (a + '\\sqrt{x}+' + c + '$').plusminus() + '<br>' +
			'$g(x)=' + (k + 'x+' + b).plusminus() + '$<br>' +
			'$A(' + x1 + ';' + y1 + ')$<br>',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//509275
