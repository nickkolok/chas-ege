(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('площадь', ' боковой поверхности');

	lx['радиус основания'] = {
		rod: 0,
	};

	lx['площадь боковой поверхности'] = {
		ve: 'площадь боковой поверхности',
		rod: 1,
	};

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let radius = sl(2, 10);

		let nameCone = [
			['радиус основания', radius.pow(2), '', ''],
			['площадь боковой поверхности', 2 * (radius.pow(2)).pow(2), ', делённую на $\\pi$', '\\pi'],
			['объём', (radius.pow(3) / 3).pow(2), ', делённый на $\\pi$', '\\pi'],
			['образующая', 2 * (radius).pow(2), '', '']
			['площадь основания', radius.pow(2).pow(2), ', делённую на $\\pi$', '\\pi']
		].iz();
		let nameSphere = [
			['площадь поверхности', (4 * radius.pow(2)).pow(2), ', делённую на $\\pi$', '\\pi'],
			['объём', (4 * (radius).pow(3) / 3).pow(2), ', делённый на $\\pi$', '\\pi'],
		].iz();

		genAssert((nameSphere[1] * 100).isZ(), 'кривой ответ');
		genAssert((nameCone[1] * 100).isZ(), 'кривой ответ');

		console.log(nameSphere);
		let question = [
			[nameCone[0].toZagl() + ' конуса ' + ['равен', 'равна'][sklonlxkand(nameCone[0]).rod] + ' $' +
				nameCone[1].texsqrt(1) + nameCone[3] + '$. Найдите ' + sklonlxkand(nameSphere[0]).ve + ' шара' + nameSphere[2] +
				'.', nameSphere[1]
			],
			[nameSphere[0].toZagl() + ' шара ' + ['равен', 'равна'][sklonlxkand(nameSphere[0]).rod] + ' $' +
				nameSphere[1].texsqrt(1) + nameSphere[3] + '$. Найдите ' + sklonlxkand(nameCone[0]).ve + ' конуса' + nameCone[2] +
				'.', nameCone[1]
			]
		][0];
		let paint1 = function(ct) {

			ct.lineWidth = 2;
			ct.strokeStyle = "#809DF2";
			ct.translate(100, 40);
			ct.scale = (100, 100);

			ct.translate(0, 80);
			ct.beginPath();
			ct.arc(100, 80, 180, 0, 2 * Math.PI);
			ct.stroke();

			ct.beginPath();
			ct.setLineDash([4, 5]);
			ct.strokeStyle =["#D777F2","#F2A2D6"].iz();
			ct.ellipse(100, 80, 180, 30, 0, Math.PI, 2 * Math.PI);
			ct.stroke();

			ct.beginPath();
			ct.setLineDash([0, 0]);
			ct.ellipse(100, 80, 180, 30, 0, 0, Math.PI);
			ct.stroke();

			//пирамида
			ct.beginPath();
			ct.setLineDash([4, 5]);
			ct.ellipse(100, 80, 180, 30, 0, Math.PI, 2 * Math.PI);
			ct.drawLine(100 - 180, 80, 100, 80 - 180);
			ct.drawLine(100 + 180, 80, 100, 80 - 180);

		};
		NAtask.setTask({
			text: ['Около конуса описана сфера (сфера содержит окружность основания конуса и его вершину)',
				'Конус вписан в шар (см. рисунок)'
			].iz() + '. ' + ['Центр сферы совпадает с центром основания конуса',
				' Радиус основания конуса равен радиусу шара'
			].iz() + '. ' + question[0],
			answers: question[1].sqrt(),
		});
		NAtask.modifiers.multiplyAnswerBySqrt(3);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//245351 269439 509561 509603 269441 269443 269445 269447 269449 269451 269453 269455 269457 269459 269461 269463 269465 269467 269469 269471 269473 269475 269477 269479 269481 269483 269485 269487 269489
