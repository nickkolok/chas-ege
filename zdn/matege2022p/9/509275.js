retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function fp(x) {
		return k * x + b;
	}

	function fs(x) {
		if (x1.isPolnKvadr(x1))
			return a.poln * Math.sqrt(x) + c;
		else
			return a.poln * Math.sqrt(a.sqt*x) + c;
	}
	let x1 = sluchch(1, 20);
	let y1 = sluchch(8, 20).pm();
	let k = sluchch(1, 20).pm();
	let a = {
		sqt: 1,
		poln: 2 * k
	};
	if (x1.isPolnKvadr(x1))
		a.poln *= Math.sqrt(x1);
	else
		a.sqt = x1;
	let c = y1 - 2 * x1 * k;
	let b = x1 * k + c;
	if (c == b)
		return;
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
		analys: '$f(x)=' + (a.poln + ('\\sqrt{' + a.sqt + '}').esli(a.sqt!=1)+'\\cdot' + '\\sqrt{x}+' + c + '$').plusminus() + '<br>' +
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
