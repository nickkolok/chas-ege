retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function intPoints(f, o) {
		o.minX = o.minX.ceil();
		o.maxX = o.maxX.floor();
		let XY = [];
		for (let i = o.minX; i < o.maxX; i += o.step) {
			if (f(i).isZ() && f(i) <= o.maxY && f(i) >= o.minY) {
				XY.push([i, f(i)]);
			}
		}
		return XY;
	}

	function variant(a, b, x) {
		switch (trigfuncs) {
		case 'sin':
			return a * Math.sin(x * Math.PI / 6) + b;
		case 'cos':
			return a * Math.cos(x * Math.PI / 6) + b;
		case 'tg':
			return a * Math.tan(x * Math.PI / 6) + b;
		case 'ctg':
			return a * (1 / Math.tan(x * Math.PI / 6)) + b;
		}
	}

	function f(x) {
		return 2 * variant(a, b, x);
	}

	function fp(x) {
		return variant(a, b, x);
	}
	let trigfuncs = ['sin', 'cos', 'tg', 'ctg'].iz();
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
	let points;
	if (trigfuncs == 'sin' || trigfuncs == 'cos')
		points = intPoints(f, {
			minX: -6,
			maxX: 5.5,
			minY: -7.5,
			maxY: 4.5,
			step: 1,
		});
	else
		points = intPoints(f, {
			minX: -6,
			maxX: 5.5,
			minY: -7.5,
			maxY: 4.5,
			step: 0.5,
		});
	if (points.length < 2)
		return;
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат 
		ct.drawCoordPlane(w, h, {
			hor: 3,
			ver: 4
		}, {
			x1: 'π/4',
			y1: '1',
			sh1: 13,
		}, 10);
		//График
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {
			minX: -6.5,
			maxX: 5,
			minY: -8,
			maxY: 5,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, points, 2, 0.18);
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
