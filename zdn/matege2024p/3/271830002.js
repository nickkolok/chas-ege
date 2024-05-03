(function() {
	retryWhileError(function() {

		let baseSide = sl(2, 50);

		let v = 1;

		let cube = new Cube(baseSide);

		let prism = new IrregularTriangularPrism({
			height: baseSide,
			sideA: 0.5 * baseSide,
			sideB: 0.5 * baseSide,
			sideC: 0.5 * cube.DWDiagonal
		});

		let strok = [5, 4];

		let matrixCube = [
			[strok],
			[0, 1],
			[strok, 0, 1],
			[0, 0, 0, 1],
			[strok, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 1],
			[0, 0, 1, 0, 1, 0, 1],
		];

		let matrixPrism = [
			[0],
			[0, strok],
			[0],
			[0, 1, 0, 0],
			[0, 0, strok, 0, 1]
		];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: 2 * Math.PI / 3,
		};

		let point2DPar = cube.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		genAssert((point2DPar[0].x - point2DPar[2].x).abs() > 20, 'Сечение не видно')

		autoScale(cube, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 100,
		});

		point2DPar = cube.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		point2DPrism = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(200, 200);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPar, matrixCube);
			ctx.translate(79, -4);
			ctx.drawFigure(point2DPrism, matrixPrism);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: ['Объём треугольной призмы, отсекаемой от куба ' +
				'плоскостью, проходящей через середины двух рёбер, ' +
				'выходящих из одной вершины, и параллельной третьему ребру, ' +
				'выходящему из этой же вершины, равен $' + prism.volume + '$', 'Объём куба равен $' + cube.volume + '$'
			][v] + '. Найдите ',
			questions: [{
				text: 'объём',
				answers: [cube.volume, prism.volume][v]
			}],
			postquestion: [' куба', ' треугольной призмы, отсекаемой от него плоскостью, проходящей ' +
				'через середины двух рёбер, выходящих из одной вершины, ' +
				'и параллельной третьему ребру, выходящему из этой же вершины'
			][v] + '.',
			analys: 'Сторона куба: $' + cube.baseSide + '$' + '<br>' +
				'Объём куба: $' + cube.volume + '$' + '<br>' +
				'Объём призмы: $' + prism.volume + '$' + '<br>',
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
/*
Решу ЕГЭ
 27183 76851 523395 562752 76853 76855 76857 76859 76861 76863 76865 76867 76869 76871 76873 76875 76877 76879 76881 76883 76885 76887 76889 76891 76893 76895 76897 76899 325075 325077 325079 325081 325083 325085 325087 325089 325091 325093 325095 325097 325099 325101 325103 325105 325107 325109 325111 325113 325115 325117 325119 325121 325123
 324459 559402 559596
 */
