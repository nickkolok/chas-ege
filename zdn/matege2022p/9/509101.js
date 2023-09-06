retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function axb(a, x, b) {
		if (a > 0)
			return Math.pow(a, x + b);
		return -Math.pow(a.abs(), x + b);
	}

	function f(x) {
		return axb(a, x, b);
	}
	let a = slKrome([1], 0.25, 20, 0.25).pm();
	let b = sluchch(0, 20, 0.5).pm();
	let chisl = sluchch(0, 10).pm();
	if (f(chisl).abs() < 6 && f(chisl).isZ())
		return;
	//если находится в видимой части и целое(можно определить по графику)
	if (!(1000 * f(chisl)).isZ())
		return;
	//если нецелое
	if (f(chisl).abs() > 10000)
		return;
	//слишком большое
	let find, answ;
	if (sl1()) {
		find = `$f(${chisl.ts()})$`;
		answ = f(chisl);
	} else {
		answ = chisl;
		find = `значение $x$, при котором $f(x)=${f(chisl).ts() }$`;
	}
	let points = intPoints(f, {
		minX: -8,
		maxX: 8,
		minY: -8,
		maxY: 8
	});
	if (points.length < 2)
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
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		//график
		graph9AdrawFunction(ct, f, {
			minX: -8.5,
			maxX: 8.5,
			minY: -8.8,
			maxY: 8.5,
			step: 0.05
		});
		//точки
		graph9AmarkCircles(ct, points, 2, 0.15);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=${` - `.esli(a<0)}a^{x+b}$. Найдите ${find}. `,
		answers: answ,
		analys: `$f(x)=` + a + `^{` + (`x+` + b).replace(`+0`, ``) + `}$`,
	});
	NAtask.modifiers.beautifyAlgebraicNotation();
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509101 509107
