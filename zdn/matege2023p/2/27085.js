(function() {
	retryWhileError(function() {
		let ratio = sl(2, 27);
		let baseSide = sl(1, 100);

		NAinfo.requireApiVersion(0, 2);
		let pyr1 = new RegularPyramid({
			height: (6).sqrt() * baseSide / 3,
			baseSide: baseSide,
			numberSide: 3
		});

		let pyr2 = new RegularPyramid({
			height: pyr1.height * ratio,
			baseSide: pyr1.baseSide * ratio,
			numberSide: 3
		});

		let name = [
			['ребро', pyr2.baseSide / pyr1.baseSide],
			['высота', pyr2.height / pyr1.height],
			[
				['площадь боковой поверхности', pyr2.sideSurfaceArea / pyr2.sideSurfaceArea],
				['площадь грани', pyr2.baseArea / pyr1.baseArea],
				['полная площадь поверхности', pyr2.surfaceArea / pyr1.surfaceArea]
			].iz(), ['объём', pyr2.volume / pyr1.volume]
		].iz(2);

		let strok = [5, 4];

		let matrixPyr = [
			[1],
			[strok, 1],
			[1, 1, 1],
		];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,

			rotationX: -Math.PI / 2 + Math.PI / 13,
			rotationY: 0,
			rotationZ: -2 * Math.PI / 6,
		};

		let point2DPyr = pyr1.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(pyr1.verticesOfFigure, camera, point2DPyr, {
			startX: -390 / 2,
			finishX: 390 / 2,
			startY: -390 / 2,
			finishY: 390 / 2,
			maxScale: 50,
		});

		point2DPyr = pyr1.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.drawFigure(point2DPyr, matrixPyr);

		};
		NAtask.setTask({
			text: 'Во сколько раз увеличится ' + sklonlxkand(name[0][0]).ie + ' правильного тетраэдра, ' +
				'если его ' + sklonlxkand(name[1][0]).ve + ' увеличить ' + ' в $' + chislitlx(name[1][1], '$ раз') + '?',

			answers: name[0][1],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 10000);

})();
