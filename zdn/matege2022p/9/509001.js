retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);
	let b = sluchch(0, 3).pm();
	let k = sluchch(1, 10).pm();
	let a = slKrome([k * b], 0, 4);
	let chisl = sluchch(5, 30, 0.5).pm();

	if (!(1000 * (k * chisl + a) / (chisl + b)).isZ()) {
		// Ответ очень нецелый!
		return;
	}

	if (((k * chisl + a) / (chisl + b)).abs() < 7 && chisl.abs() < 7) {
		// Обсуждаемая точка лежит в пределах видимости и, возможно, даже целая
		return;
	}


	let X = [], Y = [];
	for (let i = -6; i < 7; i++)
		if (((k * i + a) / (i + b)).isZ() && Math.abs((k * i + a) / (i + b)) < 6) {
			X.push(20 * (i + b) - 20 * b);
			Y.push(-20 * (k * i + a) / (i + b));
		}
	if (X.length < 2) {
		// Недостаточно опорных точек
		return;
	}

	let find, answ;

	if (sl1()) {
		find = `$f(${chisl.ts(1)})$`;
		answ = (k * chisl + a) / (chisl + b);
	} else {
		answ = chisl;
		find = `значение $x$, при котором $f(x)=${((k*chisl+a)/(chisl+b)).ts(1)}$`;
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
		//график
		for (let i = -180; i < 180; i++)
			if (-20 * (k * i + a * 20) / (i + b * 20) < 180)
				if (-20 * (k * i + a * 20) / (i + b * 20) > -150)
					ct.drawLine(i - 1, -20 * (k * (i - 1) + a * 20) / (i - 1 + b * 20), i, -20 * (k * i + a * 20) / (i + b * 20));
		//асимптота
		ct.setLineDash([5, 10]);
		ct.drawLine(-b * 20, -130, -b * 20, 150);
		if (k < 6 && k >= -6)
			ct.drawLine(-130, -k * 20, 130, -k * 20);
		//точки
		graph9AmarkCircles(ct, [X, Y].T(), 3);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=\\frac{kx${['+','-'].iz()}a}{x${['+','-'].iz()}b}$. Найдите ${find}.`,
		answers: answ,
		analys: `$f(x)=\\frac {` + (k + `x+` + a).replace('+0', '').plusminus() + `}{` + (`x+` + b).replace('+0', '').plusminus() +`}$`,
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});

	// Внимание! Тут надо что-нибудь вернуть.
	// Иначе функция retryWhileUndefined не уразумеет, что у нас получилось составить задание.
	// Из природного оптимизма вернём true
	return true;
}, 1000000);
//509001 508983
