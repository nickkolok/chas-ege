retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function fa(x) {
		if (a > 0)
			return Math.pow(a, x) + b;
		return -Math.pow(a.abs(), x) + b;
	}

	function fp(x) {
		return k * x + c;
	}
	let a = slKrome([1], 0.25, 20, 0.25).pm();
	let b = sluchch(1, 10).pm();
	let x1 = sl(-5, 5);
	let x2 = sl(-7, 7);
	let y1 = fa(x1);
	if (y1.abs() < 7)
		return;

	let y2 = fa(x2);
	if (y2.abs() < 7)
		return;
	let k = (y1 - y2) / (x1 - x2);
	if (!k.isZ() && k != 0)
		return;
	let c = y1 - k * x1;
	let pointsp = intPoints(fp, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (pointsp.length < 2)
		return;
	let points = intPoints(fa, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (!points.length)
		return;
	let find, answ;
	if (sl1()) {
		find = 'a';
		answ = a.abs();
	} else {
		answ = b;
		find = 'b';
	}
	let paint1 = function(ct) {
		h = 400;
		w = 400;
		//Оси координат
		ct.drawCoordPlane(w, h, {hor: 1,ver: 1}, {x1: '1',y1: '1',sh1: 13,}, 20);
		
		
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		//график
		graph9AdrawFunction(ct, fa, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05
		});
		graph9AdrawFunction(ct, fp, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05
		});
		//точки

		graph9AmarkCircles(ct, pointsp, 2, 0.15);
		graph9AmarkCircles(ct, points, 1, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=' + '-'.esli(a < 0) +
			'a^x+b$ и $g(x)=kx+c$, пересекающиеся в точках $A(' + x1 + ';' + y1 + ')$ и $B(' + x2 + ';' + y2 +
			')$. Найдите $' + find + '$.',
		answers: answ,
		analys: '$f(x)=' + (a + '^{x}+' + b).replace('+0', '').plusminus() + ',$<br>' +
			'$g(x)=' + (k + 'x+' + c).replace('+0', '').plusminus()+'$<br>'+
			'$A(' + x1 + ';' + y1 + ')$<br>' +
			'$B(' + x2 + ';' + y2 + ')$',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 1000000);
//50909501
