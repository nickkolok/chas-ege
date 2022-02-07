retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function intPoints(f, o) {
		if (o.step === undefined) {
			o.minX = o.minX.ceil();
			o.maxX = o.maxX.floor();
			o.step = 1;
		}
		let XY = [];
		for (let i = o.minX; i < o.maxX; i += o.step) {
			if (f(i).isZ() && f(i) <= o.maxY && f(i) >= o.minY) {
				XY.push([i, f(i)]);
			}
		}
		return XY;
	}

	function variant(a, b, x) {
		return a * (x)[trigfuncs]() + b;
	}

	function f(x) {
		return variant(a, b, x);
	}
	let trigfuncs = ['sin', 'cos'].iz();
	let a = sluchch(1, 6).pm();
	let b = sluchch(0, a).pm();
	let find, answ;
	if (sl1()) {
		find = 'a';
		answ = a;
	} else {
		find = 'b';
		answ = b;
	}
	let points = intPoints(f, {
		minX: -1.5 * Math.PI,
		maxX: 2 * Math.PI,
		minY: -5,
		maxY: 5,
		step: Math.PI / 2,
	});
	if (points.length < 2)
		return;
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		ct.drawCoordPlane(w, h, {
			hor: Math.PI / 2,
			ver: 1
		}, {
			x1: 'π/2',
			y1: '1',
			sh1: 13,
		}, 20);
		//График
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {
			minX: -1.8 * Math.PI,
			maxX: 2.5 * Math.PI,
			minY: -7,
			maxY: 6,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, points, 2, 0.2);
	};
	NAtask.setTask({
		text: 'На рисунке изображён график функции $f(x)=a\\' + trigfuncs + ' x+b$. Найдите $' + find + '$.',
		answers: answ,
		analys: '$f(x)=' + (a + '\\' + trigfuncs + ' x+' + b).replace('+0', '').plusminus() + '$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//509123 509130 509137 509143 509287 509295
