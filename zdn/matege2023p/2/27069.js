(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let pyr = new RegularPyramid({
			height: sl(30, 50),
			baseSide: sl(20, 50),
			numberSide: sl(3, 10)
		});

		let question = [
			['площадь основания', pyr.baseArea],
			['площадь боковой поверхности', pyr.sideSurfaceArea],
			['апофема', pyr.apothem],
			['высота', pyr.height],
			['сторона основания', pyr.baseSide],
		].iz(3);

		let name = question.T()[0];
		let number = question.T()[1];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,

			rotationX: -Math.PI / 2 + Math.PI / 13,
			rotationY: 0,
			rotationZ: -2 * Math.PI / (pyr.numberSide - 2),
		};

		let point2DPyr = pyr.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(pyr.verticesOfFigure, camera, point2DPyr, {
			startX: -390 / 2,
			finishX: 390 / 2,
			startY: -390 / 2,
			finishY: 390 / 2,
			maxScale: 50,
		});

		point2DPyr = pyr.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.drawFigure(point2DPyr, pyr.connectionMatrix);

		};

		NAtask.setTask({
			text: 'В правильной ' + ['тре', 'четырёх', 'пяти', 'шести', 'семи', 'восьми', 'девяти', 'десяти'][pyr.numberSide - 3] +
				'угольной пирамиде ' + name[0] + [' составляет ', ' равна '].iz() + '$' + number[0] + '$; ' + name[1] + 
				[' составляет ', ' равна '].iz() + '$' + number[1] +
				'$. Чему равна ' + name[2] + ' пирамиды?',
			answers: number[2],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 10000);
})();
