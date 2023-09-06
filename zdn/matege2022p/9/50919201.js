retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function fg(x) {
		return k2 / x + b2;
	}

	function fp(x) {
		return k1 * x + b1;
	}
	let x1 = sluchch(-10, 10);
	let y1 = sluchch(10, 20).pm();
	let x2 = slKrome(x1, -10, 10);
	let y2 = slKrome(y1, 10, 20).pm();

	let k1 = (y1 - y2) / (x1 - x2);
	if (!k1.isZ())
		return;
	let b1 = y1 - k1 * x1;

	let b2 = (y1 * x1 - y2 * x2) / (x1 - x2);
	if (!b2.isZ())
		return;
	let k2 = (y1 - b2) * x1;
	if (!k2 || k2 > 50)
		return;
	let pointsg = intPoints(fg, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (pointsg.length < 2)
		return;
	let pointsp = intPoints(fp, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (pointsp.length < 2)
		return;
	let find, answ;
	let maxX = [x1, x2].maxE();
	let maxY = [y1, y2].maxE();
	let minX = [x1, x2].minE();
	let minY = [y1, y2].minE();
	switch (3) {
	case 1:
		let str = [
			['большую', [maxX, maxY]],
			['меньшую', [minX, minY]]
		].iz();
		find = [
			['ординат', str[1].pop()],
			['абсцисс', str[1].shift()]
		].iz();
		answ = find.pop();
		find = str[0] + ' из ' + find;
		break;
	case 2:
		find = 'сумму всех координат';
		answ = x1 + x2 + y1 + y2;
		break;
	case 3:
		let str1 = [
			['большей', maxX],
			['меньшей', minX]
		].iz();
		let str2 = [
			['большей', maxY],
			['меньшей', minY]
		].iz();
		find = 'сумму ' + str1[0] + ' абсциссы и ' + str2[0] + ' ординаты';
		answ = str1[1] + str2[1];
		break;
	}
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
		//График
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, fg, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		graph9AdrawFunction(ct, fp, {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, pointsg, 2, 0.15);
		graph9AmarkCircles(ct, pointsp, 2, 0.15);
		graph9AmarkCircles(ct, [
			[x1, y1]
		], 2, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=k_1 x+b_1$ и $g(x)=\\frac{k_2}{x}+b_2$' +
			', которые пересекаются в точках $A$ и $B$. В ответ запишите ' + find + ' точек $A$ и $B$.',
		answers: answ,
		analys: '$f(x)=' + (k1 + 'x+' + b1).plusminus() + '$<br>' +
			'$g(x)=' + ('\\frac{' + k2 + '}{x}+' + b2 + '$').plusminus() + '<br>' +
			'$A(' + x1 + ';' + y1 + ')$<br>' +
			'$B(' + x2 + ';' + y2 + ')$',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//50919201
