retryWhileUndefined(function () {
	NAinfo.requireApiVersion(0, 2);

	function variant(a, b, x) {
		switch (trigfuncs) {
			case 'sin':
				return a * Math.sin(x * Math.PI / 2) + b;
			case 'cos':
				return a * Math.cos(x * Math.PI / 2) + b;
			case 'tg':
				return a * Math.tan(x * Math.PI / 2) + b;
			case 'ctg':
				return a * (1 / Math.tan(x * Math.PI / 2)) + b;
		}
	}

	function f(x) {
		return 0.5 * variant(a, b, x);
	}
	let trigfuncs = ['sin', 'cos', 'tg', 'ctg'].iz();
	let a = sluchch(1, 6).pm();
	let b = sluchch(0, a).pm();
	let find, answ;
	if (sl1() && trigfuncs != 'tg' && trigfuncs != 'ctg') {
		find = 'a';
		answ = a;
	} else {
		find = 'b';
		answ = b;
	}
	let X = [],
		Y = [];
	for (let i = -2; i < 4; i++)
		if (2 * f(i) < 5 && 2 * f(i) > -6) {
			X.push(i);
			Y.push(f(i));
		}
	if (X.length < 2)
		return;
	let paint1 = function (ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		ct.drawCoordinatePlane (w, h, {
			hor: 2,
			ver: 1
		}, {
			x1: 'π/2',
			y1: '1',
			sh1: 13,
		}, 20);
		//График
		ct.scale(40, -40);
		ct.lineWidth = 0.05;
		graph9AdrawFunction(ct, f, {
			minX: -2.6,
			maxX: 4,
			minY: -4,
			maxY: 3,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, [X, Y].T(), 2, 0.1);
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
