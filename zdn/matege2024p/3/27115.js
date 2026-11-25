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
			numberSide: pyr1.numberSide
		});

		pyr1.verticesOfFigure.push(coordinatesMiddleOfSegment3D(pyr1.verticesOfFigure[0], pyr1.verticesOfFigure[1]));
		pyr1.verticesOfFigure.push(coordinatesMiddleOfSegment3D(pyr1.verticesOfFigure[0], pyr1.verticesOfFigure[2]));

		let dash = [5, 4];

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

		point2DPyr = autoScale(pyr1.verticesOfFigure, camera, point2DPyr, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		let faces = [[0,1,2],[0,1,3],[1,2,3],[2,0,3]];
		let visibility = facesVisibility(pyr1.verticesOfFigure.slice(0, pyr1.numberSide + 1), point2DPyr, faces);
		let figureMatrix = dashHiddenEdges(pyr1.connectionMatrix, faces, visibility, dash);
		if (!figureMatrix[2]) figureMatrix[2] = [];
		figureMatrix[2][4] = 1;
		if (!figureMatrix[2]) figureMatrix[2] = [];
		figureMatrix[2][5] = dash;
		if (!figureMatrix[3]) figureMatrix[3] = [];
		figureMatrix[3][5] = dash;

		let paint1 = function(ctx) {
			ctx.translateToCenter();
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawFigure(point2DPyr, figureMatrix);
		};

		NAtask.setTask({
			text: 'Объём треугольной пирамиды равен $' + pyr1.volume.ts() + '$. ' +
				'Через вершину пирамиды и среднюю линию её основания проведена плоскость (см. рисунок). ' +
				'Найдите объём отсечённой треугольной пирамиды.',
			answers: pyr2.volume,
			author: ['Суматохина Александра'],
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
//27115 75065 75109 75113 514460 75067 75069 75071 75073 75075 75077 75079 75081 75083 75085 75087 75089 75091 75093 75095 75097 75099 75101 75103 75105 75107 75111
