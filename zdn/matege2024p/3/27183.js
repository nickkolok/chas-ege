(function() {
	retryWhileError(function() {
		const preference = ["findCubeVolume","findPrismVolume"];
		let v = getSelectedPreferenceFromList('27183', preference);

		let cube = new Cube(sl(2, 50));

		let prism = new RectangularPrismWithRightAngledTriangleAtBase({
			height: cube.baseSide,
			sideA: 0.5 * cube.baseSide,
			sideB: 0.5 * cube.baseSide
		});

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: Math.PI / 3,
		};

		cube.verticesOfFigure.push(coordinatesMiddleOfSegment3D(cube.verticesOfFigure[1], cube.verticesOfFigure[2]),
			coordinatesMiddleOfSegment3D(cube.verticesOfFigure[2], cube.verticesOfFigure[3]),
			coordinatesMiddleOfSegment3D(cube.verticesOfFigure[4], cube.verticesOfFigure[7]),
			coordinatesMiddleOfSegment3D(cube.verticesOfFigure[6], cube.verticesOfFigure[7]));

		let point2DPar = cube.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		point2DPar = autoScale(cube.verticesOfFigure, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 100,
		});

		let dash = [5, 4];

		
		let faces = [[0,1,2,3],[5,6,7,4],[0,1,6,5],[1,2,7,6],[2,3,4,7],[3,0,5,4]];
		let visibility = facesVisibility(cube.verticesOfFigure.slice(0, 8), point2DPar, faces);
		let figureMatrix = dashHiddenEdges(cube.connectionMatrix, faces, visibility, dash);
		if (!figureMatrix[7]) figureMatrix[7] = [];
		figureMatrix[7][9] = dash;
		figureMatrix[7][11] = 1;
		if (!figureMatrix[9]) figureMatrix[9] = [];
		figureMatrix[9][9] = dash;
		figureMatrix[9][11] = 1;

		let paint1 = function(ctx) {
			ctx.translateToCenter();
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawFigure(point2DPar, figureMatrix);
		};

		NAinfo.requireApiVersion(0, 2);
		let cutByPlane = 'плоскостью, проходящей через середины двух рёбер, ' +
			'выходящих из одной вершины, и параллельной третьему ребру, ' +
			'выходящему из этой же вершины';

		NAtask.setTask({
			preference: [preference],
			text: ['Объём треугольной призмы, отсекаемой от куба ' + cutByPlane +
				', равен $' + prism.volume + '$', 'Объём куба равен $' + cube.volume + '$'
			][v] + '. Найдите ',
			questions: [{
				text: 'объём',
				answers: [cube.volume, prism.volume][v]
			}],
			postquestion: [' куба', ' треугольной призмы, отсекаемой от него ' + cutByPlane][v] + '.',
			analys: 'Сторона куба: $' + cube.baseSide + '$' + '<br>' +
				'Объём куба: $' + cube.volume + '$' + '<br>' +
				'Объём призмы: $' + prism.volume + '$' + '<br>',
			author: ['Суматохина Александра']
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 100000);
})();
/*
Решу ЕГЭ
 27183 76851 523395 562752 76853 76855 76857 76859 76861 76863 76865 76867 76869 76871 76873 76875 76877 76879 76881 76883 76885 76887 76889 76891 76893 76895 76897 76899 325075 325077 325079 325081 325083 325085 325087 325089 325091 325093 325095 325097 325099 325101 325103 325105 325107 325109 325111 325113 325115 325117 325119 325121 325123
 324459 559402 559596
 */
