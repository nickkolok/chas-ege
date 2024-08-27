(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		lx_declareClarifiedPhrase('сторона', 'основания');

		let r1 = sl(1.1, 2, 0.01);
		let r2 = sl(1.1, 2, 0.01);

		let pyr1 = new RegularPyramid({
			height: sl(45, 50),
			baseSide: sl(10, 50),
			numberSide: 4
		});
		let pyr2 = new RegularPyramid({
			height: pyr1.height * r1,
			baseSide: pyr1.baseSide * r2,
			numberSide: 4
		});

		let data = [
			[
				['объём', pyr1.volume, pyr2.volume, pyr2.volume / pyr1.volume],
				['площадь боковой поверхности', pyr1.sideSurfaceArea, pyr2.sideSurfaceArea, pyr2.sideSurfaceArea / pyr1.sideSurfaceArea]
			].iz(), ['сторона основания', pyr1.baseSide, pyr2.baseSide, pyr2.baseSide / pyr1.baseSide],
			['высота', pyr1.height, pyr2.height, pyr2.height / pyr1.height]
		].shuffle();

		let name = (data.T()[0]);
		let value = data.T()[1][0];
		let answer = data.T()[2][1];
		let ratio = data.T()[3];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,

			rotationX: -Math.PI / 2 + Math.PI / 13,
			rotationY: 0,
			rotationZ: -2 * Math.PI / 3,
		};

		let strok = [5, 4];

		let matrixPyr = [
			[strok],
			[0, 1],
			[strok, 0, 1],
			[strok, 1, 1, 1],
		];

		let point2DPyr2 = pyr2.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(pyr2.verticesOfFigure, camera, point2DPyr2, {
			startX: -450 / 4,
			finishX: 450 / 4,
			startY: -400 / 2,
			finishY: 400 / 2,
			maxScale: 100,
			step: 0.1,
		});

		point2DPyr2 = pyr2.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let point2DPyr1 = pyr1.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let x = point2DPyr1.map((elem) => elem.x).maxE();
		let y = point2DPyr1.map((elem) => elem.y).minE();


		genAssert(verticesInGivenRange(point2DPyr2, {
			startX: -500 / 4,
			finishX: 500 / 4,
			startY: -400 / 2,
			finishY: 400 / 3,
		}), 'Не влезло');

		let paint1 = function(ctx) {
			let h = 400;
			let w = 500;

			ctx.translate(w / 4, h / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.strokeStyle = om.secondaryBrandColors;


			console.log(point2DPyr1);

			ctx.drawFigure(point2DPyr1, matrixPyr);
			ctx.translate(w / 4 + x, -(y - point2DPyr2[4].y));
			ctx.drawFigure(point2DPyr2, matrixPyr);

		};
		NAtask.setTask({
			text: 'Даны две правильные четырёхугольные пирамиды. ' + name[0].toZagl() + ' первой пирамиды составляет $' +
				value.pow(2).texsqrt(1) + '$. ' +
				'У второй пирамиды ' + name[1] + ' в $' + chislitlx(ratio[1], '$ раз') + ' больше, а ' +
				name[2] + ' в $' +
				chislitlx(ratio[2], '$ раз') + ' больше, чем у первой. ' +
				'Найдите ' + sklonlxkand(name[0]).ve +
				' второй пирамиды.',
			answers: answer,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
