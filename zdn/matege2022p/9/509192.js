retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function giperbl(k2, b2, x) {
		return k2 / x + b2;
	}

	function fg(x) {
		return giperbl(k2, b2, x);
	}

	function pryam(k1, b1, x) {
		return k1 * x + b1;
	}

	function fp(x) {
		return pryam(k1, b1, x);
	}
	let x1 = sluchch(-6, 6);
	let y1 = sluchch(-7, 6);
	let x2 = sluchch(-10, 10);
	let y2 = sluchch(8, 20).pm();

	let k1 = (y1 - y2) / (x1 - x2);
	if (!k1.isZ() && k1 != 0)
		return;
	let b1 = y1 - k1 * x1;

	let b2 = (y1 * x1 - y2 * x2) / (x1 - x2);
	if (!b2.isZ())
		return;
	let k2 = (y1 - b2) * x1;
	if (!k2 || k2 > 50)
		return;
	let pointsg = intPoints(fg, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (pointsg.length < 2)
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

	let paint1 = function(ct) {
		let h = 400;
		let w = 400;
		//Оси координат
		ct.drawCoordinatePlane(w, h, {
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
		graph9AdrawFunction(ct, fg, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		graph9AdrawFunction(ct, fp, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, pointsg, 2, 0.15);
		graph9AmarkCircles(ct, pointsp, 2, 0.15);
		graph9AmarkCircles(ct, [
			[x1, y1]
		], 2, 0.15);
		//буква
		ct.fillStyle = "blue";
		ct.font = "18px liberation_sans";
		ct.scale(1 / 20, -1 / 20);
		ct.fillText('A', 20 * x1 - 10, -20 * y1 - 10);
	};
	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=k_1 x+b_1$ и $g(x)=\\frac{k_2}{x}+b_2$' +
			', которые пересекаются в точках $A$ и $B$. ',
		analys: '$f(x)=' + (k1 + 'x+' + b1).plusminus() + '$<br>' +
			'$g(x)=' + ('\\frac{' + k2 + '}{x}+' + b2 + '$').plusminus() + '<br>' +
			'$A(' + x1 + ';' + y1 + ')$<br>' +
			'$B(' + x2 + ';' + y2 + ')$',
	});
	NAtask.modifiers.askAboutPoint('$B$', [x2, y2]);
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509192 509167
