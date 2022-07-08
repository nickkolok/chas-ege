retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return (k * x + b).abs() + c;
	}

	function f1(x) {
		return -k * x - b + c;
	}

	function f2(x) {
		return k * x + b + c;
	}
	let k = sl(1, 10);
	let b = sl(-8, 8);
	let c = sl(-8, 8);
	if ((-b / k).abs() > 5.5 || f(-b / k).abs() > 5)
		return;
	let p1 = intPoints(f1, {
		minX: -6,
		maxX: -b / k,
		minY: -6,
		maxY: 5,
	});
	if (p1.length < 2)
		return;
	let p2 = intPoints(f2, {
		minX: -b / k,
		maxX: 6,
		minY: -6,
		maxY: 5,
	});
	if (p2.length < 2)
		return;
	let formula = ('|kx+b|+c');

	let question, answ;
	switch (sl(1, 3)) {
	case 1:
		let x = sl(6, 10).pm();
		question = '$f(' + x + ')$';
		answ = f(x);
		break;
	case 2:
		let st = [
			['произведение', k * b * c],
			['сумму', k + b + c]
		].iz();
		answ = st[1];
		question = st[0] + ' всех коэффициентов';
		break;
	case 3:
		answ = sl(6, 20);
		question = 'точку, где $f(x)=' + f(answ) + '$';
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
			minX: -6.3,
			maxX: 7,
			minY: -7,
			maxY: 6,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, p1, 2, 0.15);
		graph9AmarkCircles(ct, p2, 2, 0.15);
	};

	NAtask.setTask({
		text: 'На рисунке изображён график функции вида $f(x)=' + formula +
			'$. где числа $b,c$ и $k$ — целые, $k>0$. Найдите ' + question + '.',
		answers: answ,
		analys: '$f(x)=|' + (k + 'x+' + b + '|+' + c).plusminus() + '$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//56382403
