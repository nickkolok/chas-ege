retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return k / ((x + a).pow(2));
	}

	let a = sluchch(1, 8, 0.5).pm();
	let k = sl(1, 10).pm();
	let points = intPoints(f, {
		minX: -5,
		maxX: 6,
		minY: -5.5,
		maxY: 5.5
	});
	if (points.length < 2)
		return;
	let find, answ;
	let chisl = slKrome(a.abs(), 6, 10).pm();
	if (!(chisl - a))
		return;
	if (sl1()) {
		find = '$f(' + chisl.ts() + ')$';
		answ = f(chisl);
		if (!(answ * 1000).isZ())
			return;
	} else {
		answ = chisl;
		let variant;
		if (chisl > a)
			variant = 'наибольшее';
		else
			variant = 'наименьшее';
		find = variant + ' значение $x$, при котором $f(x)=' + f(chisl).ts() + '$';
		if (!(f(chisl) * 1000).isZ())
			return;
	}

	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		ct.lineWidth = 0.1;
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		//График
		graph9AdrawFunction(ct, f, {
			minX: -6,
			maxX: 6,
			minY: -7,
			maxY: 5.7,
			step: 0.05,
		});

		//точки
		graph9AmarkCircles(ct, points, 3, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображен график функции $f(x)=\\frac{k}{(x' + ['+', '-'].iz() + 'a)^2}$. Найдите ' + find +
			'.',
		answers: answ,
		analys: ('$f(x)=\\frac{' + k + '}{(x+' + a + ')^2}').plusminus() + '$'
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//50895101
