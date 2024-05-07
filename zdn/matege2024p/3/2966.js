(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let par = new Parallelepiped({
			depth: sl(10, 50),
			height: sl(10, 50),
			width: sl(10, 50),
		});

		let find = [
			['длину диагонали ' + ['$AC_1$', 'параллелепипеда'].iz(), par.mainDiagonal],
			['объём параллелепипеда', par.volume],
			['площадь полной поверхности параллелепипеда', par.surfaceArea]
		].iz();

		let letter = ['A', 'B', 'C', 'D', 'D₁', 'A₁', 'B₁', 'C₁', ];

		let strok = [5, 4];

		let matrixPar = [
			[strok],
			[0, 1],
			[strok, 0, 1],
			[0, 0, 0, 1],
			[strok, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 1],
			[0, 0, 1, 0, 1, 0, 1],
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

		let point2DPar = par.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		genAssert((point2DPar[0].x - point2DPar[2].x).abs() > 20, 'Сечение не видно');

		autoScale(par, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPar = par.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		genAssert((point2DPar[0].x - point2DPar[2].x).abs() > 20, 'Сечение не видно');

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPar, matrixPar);
			ctx.font = "25px liberation_sans";

			point2DPar.forEach((elem, i) => ctx.fillText(letter[i], elem.x, elem.y + ((i < point2DPar.length / 2) ? 15 : -10)));
		};

		NAtask.setTask({
			text: 'В прямоугольном параллелепипеде $ABCDA_1B_1C_1D_1$ известно, что ' + ['$DD_1=' + par.height + '$',
					'$C_1D_1=' + par.width + '$', '$B_1C_1=' + par.depth + '$'
				].shuffleJoin(', ') +
				'. Найдите ' + find[0] + '.',
			answers: find.pop(),
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.variativeABC(letter);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();

//2966
//https://ege314.ru/8-stereometriya-ege/reshenie-2966/
