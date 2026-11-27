(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let rand = sl1();

		let sphere = new Sphere(sl(3, 99, 3));
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

		const known = [nameCone, nameSphere][rand];
		const asked = [nameSphere, nameCone][rand];
		const containsPi = measurement => measurement[0].includes('площадь') || measurement[0] === 'объём';
		const coefficient = known[1] / (containsPi(known) ? Math.PI : 1);
		const givenTex = coefficient.pow(2).round().texsqrt(1) + (containsPi(known) ? '\\pi' : '');
		const answer = asked[1] / (containsPi(asked) ? Math.PI : 1);
		const ps = containsPi(asked) ? ' Ответ разделите на $\\pi$.' : '';

		let paint1 = function(ctx) {
			ctx.translateToCenter();
			ctx.lineWidth = 2;
			const drawRadius = 180;
			const equatorRadius = 30;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawCircle(0, 0, drawRadius);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.setLineDash([4, 5]);
			ctx.drawEllipse(0, 0, drawRadius, equatorRadius, 0, Math.PI, 2 * Math.PI);
			ctx.setLineDash([]);
			ctx.drawEllipse(0, 0, drawRadius, equatorRadius, 0, 0, Math.PI);
			ctx.drawLine(-drawRadius, 0, 0, -drawRadius);
			ctx.drawLine(drawRadius, 0, 0, -drawRadius);
		};
		NAtask.setTask({
			text: ['Около конуса описана сфера (сфера содержит окружность основания конуса и его вершину)',
				'Конус вписан в шар (см. рисунок)'
			].iz() + '. ' + ['Центр сферы совпадает с центром основания конуса',
				'Радиус основания конуса равен радиусу шара'
			].iz() + '. ' + [
				nameCone[0].toZagl() + ' конуса ' + ['равен', 'равна'][sklonlxkand(nameCone[0]).rod] + ' $' +
				givenTex + '$. Найдите ' + sklonlxkand(nameSphere[0]).ve + ' шара',
				nameSphere[0].toZagl() + ' шара ' + ['равен', 'равна'][sklonlxkand(nameSphere[0]).rod] + ' $' +
				givenTex + '$. Найдите ' + sklonlxkand(nameCone[0]).ve.replace('образующаю', 'образующую') +
				' конуса'
			][rand] + '.' + ps,
			answers: answer,
		});

		NAtask.modifiers.multiplyAnswerBySqrt(2);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 10000);

})();
//245351 269439 509561 509603 269441 269443 269445 269447 269449 269451 269453 269455 269457 269459 269461 269463 269465 269467 269469 269471 269473 269475 269477 269479 269481 269483 269485 269487 269489

