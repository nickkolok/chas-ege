retryWhileUndefined(function() {
	function toStandatForSqrt(a) {
		do {
			a.int *= a.sq.polnKvadrMnozh();
			a.sq /= (a.sq).polnKvadrMnozh().pow(2);
		} while (!a.sq.polnKvadrMnozh == 1);
	};
	NAinfo.requireApiVersion(0, 2);
	let a = {
		sq: sl(1, 64),
		int: sl(1, 20),
	};
	let a1 = {
		sq: a.sq,
		int: a.int,
	};
	let inform = (sklonlxkand(['объём', 'диагональ', 'сторона', 'площадь поверхности', 'площадь основания'])).iz(2);
	let variableH = {
		sq: 0,
		int: 0
	};
	switch (inform[0].ie) {
	case 'объём':
		variableH.int = a.int.pow(3);
		variableH.sq = a.sq.pow(3);
		break;
	case 'диагональ':
		variableH.int = a.int;
		variableH.sq = a.sq * 3;
		break;
	case 'сторона':
		variableH.int = a.int;
		variableH.sq = a.sq;
		break;
	case 'площадь поверхности':
		variableH.int = 6 * a.int;
		variableH.sq = a.sq;
		break;
	case 'площадь основания':
		variableH.int = a.int.pow(2);
		variableH.sq = a.sq.pow(2);
		break;
	}
	let variableF = {
		sq: 0,
		int: 0
	};
	switch (inform[1].ie) {
	case 'объём':
		variableF.int = a.int.pow(3);
		variableF.sq = a.sq.pow(3);
		break;
	case 'диагональ':
		variableF.int = a.int;
		variableF.sq = a.sq * 3;
		break;
	case 'сторона':
		variableF.int = a.int;
		variableF.sq = a.sq;
		break;
	case 'площадь поверхности':
		variableF.int = 6 * a.int;
		variableF.sq = a.sq;
		break;
	case 'площадь основания':
		variableF.int = a.int.pow(2);
		variableF.sq = a.sq.pow(2);
		break;
	}
	toStandatForSqrt(a);
	toStandatForSqrt(variableH);
	toStandatForSqrt(variableF);
	let answ = [
		['целую часть', variableF.int]
	];
	if (variableF.sq != 1)
		answ.push(['подкоренную часть', variableF.sq]);
	answ = answ.iz();
	let paint1 = function(ct) {
		//график
		ct.scale(15, 15);
		ct.lineWidth = 0.1;
		ct.translate(1, -1);
		//диагональ
		ct.setLineDash([1, 0.5]);
		ct.drawLine(5, 5, 10, 20);
		ct.setLineDash([]);
		//вертикальные
		ct.drawLine(0, 10, 0, 20);
		ct.drawLine(10, 10, 10, 20);
		ct.drawLine(15, 5, 15, 15);
		ct.setLineDash([1, 0.5]);
		ct.drawLine(5, 5, 5, 15);
		//горизонтальные
		ct.setLineDash([]);
		ct.drawLine(5, 5, 15, 5);
		ct.drawLine(0, 10, 10, 10);
		ct.drawLine(0, 20, 10, 20);
		ct.setLineDash([1, 0.5]);
		ct.drawLine(5, 15, 15, 15);
		ct.setLineDash([]);
		//диагональные
		ct.drawLine(10, 20, 15, 15);

		ct.drawLine(0, 10, 5, 5);
		ct.drawLine(10, 10, 15, 5);
		ct.setLineDash([1, 0.5]);
		ct.drawLine(0, 20, 5, 15);
	};

	NAtask.setTask({
		text: inform[0].ie.toZagl() + ' куба ' + 'равна'.esli(inform[0].ie != 'объём') +
			'равен'.esli(inform[0].ie == 'объём') + ' $' + (variableH.int + ('\\sqrt{' + variableH.sq + '}').esli(variableH.sq !=
				1)).plusminus() + '$' + '.' +
			' Найдите его ' + (inform[1].ve).replace('основанию', 'основания') +
			'. Если ответ содержит неизвлекаемый корень, запишите его ' + answ[0] + '.',
		answers: answ[1],
		//analys: '$ a= '+a.int+'\\sqrt{'+a.sq+'}$<br>'+,
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//27055, 27056, 27098, 27099, 27139, 27141
