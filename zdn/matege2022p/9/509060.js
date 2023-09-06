retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return logAB(zn, a, x, b, c);
	}

	function logAB(zn, a, x, b, c) {
		return zn * Math.log(x + b) / Math.log(a) + c;
	}
	let c = sluchch(-10, 10);
	let zn = (1).pm();
	let a = slKrome(1, 0.25, 20, 0.25);
	let b = sluchch(-10, 10);
	let chisl = a.pow(sluchch(1, 10) / [1, 2, 3].iz().pm()) - b;
	if (chisl > 10000)
		return;
	if ((chisl.abs() <= 6 && f(chisl).abs() < 6 && f(chisl).isZ()) || !(chisl * 1000).isZ() || (!(1000 * f(chisl)).isZ()))
		return;
	let find, answ;
	if (sl1()) {
		find = `$f(${chisl.ts()})$`;
		answ = f(chisl).ts();
	} else {
		answ = chisl;
		find = `значение $x$, при котором $f(x)=${(f(chisl)).ts()}$`;
	}
	let points = intPoints(f, {
		minX: -5,
		maxX: 6,
		minY: -6,
		maxY: 5
	});
	if (points.length < 2)
		return;
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
		//график
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {
			minX: -8,
			maxX: 8,
			minY: -7,
			maxY: 7,
			step: 0.05
		});
		//точки
		graph9AmarkCircles(ct, points, 2, 0.15);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=${` - `.esli(zn<0)}\\log{_a}{(x+b)}+${c}$. Найдите ${find}. `.replace(
			`-0`, ``).replace(`+0`, ``).plusminus(),
		answers: answ,
		analys: ('$f(x)=' + `-`.esli(zn < 0) + '\\log_{' + a + '}(' + 'x+' + b + ')+' + c + '$').plusminus(),
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509060
