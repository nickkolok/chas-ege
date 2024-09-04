(function() {
	retryWhileError(function() {
		lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
		NAinfo.requireApiVersion(0, 2);

		let prism = new IrregularTriangularPrism({
			height: sl(10, 20),
			sideA: sl(10, 20),
			sideB: sl(15, 20),
			sideC: sl(10, 20),
		});

		let rand1 = 0;
		let rand2 = 0;
		let question = [
			['площадь боковой поверхности', 0.5],
			['объём', 0.25]
		][rand1];
		let ratio = question.pop();
		question = sklonlxkand(question[0]);
		let number = [prism.sideSurfaceArea, prism.volume][rand1];

		prism.verticesOfFigure.push(coordinatesMiddleOfSegment3D(prism.verticesOfFigure[0], prism.verticesOfFigure[2]),
			coordinatesMiddleOfSegment3D(prism.verticesOfFigure[1], prism.verticesOfFigure[2]),
			coordinatesMiddleOfSegment3D(prism.verticesOfFigure[4], prism.verticesOfFigure[5]),
			coordinatesMiddleOfSegment3D(prism.verticesOfFigure[3], prism.verticesOfFigure[5]));

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 10,
			rotationY: 0,
			rotationZ: -Math.PI / 3,
		};

		let point2DPrism = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(prism.verticesOfFigure, camera, point2DPrism, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 100,
		});

		point2DPrism = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		
		genAssert((point2DPrism[1].x-point2DPrism[6].x).abs()>20, 'Сечение слилось с ребром');

		let strok = [5, 4];

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(w/2, h/2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPrism, [
				[strok],
				[1, strok],
				[1, 0, 0],
				[0, strok, 0, 1],
				[0, 0, 1, 1, 1],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
				[0, 0, 0, 0, 0, 0, strok, 0, strok],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
			]);
		};

		NAtask.setTask({
			text: 'Через среднюю линию основания треугольной призмы проведена плоскость, параллельная боковому ребру. ' +
				question.ie.toZagl() +
				' отсечённой'.esli(rand2) + ' призмы рав' + ['ен', 'на'][question.rod] + ' $' + number +
				'$. Найдите  ' + question.ve + ' ' + ['отсечённой', 'исходной'][rand2] + ' треугольной призмы.',
			answers: [number * ratio, number / ratio][rand2],
			analys: '',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27068 73157 509838 73111 73113 73115 73117 73119 73121 73123 73125 73127 73129 73131 73133 73135 73137 73139 73141 73143 73145 73147 73149 73151 73153 73155
