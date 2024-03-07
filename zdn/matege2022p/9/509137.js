retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

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
	for (let i = 0; i < points.length; i++)
		for (let j = i + 1; j < points.length; j++)
			if (points[i][1] == points[j][1]) {
				points.splice(j, 1);
				j--;
			}
	if (points.length < 2)
		return;
	let paint1 = function(ct) {
		let h = 400;
		let w = 400;
		//Оси координат
		ct.drawCoordinatePlane (w, h, {
			hor: Math.PI / 4,
			ver: 1
		}, {
			x1: 'π/4',
			y1: '1',
			sh1: 13,
		}, 25);
		//График
		ct.scale(25, -25);
		ct.lineWidth = 0.08;
		graph9AdrawFunction(ct, f, {
			minX: -1.8 * Math.PI,
			maxX: 2 * Math.PI,
			minY: -6.8,
			maxY: 6,
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
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509137 509143
