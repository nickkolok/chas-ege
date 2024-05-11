(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('площадь', ' боковой поверхности');

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let rand = sl1();

		let sphere = new Sphere(sl(1, 100) * [1, (2).sqrt(), ][rand]);
		let cone = new Cone({
			radius: sphere.radius,
			height: sphere.radius
		});

		let nameCone = [
			['радиус основания', cone.radius],
			['площадь боковой поверхности', cone.sideSurfaceArea],
			['объём', cone.volume],
			['образующая', cone.generatrix],
			['площадь основания', cone.baseArea]
		].iz();
		let nameSphere = [
			['площадь поверхности', sphere.surfaceArea],
			['объём', sphere.volume],
		].iz();

		let paint1 = function(ctx) {

			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.translate(100, 40);
			ctx.scale = (100, 100);

			ctx.translate(0, 80);
			ctx.drawArc(100, 80, 180, 0, 2 * Math.PI);

			ctx.setLineDash([4, 5]);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawEllipse(100, 80, 180, 30, 0, Math.PI, 2 * Math.PI);

			ctx.setLineDash([0, 0]);
			ctx.drawEllipse(100, 80, 180, 30, 0, 0, Math.PI);

			//пирамида
			ctx.setLineDash([4, 5]);
			ctx.drawEllipse(100, 80, 180, 30, 0, Math.PI, 2 * Math.PI);
			ctx.drawLine(100 - 180, 80, 100, 80 - 180);
			ctx.drawLine(100 + 180, 80, 100, 80 - 180);

		};
		NAtask.setTask({
			text: ['Около конуса описана сфера (сфера содержит окружность основания конуса и его вершину)',
				'Конус вписан в шар (см. рисунок)'
			].iz() + '. ' + ['Центр сферы совпадает с центром основания конуса',
				' Радиус основания конуса равен радиусу шара'
			].iz() + '. ' + [
				nameCone[0].toZagl() + ' конуса ' + ['равен', 'равна'][sklonlxkand(nameCone[0]).rod] + ' $' +
				nameCone[1].texpi() + '$. Найдите ' + sklonlxkand(nameSphere[0]).ve + ' шара',
				nameSphere[0].toZagl() + ' шара ' + ['равен', 'равна'][sklonlxkand(nameSphere[0]).rod] + ' $' +
				nameSphere[1].texpi() + '$. Найдите ' + sklonlxkand(nameCone[0]).ve.replace('образующаю', 'образующую') +
				' конуса'
			][rand] + '.',
			answers: [nameSphere[1], nameCone[1]][rand],
		});
		
		NAtask.modifiers.multiplyAnswerByPI();
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 10000);

})();
//245351 269439 509561 509603 269441 269443 269445 269447 269449 269451 269453 269455 269457 269459 269461 269463 269465 269467 269469 269471 269473 269475 269477 269479 269481 269483 269485 269487 269489
