retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return k / ((x + a).pow(2));
	}

	let a = sluchch(1, 8, 0.5).pm();
	let k = sl(1, 10).pm();
	let points = intPoints(f, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
	});
	if (points.length < 2)
		return;
	let find, answ;
	let chisl = slKrome(a.abs(), 0, 10).pm();
	let d = (chisl.abs() - a.abs()).abs();
	if (!(d) || (f(chisl).isZ() && chisl.abs() < 6))
		return;
	if (sl1()) {
		find = '$f(' + chisl.ts() + ')$';
		answ = f(chisl);
		if (!(answ * 1000).isZ())
			return;
	} else {
		answ = chisl;
		let variant;
		if (chisl > -a)
			if (chisl > 0 && chisl - 2 * d < 0)
				variant = ['положительное', 'наибольшее'].iz();
			else
				variant = 'наибольшее';
		else
		if (chisl < 0 && chisl + 2 * d > 0)
			variant = ['отрицательное', 'наименьшее'].iz();
		else
			variant = 'наименьшее';
		find = variant + ' значение $x$, при котором $f(x)=' + f(chisl).ts() + '$';
		if (!(f(chisl) * 1000).isZ())
			return;
	}
	let paint1 = function(ct) {
		let h = 400;
		let w = 400;
		//Оси координат
		ct.drawCoordPlane(w, h, {hor: 1,ver: 1}, {x1: '1',y1: '1',sh1: 13,}, 20);
		
		ct.lineWidth = 0.1;
		
		ct.scale(20, -20);
		//График
		graph9AdrawFunction(ct, f, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
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
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//50895101
