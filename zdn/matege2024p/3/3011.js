(function() {
	retryWhileError(function() {
		lx_declareClarifiedPhrase('сторона', 'основания');
		NAinfo.requireApiVersion(0, 2);

		let pyr = new RegularPyramid({
			height: sl(20, 50),
			baseSide: sl(20, 40),
			numberSide: 4
		});

		pyr.verticesOfFigure.push({
			x: 0,
			y: 0,
			z: pyr.verticesOfFigure[0].z
		});

		let question = [
			[sklonlxkand('боковое ребро'), pyr.sideEdge],
			[sklonlxkand('объём'), pyr.volume],
		].shuffle();
		question.unshift([sklonlxkand('сторона основания'), pyr.baseSide]);

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: [1, 2].iz() * Math.PI / 3,
		};

		let point2DPyr = pyr.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		point2DPyr = autoScale(pyr.verticesOfFigure, camera, point2DPyr, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		let letters = ['A', 'B', 'C', 'D', 'S', 'O'];

		let dash = [5, 4];

		
		let faces = [[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]];
		let visibility = facesVisibility(pyr.verticesOfFigure.slice(0, 5), point2DPyr, faces);
		let figureMatrix = dashHiddenEdges(pyr.connectionMatrix, faces, visibility, dash);
		if (!figureMatrix[1]) figureMatrix[1] = [];
		figureMatrix[1][0] = dash;
		if (!figureMatrix[2]) figureMatrix[2] = [];
		figureMatrix[2][1] = dash;
		if (!figureMatrix[3]) figureMatrix[3] = [];
		figureMatrix[3][5] = dash;

		let paint1 = function(ctx) {
			ctx.translateToCenter();
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawFigure(point2DPyr, figureMatrix);

			ctx.font = '30px liberation_sans';
			point2DPyr.forEach((elem, i) => ctx.fillText(letters[i], elem.x, elem.y + ((i != point2DPyr.length - 2) ? 15 : -
				10)));
		};

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде $SABCD$ с ' +
				'основанием $ABCD$ ' +
				[question[0][0].ie + ' ' + om.ravno[question[0][0].rod] + ' $' + (question[0][0].ie === 'боковое ребро' ? question[0][1].pow(2).texsqrt(1) : question[0][1].ts()) + '$',
				question[1][0].ie + ' ' + om.ravno[question[1][0].rod] + ' $' + (question[1][0].ie === 'боковое ребро' ? question[1][1].pow(2).texsqrt(1) : question[1][1].ts()) +'$'
				].shuffleJoin(', ') +
				'. Найдите ' + question[2][0].ve + ' пирамиды.',
			answers: question[2][1],
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	});
})();
//3011
