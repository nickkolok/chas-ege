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

		lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
		lx_declareClarifiedPhrase('площадь', 'грани');
		lx_declareClarifiedPhrase('полная площадь', 'поверхности');
		let measurements = [
			{ name: 'ребро', power: 1 },
			{ name: 'высота', power: 1 },
			{ name: 'площадь боковой поверхности', power: 2 },
			{ name: 'площадь грани', power: 2 },
			{ name: 'полная площадь поверхности', power: 2 },
			{ name: 'объём', power: 3 },
		].iz(2);
		measurements[1].primary = true;

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

		point2DPyr = autoScale(pyr1.verticesOfFigure, camera, point2DPyr, {
			startX: -360 / 2,
			finishX: 360 / 2,
			startY: -360 / 2,
			finishY: 360 / 2,
			maxScale: 50,
			step: 0.1,
		});

		// Грани тетраэдра: основание и три боковые; невидимые рёбра считает dashHiddenEdges()
		let faces = [[0, 1, 2], [0, 1, 3], [1, 2, 3], [2, 0, 3]];
		let matrixPyr = dashHiddenEdges(pyr1.connectionMatrix, faces,
			facesVisibility(pyr1.verticesOfFigure, point2DPyr, faces), [5, 4]);

		let paint1 = function(ctx) {

			ctx.translateToCenter();
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.drawFigure(point2DPyr, matrixPyr);

		};
		NAtask.setDilationTask({
			measurements: measurements,
			figureName: 'правильный тетраэдр',
			dilationCoefficient: ratio,
			choosePhrase: 2,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 10000);

})();


