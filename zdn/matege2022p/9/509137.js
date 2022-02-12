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
	let trigfuncs = ['tg', 'ctg'].iz();
	let a = sluchch(1, 6).pm();
	let b = sluchch(0, 10).pm();
	let find, answ;
	if (sl1()) {
		find = 'a';
		answ = a;
	} else {
		find = 'b';
		answ = b;
	}
	let points = intPoints(f, {
		minX: -Math.PI,
		maxX: 1.5 * Math.PI,
		minY: -4,
		maxY: 4,
		step: Math.PI / 4,
	});
	if (points.length < 2)
		return;
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		ct.drawCoordPlane(w, h, {
			hor: Math.PI / 4,
			ver: 1
		}, {
			x1: 'π/4',
			y1: '1',
			sh1: 13,
		}, 30);
		//График
		ct.scale(30, -30);
		ct.lineWidth = 0.08;
		graph9AdrawFunction(ct, f, {
			minX: -1.2 * Math.PI,
			maxX: 1.4 * Math.PI,
			minY: -4.8,
			maxY: 5,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, points, 2, 0.15);
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
//509137 509143
