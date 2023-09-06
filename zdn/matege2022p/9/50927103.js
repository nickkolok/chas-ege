retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function fp(x) {
		return k * x + d;
	}

	function fs(x) {
		return a * (x + b).sqrt() + c;
	}

	let x1 = sluchch(1, 6).pm();
	let x2 = sluchch(8, 20);
	let y1 = sl(-6, 6);
	let y2 = sl(0, 20).pm();
	let k = (y1 - y2) / (x1 - x2);
	if (!(k * 1000).isZ() || !k)
		return;
	let d = y1 - k * x1;
	let b = slKrome([-x1, -x2].iz(), -6, 6, 0.5);
	let a = (y1 - y2) / ((x1 + b).sqrt() - (x2 + b).sqrt());
	if (!(a * 1000).isZ())
		return;
	let c = y1 - a * (x1 + b).sqrt();
	let pointss = intPoints(fs, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (pointss.length < 3)
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
		answ = x2;
		find = 'абсциссу';
	} else {
		answ = y2;
		find = 'ординату';
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
		//График
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, fs, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.0005,
		});
		graph9AdrawFunction(ct, fp, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, pointss, 3, 0.15);
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
		text: 'На рисунке изображены графики функций $f(x)=a\\sqrt{x' + ['+', '-'].iz() + 'b}+c$ и $g(x)=kx' + ['+', '-']
			.iz() +
			'd$,' +
			' которые пересекаются в точках $A$ и $B$. Найдите ' + find + ' точки $B$.',
		answers: answ,
		analys: '$f(x)=' + (a + '\\sqrt{x+' + b + '}+' + c + '$').plusminus() + '<br>' +
			'$g(x)=' + (k.ts() + 'x+' + d.ts()).plusminus() + '$<br>' +
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
//50927103
