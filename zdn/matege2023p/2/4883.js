(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('квадрат', 'диагонали');
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rand = sl1();

		let cube = new Cube(sl(1, 50));
		let sphere = new Sphere(0.5 * cube.baseSide);

		let nameCube = [
			['ребро', cube.baseSide],
			['площадь поверхности', cube.surfaceArea],
			['объём', cube.volume],
			['квадрат диагонали', cube.mainDiagonal.pow(2)],
			['диагональ', cube.mainDiagonal, ]
		].iz();
		let nameSphere = [
			['радиус', sphere.radius],
			['площадь поверхности', sphere.surfaceArea],
			['объём', sphere.volume],
			['диаметр', sphere.diameter]
		].iz();

		let strok = [5, 4];

		let parForPaint = new Cube(300);

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: -20 * Math.PI / 19,
		};

		let point2DPar = parForPaint.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(w / 2, h / 2);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(point2DPar, [
				[strok],
				[0, 1],
				[strok, 0, 1],
				[0, 0, 0, 1],
				[strok, 0, 0, 0, 1],
				[0, 1, 0, 0, 0, 1],
				[0, 0, 1, 0, 1, 0, 1, ],
			]);

			ctx.setLineDash([4, 5]);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawArc(0, 0, 150, 0, 2 * Math.PI);
			ctx.drawEllipse(0, 0, 150, 30, 0, 0, 2 * Math.PI);
		};

		NAtask.setTask({
			text: ['В куб с ' + sklonlxkand(nameCube[0]).te + ' $' + nameCube[1] + '$ вписан шар. Найдите ' + sklonlxkand(nameSphere[0]).ve + ' этого шара.',
				'Прямоугольный параллелепипед описан около сферы c ' + sklonlxkand(nameSphere[0]).te + ' $' + nameSphere[1].texpi() +
				'$. Найдите его ' +	sklonlxkand(nameCube[0]).ve + '.',
			][rand],
			answers: [nameSphere[1], nameCube[1]][rand],
		});
		NAtask.modifiers.multiplyAnswerByPI();
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
//4883,27043
