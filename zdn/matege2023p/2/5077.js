(function() {

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rand = sl1();

		let sphere = new Sphere(3 * sl(1, 33));
		let cyl = new Cylinder({
			radius: sphere.radius,
			height: 2 * sphere.radius
		});

		let nameCylinder = [
			['радиус основания', cyl.radius],
			['площадь боковой поверхности', cyl.sideSurfaceArea],
			['объём', cyl.volume],
			[
				['диаметр основания', 'высота'].iz(), cyl.height
			],
			['полная площадь поверхности', cyl.surfaceArea]
		].iz();
		let nameSphere = [
			['радиус', sphere.radius],
			['площадь поверхности', sphere.surfaceArea],
			['объём', sphere.volume],
			['диаметр', sphere.diameter]
		].iz();

		const known = [nameSphere, nameCylinder][rand];
		const asked = [nameCylinder, nameSphere][rand];
		const containsPi = measurement => measurement[0].includes('площадь') || measurement[0] === 'объём';
		const coefficient = known[1] / (containsPi(known) ? Math.PI : 1);
		const givenTex = coefficient.pow(2).round().texsqrt(1) + (containsPi(known) ? '\\pi' : '');
		const answer = asked[1] / (containsPi(asked) ? Math.PI : 1);
		const ps = containsPi(asked) ? ' Ответ разделите на $\\pi$.' : '';

		let paint1 = function(ctx) {

			ctx.lineWidth = 2;
			ctx.translate(100, 40);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			//верхний эллипс

			ctx.drawEllipse(100, 10, 150, 30);

			//нижний эллипс

			ctx.setLineDash([4, 5]);
			ctx.drawEllipse(100, 310, 150, 30, 0, Math.PI, 2 * Math.PI);
			ctx.setLineDash([]);
			ctx.drawEllipse(100, 310, 150, 30, 0, 0, Math.PI);

			//образующие
			ctx.drawLine(100 + 150, 10, 100 + 150, 310);
			ctx.drawLine(100 - 150, 10, 100 - 150, 310);

			ctx.translate(0, 80);
			ctx.setLineDash([4, 5]);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawCircle(100, 80, 150);
			ctx.drawEllipse(100, 80, 150, 30, 0, 0, 2 * Math.PI);

		};

		NAtask.setTask({
			text: [
				'Шар вписан в цилиндр. ' + nameSphere[0].toZagl() + ' шара ' + ['равен', 'равна'][sklonlxkand(
					nameSphere[0]).rod] + ' $' + givenTex +
				'$. Найдите ' + sklonlxkand(nameCylinder[0]).ve + ' цилиндра.',
				'Цилиндр, ' + nameCylinder[0] + ' которого ' + ['равен', 'равна'][sklonlxkand(nameCylinder[0]).rod] +
				' $' + givenTex + '$, описан около шара. Найдите ' + sklonlxkand(nameSphere[0]).ve + ' шара.'
			][rand] + ps,
			answers: answer,
		});
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);

})();
//5077 73295 73323 73327 73289 73291 73293 73297 73299 73301 73303 73305 73307 73309 73311 73313 73315 73317 73319 73321 73325
