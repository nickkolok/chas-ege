(function() {
	retryWhileError(function() {
		lx_declareClarifiedPhrase('сторона', 'основания');
		NAinfo.requireApiVersion(0, 2);

		let pyr = new RegularPyramid({
			height: sl(20, 50),
			baseSide: sl(20, 40),
			numberSide: 4
		});

		let question = [
			[sklonlxkand('высота'), pyr.height],
			[sklonlxkand('объём'), pyr.volume],
			[sklonlxkand('сторона основания'), pyr.baseSide],
		];

		let strok = [5, 4];

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

		autoScale(pyr, camera, point2DPyr, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPyr = pyr.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPyr, [
				[1],
				[0, strok],
				[1, 0, strok],
				[1, 1, strok, 1, ],
			]);

		};

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде ' +
				question[0][0].ie + ' рав' + ['ен', 'на', 'но'][question[0][0].rod] + ' $' + question[0][1] + '$, а ' +
				question[1][0].ie + ' рав' + ['ен', 'на', 'но'][question[1][0].rod] + ' $' + question[1][1] + '$. ' +
				'Найдите ' + question[2][0].ve + ' пирамиды.',
			answers: question[2][1],
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
	});
})();
// 27109 74849 74855 74887 510065 74851 74853 74857 74859 74861 74863 74865 74867 74869 74871 74873 74875 74877 74879 74881 74883 74885 74889 74891
