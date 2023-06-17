(function() {
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('полная', ' площадь поверхности');
	lx['полная площадь поверхности'] = {
		ve: 'полную площадь поверхности',
		rod: 1,
	};

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let radius = sl(2, 10);

		let nameCylinder = [
			['радиус основания', radius],
			['площадь боковой поверхности', 4 * radius.pow(2), ', делённую на $\\pi$', '\\pi'],
			['объём', 2 * radius.pow(3), ', делённый на $\\pi$', '\\pi'],
			[
				['диаметр основания', 'высота'].iz(), 2 * radius
			],
			['полная площадь поверхности', 6 * radius.pow(2), ', делённую на $\\pi$', '\\pi']
		].iz();
		let nameSphere = [
			['радиус', radius],
			['площадь поверхности', 4 * radius.pow(2), ', делённую на $\\pi$', '\\pi'],
			['объём', 4 * (radius).pow(3) / 3, ', делённый на $\\pi$', '\\pi'],
			['диаметр', 2 * radius]
		].iz();

		genAssert((nameSphere[1] * 100).isZ(), 'кривой ответ');

		let paint1 = function(ct) {

			ct.lineWidth = 2;
			ct.translate(100, 40);
			ct.scale = (100, 100);
			ct.fillStyle = "black";
			let radius = 400;

			//верхний эллипс
			ct.beginPath();
			ct.ellipse(100, 10, 150, 30, 0, 0, Math.PI);
			ct.stroke();
			ct.ellipse(100, 10, 150, 30, 0, Math.PI, 2 * Math.PI);
			ct.stroke();

			//нижний эллипс
			ct.beginPath();
			ct.setLineDash([4, 5]);
			ct.ellipse(100, 310, 150, 30, 0, Math.PI, 2 * Math.PI);
			ct.stroke();
			ct.setLineDash([0, 0]);
			ct.ellipse(100, 310, 150, 30, 0, 0, Math.PI);
			ct.stroke();

			//образующие
			ct.drawLine(100 + 150, 10, 100 + 150, 310);
			ct.drawLine(100 - 150, 10, 100 - 150, 310);

			ct.translate(0, 80);
			ct.beginPath();
			ct.setLineDash([4, 5]);
			ct.arc(100, 80, 150, 0, 2 * Math.PI);
			ct.ellipse(100, 80, 150, 30, 0, 0, 2 * Math.PI);
			ct.stroke();
		};
		let question = [
			['Шар вписан в цилиндр. ' + nameSphere[0].toZagl() + ' шара ' + ['равен', 'равна'][sklonlxkand(
					nameSphere[0]).rod] + ' $' + nameSphere[1] + (nameSphere[3] || '') +
				'$. Найдите ' + sklonlxkand(nameCylinder[0]).ve + ' цилиндра' + (nameCylinder[2] || '') + '.',
				nameCylinder[1]
			],
			[' Цилиндр, ' + nameCylinder[0] + ' которого ' + ['равен', 'равна'][sklonlxkand(nameCylinder[0]).rod] +
				' $' + nameCylinder[1] + (nameCylinder[3] || '') + '$, описан около шара. Найдите ' + sklonlxkand(nameSphere[0])
				.ve + ' шара' + (nameSphere[2] ||
					'') + '.', nameSphere[1]
			]
		].iz();

		NAtask.setTask({
			text: question[0],
			answers: question[1],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//5077 73295 73323 73327 73289 73291 73293 73297 73299 73301 73303 73305 73307 73309 73311 73313 73315 73317 73319 73321 73325
