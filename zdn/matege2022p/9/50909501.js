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
		minX: -5,
		maxX: 5,
		minY: -5.5,
		maxY: 5.5,
		step: 1,
	});
	if (pointsp.length < 2)
		return;
	let points = intPoints(fa, {
		minX: -5,
		maxX: 5,
		minY: -7,
		maxY: 5,
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
		h = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		//график
		graph9AdrawFunction(ct, fa, {
			minX: -5.5,
			maxX: 6.5,
			minY: -6.8,
			maxY: 5.5,
			step: 0.05
		});
		graph9AdrawFunction(ct, fp, {
			minX: -5.5,
			maxX: 6.5,
			minY: -6.8,
			maxY: 5.5,
			step: 0.05
		});
		//точки

		graph9AmarkCircles(ct, pointsp, 2, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображён графики функций $f(x)=' + '-'.esli(a < 0) +
			'a^x+b$ и $g(x)=kx+c$, пересекающиеся в точках $A(' + x1 + ';' + y1 + ')$ и $B(' + x2 + ';' + y2 +
			')$. Найдите $' + find + '$.',
		answers: answ,
		analys: `$f(x)=` + (a + `^{x}+` + (b)).replace('+0', '').plusminus() + `$<br>` +
			'$A(' + x1 + ';' + y1 + ')$<br>' +
			'$B(' + x2 + ';' + y2 + ')$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 1000000);
//50909501
