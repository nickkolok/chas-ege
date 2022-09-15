(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	function toStandatForSqrt(a) {
		do {
			a.int *= a.sq.polnKvadrMnozh();
			a.sq /= (a.sq).polnKvadrMnozh().pow(2);
		} while (!a.sq.polnKvadrMnozh == 1);
	}
	let a = {
		sq: sl(1, 50),
		int: sl(1, 100)
	};

	let informAboutCircle = ['радиусом', 'диаметром', 'объёмом', 'площадью поверхности'].iz();
	let informAboutCube = ['объём', 'диагональ', 'площадь поверхности', 'площадь основания'];
	if (informAboutCircle != 'диаметром' || informAboutCircle != 'радиусом')
		informAboutCube.push('сторона');
	informAboutCube = sklonlxkand(informAboutCube.iz());
	let variableH = {
		sq: 1,
		int: 1
	};
	switch (informAboutCircle) {
	case 'радиусом':
		variableH.int = a.int / 2;
		variableH.sq = a.sq;
		break;
	case 'диаметром':
		variableH.int = a.int;
		variableH.sq = a.sq;
		break;
	case 'объёмом':
		variableH.int = (a.int.pow(3)) / 6;
		variableH.sq = a.sq.pow(3);
		break;
	case 'площадью поверхности':
		variableH.int = a.int.pow(2);
		variableH.sq = a.sq.pow(2);
		break;
	}
	let variableF = {
		sq: 0,
		int: 0
	};
	switch (informAboutCube.ie) {
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
	if (!(1000 * variableH.int).isZ())
		return;
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
		ct.scale(20, 20);
		ct.lineWidth = 0.1;
		ct.translate(1, -1);
		//шар
		ct.strokeStyle = ' #0077b3';
		for (let i = 0; i < 2 * Math.PI; i += 2 * Math.PI / 50) {
			ct.beginPath();
			ct.arc(7, 7, 4.5, i, i + Math.PI / 50, false);
			ct.stroke();
		}
		for (let i = 0; i < 2 * Math.PI; i += 2 * Math.PI / 50) {
			ct.beginPath();
			ct.ellipse(7, 7, 4.5, 1, 0, i, i + Math.PI / 50);
			ct.stroke();
		}
		ct.strokeStyle = 'black';
		//вертикальные
		ct.drawLine(0, 2, 0, 10);
		ct.drawLine(3, 4, 3, 12);
		ct.drawLine(13, 4, 13, 12);
		ct.setLineDash([1, 0.5]);
		ct.drawLine(10, 2, 10, 10);
		ct.setLineDash([]);
		//горизонтальные
		ct.drawLine(0, 2, 10, 2);
		ct.drawLine(3, 4, 13, 4);
		ct.drawLine(3, 8, 13, 8);
		ct.drawLine(3, 12, 13, 12);
		ct.setLineDash([1, 0.5]);
		ct.drawLine(0, 10, 10, 10);
		ct.drawLine(0, 6, 10, 6);
		ct.setLineDash([]);
		//диагональные
		ct.drawLine(0, 10, 3, 12);
		ct.drawLine(0, 6, 3, 8);
		ct.drawLine(0, 2, 3, 4);
		ct.drawLine(10, 2, 13, 4);
		ct.drawLine(10, 6, 13, 8);
		ct.setLineDash([1, 0.5]);
		ct.drawLine(10, 10, 13, 12);
	};
	
	NAtask.setTask({
		text: ' Прямоугольный параллелепипед описан около сферы с ' + 
		informAboutCircle +
			' $' + variableH.int.ts() + 
			('\\sqrt{' + variableH.sq + '}').esli(variableH.sq != 1) +
			('\\pi').esli(informAboutCircle == 'объёмом' || 
			informAboutCircle == 'площадью поверхности') +
			 '$.' +
			' Найдите его ' + (informAboutCube.ve).replace('основанию', 
			'основания') +
			'. Если ответ содержит неизвлекаемый корень, запишите его ' 
			+ answ[0] + '.',
		answers: answ[1],
		analys: '$ a= ' + a.int + '\\sqrt{' + a.sq + '} $ <br>' +
			'$ answ= ' + variableF.int + '\\sqrt{' + variableF.sq + 
			'} $ <br>',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
})();
// 27067 5065
