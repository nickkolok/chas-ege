(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
		lx_declareClarifiedPhrase('площадь', 'полной поверхности');
		lx_declareClarifiedPhrase('площадь', 'основания');

		let a = sl(20, 100);
		let pyr = new RegularPyramid({
			baseSide: a,
			height: a * (6).sqrt() / 3,
			numberSide: 3
		});

		let name = [
			['площадь полной поверхности', pyr.surfaceArea],
			['площадь боковой поверхности', pyr.sideSurfaceArea],
			['площадь основания', pyr.baseArea],
			['объём', pyr.volume],
			['апофема', pyr.apothem],
			['высота', pyr.height],
		].iz(2);

		let question = (name).T()[0];
		let numbers = (name).T()[1];

		let strok = [5, 4];

		let matrixPyr = [
			[1],
			[strok, strok],
			[1, 1, strok, 0, [0, strok][Number(question.includes('высота'))],
				[0, strok][Number(question.includes('апофема'))]
			],
		];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: Math.PI / slKrome(6, 4, 8),
		};

		let vertex3D = pyr.verticesOfFigure.concat([{
			x: 0,
			y: 0,
			z: -pyr.height / 2,
		}, {
			x: -pyr.radiusOfInscribedCircle,
			y: 0,
			z: -pyr.height / 2,
		}]);

		let point2DPyr = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(vertex3D, camera, point2DPyr, {
			startX: -180,
			finishX: 180,
			startY: -180,
			finishY: 180,
			maxScale: 50,
		});

		point2DPyr = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPyr, matrixPyr);
		};
		NAtask.setTask({
			text: 'В правильном тетраэдре ' + question[0] + ' ' + ['равен', 'равна'][sklonlxkand(question[0]).rod] + ' $' +
				numbers[0].pow(2).texsqrt(sl1()) +
				'$. Чему ' + ['равен', 'равна'][sklonlxkand(question[1]).rod] + ' ' + question[1] + ' тетраэдра?',
			answers: numbers[1],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(6);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 10000);
})();
