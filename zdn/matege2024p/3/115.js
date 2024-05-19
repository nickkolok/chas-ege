(function() {
	retryWhileError(function() {

		let v = sl1();

		let prism6 = new RegularPrism({
			height: sl(10, 100),
			baseSide: sl(15, 100),
			numberSide: 6
		});

		let pyr = new Pyramid({
			height: prism6.height,
			baseArea: prism6.baseArea / 6,
		});

		let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'F₁', 'A₁', 'B₁', 'C₁', 'D₁', 'E₁', ];
		let strok = [5, 4];

		let matrixPrism = [
			[1],
			[0, 1],
			[0, 0, strok],
			[0, 0, 0, strok],
			[1, 0, 0, 0, strok],
			[0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 0, 0, 1],
			[0, 0, 1, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, strok, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, strok, 0, 1, 0, 0, 0, 1],
		];

		let vert = ['A', 'B', 'C', 'D', 'E', 'F'];
		vert = vert.permuteCyclic(sl(0, 5));
		vert = vert.slice(0, 3);
		vert = vert.concat(vert.iz() + '_1');

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: Math.PI / 4,
		};

		let point2DPar = prism6.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(prism6, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPar = prism6.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPar, matrixPrism);
			ctx.font = "25px liberation_sans";

			point2DPar.forEach((elem, i) => ctx.fillText(letter[i], elem.x, elem.y + ((i < point2DPar.length / 2) ? 15 : -10)));
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: ['Найдите ', 'Дана треугольная пирамида $' + vert.join('') + '$, площадь основания которой равна $' +
				pyr.baseArea.pow(2).texsqrt(1) + '$, а высота, проведённая к этому основанию, равна $' + pyr.height +
				'$. Найдите '
			][v],
			questions: [{
				text: 'объём',
				answers: [pyr.volume, 18 * pyr.volume][v],
			}, ],
			postquestion: [' многогранника, ' +
				'вершинами которого являются вершины $' + vert.shuffleJoin(', ') +
				'$ правильной шестиугольной призмы ' +
				'$ABCDFEA_1B_1C_1D_1F_1E_1$, площадь основания которой равна $' + (6 * pyr.baseArea).pow(2).texsqrt(1) +
				'$, а боковое ребро равно $' + pyr.height +
				'$', ' прямой призмы с вершинами $' + ['A', 'B', 'C', 'D', 'E', 'F', 'A_1', 'B_1', 'C_1', 'D_1', 'E_1', 'F_1']
				.shuffleJoin(', ') + '$'
			][v] + '.',
			analys: '',
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.multiplyAnswerBySqrt(12);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.variativeABC(letter);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
/*
115 по Ширяевой предварительно
*/
