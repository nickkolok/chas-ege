retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return a * x.pow(2) + b * x.abs() + c;
	}
	let a = sl(0.1, 2, 0.1).pm();
	let b = sl(1, 5, 0.5).pm();
	let c = sl(-5, 5, 0.5);
	let p = intPoints(f, {
		minX: -6,
		maxX: 7,
		minY: -7,
		maxY: 6,
	});
	if (p.length < 1)
		return;
	let formula = ('ax^2+b|x|+c');
	if (p.length != 3) {
		let variant = [
			['a', a.ts()],
			['b', b.ts()],
			['c', c.ts()],
		].iz(3 - p.length);
		formula = formula.replace(variant[0][0], variant[0][1]).replace(variant[1][0], variant[1][1]).plusminus();
	}

	let question, answ;
	switch (sl(1, 2)) {
	case 1:
		let x = sl(6, 10).pm();
		question = '$f(' + x + ')$';
		answ = f(x);
		break;
	case 2:
		let st = [
			['произведение', a * b * c],
			['сумму', a + b + c]
		].iz();
		answ = st[1];
		question = st[0] + ' всех коэффициентов';
	}
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		ct.drawCoordPlane(w, h, {
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
			minX: -6,
			maxX: 7,
			minY: -7,
			maxY: 6,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, p, p.length, 0.15);
	};

	NAtask.setTask({
		text: 'На рисунке изображён график функции вида $f(x)=' + formula +
			'$. где числа $a,b,c$ и $d$ — целые. Найдите ' + question + '.',
		answers: answ,
		analys: '$f(x)=' + (a.ts() + 'x^2+' + b.ts() + '|x|+' + c.ts()).plusminus() + '$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//56382402
