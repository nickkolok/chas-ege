retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return k.num * Math.sqrt(x * k.sq) / k.det;
	}
	let k = {
		sq: sl(1, 10),
		num: sl(1, 10).pm(),
		det: sl(1, 10),
	};
	if (k.sq.isPolnKvadr()) {
		k.num *= k.sq.sqrt();
		k.sq = 1;
	}
	let chisl = k.sq * sl(1, 10).pow(2);
	let find, answ;
	if (sl1()) {
		find = '$f(' + chisl + ')$';
		answ = f(chisl).ts();
	} else {
		answ = chisl.ts();
		find = 'значение $x$, при котором $f(x)=' + f(chisl).ts(1) + '$';
	}
	if (!(answ * 1000).isZ() || !(f(chisl)).isZ())
		return;
	if (f(chisl).abs() < 8 && chisl < 12)
		return;
	let p = intPoints(f, {
		minX: 0,
		maxX: 11,
		minY: -6,
		maxY: 5,
	});
	if (p.length < 2)
		return;
	let paint1 = function(ct) {
		let h = 400;
		let w = 600;
		//Оси координат
		ct.translate(-200, 0);
		ct.drawCoordPlane(w, h, {
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
		graph9AdrawFunction(ct, f, {
			minX: 0,
			maxX: 11,
			minY: -6.5,
			maxY: 6,
			step: 0.05,
		});

		//точки
		graph9AmarkCircles(ct, p, 2, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображён график функции $f(x)=k\\sqrt{x}$. Найдите ' + find +
			'. ',
		answers: answ,
		analys: ('$f(x)=' + k.num.texfrac(k.det) + '\\sqrt{' + k.sq + '}' + '\\sqrt{x}$').plusminus().replace('\\sqrt{1}',
			''),
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509116
