function intPointsForTrig(f, o) {
	if (o.step === undefined) {
		o.minX = o.minX.ceil();
		o.maxX = o.maxX.floor();
		o.step = 1;
	}
	let XY = [];
	let Y = [];
	for (let i = o.minX; i < o.maxX; i += o.step) {
		if (f(i) <= o.maxY && f(i) >= o.minY)
			if ((f(i)*2).isZ())
				if (!Y.includes(f(i))) {
					Y.push(f(i));
					XY.push([i, f(i)]);
				}
	}
	//Y.length=0;
	return XY;
}
retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function variant(x) {
		switch (trigfuncs) {
		case 'sin':
			return a * Math.sin(x) + b;
		case 'cos':
			return a * Math.cos(x) + b;
		case 'tg':
			return a * Math.tan(x) + b;
		case 'ctg':
			return a * (1 / Math.tan(x)) + b;
		}
	}

	function f(x) {
		return variant(x);
	}
	let trigfuncs = ['sin', 'cos', 'tg', 'ctg'].iz();
	let a = sluchch(0.5, 6, 0.5).pm();
	let b = sluchch(0, a.abs()).pm();
	let find, answ;
	if (sl1() && trigfuncs != 'tg' && trigfuncs != 'ctg') {
		find = 'a';
		answ = a;
	} else {
		find = 'b';
		answ = b;
	}
	let znam = [2, 3, 4, 6].iz();
	let limits;
	switch (znam) {
	case 2:
		limits = [-2.5, 3];
		break;
	case 3:
		limits = [-3, 5];
		break;
	case 4:
		limits = [-5, 6];
		break;
	case 6:
		limits = [-8, 11];
		break;
	}

	let mashX = Math.PI / znam;
	let p = intPointsForTrig(f, {
		minX: (limits[0]) * mashX,
		maxX: (limits[1]) * mashX,
		minY: -4,
		maxY: 4,
		step: mashX,
	});
	if (p.length < 2)
		return;
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		ct.drawCoordPlane(w, h, {
			hor: mashX,
			ver: 0.5
		}, {
			x1: 'π/' + znam,
			y1: '0.5',
			sh1: 13,
		}, 30);
		//График
		ct.scale(30, -30);
		ct.lineWidth = 0.05;
		graph9AdrawFunction(ct, f, {
			minX: (limits[0]-0.4) * mashX,
			maxX: limits[1] * mashX,
			minY: -4.5,
			maxY: 4,
			step: 0.01,
		});
		graph9AmarkCircles(ct, p, 2, 0.1);
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
