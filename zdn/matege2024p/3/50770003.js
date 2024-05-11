(function() {
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('полная', ' площадь поверхности');

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rand = 1;

		let sphere = new Sphere(sl(1, 100));
		let cyl = new Cylinder({
			radius: sphere.radius,
			height: 2 * sphere.radius
		});

		let nameCylinder = [
			/* ['радиус основания', cyl.radius],
			['площадь боковой поверхности', cyl.sideSurfaceArea], */
			['объём', cyl.volume],
			/* [
				['диаметр основания', 'высота'].iz(), cyl.height
			],
			['полная площадь поверхности', cyl.surfaceArea, ] */
		].iz();
		let nameSphere = [
			/* ['радиус', sphere.radius],
			['площадь поверхности', sphere.surfaceArea, ], */
			['объём', sphere.volume],
			/* ['диаметр', sphere.diameter] */
		].iz();

		let paint1 = function(ctx) {

			ctx.lineWidth = 2;
			ctx.translate(100, 40);
			ctx.scale = (100, 100);
			ctx.strokeStyle = om.secondaryBrandColors;

			//верхний эллипс

			ctx.drawEllipse(100, 10, 150, 30, 0, 0, Math.PI);
			ctx.drawEllipse(100, 10, 150, 30, 0, Math.PI, 2 * Math.PI);

			//нижний эллипс

			ctx.setLineDash([4, 5]);
			ctx.drawEllipse(100, 310, 150, 30, 0, Math.PI, 2 * Math.PI);
			ctx.setLineDash([0, 0]);
			ctx.drawEllipse(100, 310, 150, 30, 0, 0, Math.PI);

			//образующие
			ctx.drawLine(100 + 150, 10, 100 + 150, 310);
			ctx.drawLine(100 - 150, 10, 100 - 150, 310);

			ctx.translate(0, 80);
			ctx.setLineDash([4, 5]);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawArc(100, 80, 150, 0, 2 * Math.PI);
			ctx.drawEllipse(100, 80, 150, 30, 0, 0, 2 * Math.PI);

		};

		NAtask.setTask({
			text: [
				'Шар вписан в цилиндр. ' + nameSphere[0].toZagl() + ' шара ' + ['равен', 'равна'][sklonlxkand(
					nameSphere[0]).rod] + ' $' + nameSphere[1].texpi() +
				'$. Найдите ' + sklonlxkand(nameCylinder[0]).ve + ' цилиндра.',
				' Цилиндр, ' + nameCylinder[0] + ' которого ' + ['равен', 'равна'][sklonlxkand(nameCylinder[0]).rod] +
				' $' + nameCylinder[1].texpi() + '$, описан около шара. Найдите ' + sklonlxkand(nameSphere[0]).ve + ' шара.'
			][rand],
			answers: [nameCylinder[1], nameSphere[1]][rand],
		});
		NAtask.modifiers.multiplyAnswerByPI();
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//5077 73295 73323 73327 73289 73291 73293 73297 73299 73301 73303 73305 73307 73309 73311 73313 73315 73317 73319 73321 73325
