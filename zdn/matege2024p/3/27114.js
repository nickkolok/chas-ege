(function() {
	retryWhileError(function() {

		let pyr1 = new RegularPyramid({
			height: sl(30, 70),
			baseSide: sl(20, 50),
			numberSide: 4
		});

		let pyr2 = new Pyramid({
			height: 0.5 * pyr1.height,
			baseArea: 0.5 * pyr1.baseArea,
		});

		pyr1.verticesOfFigure = coordinatesMiddleOfSegment3D(pyr1.verticesOfFigure[0], pyr1.verticesOfFigure[4]);

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: [1, 2].iz() * Math.PI / 3,
		};

		let point2DPyr = pyr1.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(pyr1.verticesOfFigure, camera, point2DPyr, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPyr = pyr1.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let letters = ['A', 'B', 'C', 'D', 'S', 'E'];
		let strok = [5, 4];

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPyr, [
				[1],
				[0, strok],
				[1, strok, strok],
				[1, 1, strok, 1, ],
				[0, 1, 0, 1, 0]
			]);

			ctx.font = "30px liberation_sans";
			point2DPyr.forEach((elem, i) => ctx.fillText(letters[i], elem.x, elem.y + ((i <= point2DPyr.length - 3) ? 15 : -
				10)));

		};

		NAtask.setTask({
			text: 'Объём правильной четырёхугольной пирамиды $SABCD$ равен $' + pyr1.volume.pow(2).texsqrt(1) + '$. ' +
				'Точка $E$ – середина ребра $SA$. Найдите объём треугольной пирамиды $EABD$.',
			answers: pyr2.volume,
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//27114 75015 75063 519535 75017 75019 75021 75023 75025 75027 75029 75031 75033 75035 75037 75039 75041 75043 75045 75047 75049 75051 75053 75055 75057 75059 75061
