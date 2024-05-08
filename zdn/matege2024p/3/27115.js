(function() {
	retryWhileError(function() {
		
		let pyr1 = new RegularPyramid({
			height: sl(10, 30)*(3).sqrt(),
			baseSide: sl(20, 50),
			numberSide: 3
		});

		let pyr2 = new RegularPyramid({
			height: pyr1.height,
			baseSide: 0.5 * pyr1.baseSide,
			numberSide: 3
		});

		pyr1.verticesOfFigure = coordinatesMiddleOfSegment3D(pyr1.verticesOfFigure[0], pyr1.verticesOfFigure[1]);
		pyr1.verticesOfFigure = coordinatesMiddleOfSegment3D(pyr1.verticesOfFigure[0], pyr1.verticesOfFigure[2]);

		let strok = [5, 4];

		pyr1.connectionMatrix = [
			[1],
			[strok, strok],
			[1, 1, strok, 0, 1, strok],
			[0, 0, 0, 0, 0, strok]
		];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: sl(1,2)* Math.PI / 8,
		};

		let point2DPyr = pyr1.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(pyr1, camera, point2DPyr, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPyr = pyr1.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPyr, pyr1.connectionMatrix);
		};

		NAtask.setTask({
			text: ' Объём треугольной пирамиды равен $' + pyr1.volume.pow(2).texsqrt(1) + '$. ' +
				'Через вершину пирамиды и среднюю линию её основания проведена плоскость (см. рисунок). ' +
				'Найдите объём отсечённой треугольной пирамиды.',
			answers: pyr2.volume,
			author: ['Суматохина Александра'],
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
//27115 75065 75109 75113 514460 75067 75069 75071 75073 75075 75077 75079 75081 75083 75085 75087 75089 75091 75093 75095 75097 75099 75101 75103 75105 75107 75111
