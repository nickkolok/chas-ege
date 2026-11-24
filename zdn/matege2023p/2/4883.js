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
			['квадрат диагонали', 3 * cube.baseSide.pow(2)],
			['диагональ', cube.mainDiagonal]
		].iz();
		let nameSphere = [
			['радиус', sphere.radius],
			['площадь поверхности', sphere.surfaceArea],
			['объём', sphere.volume],
			['диаметр', sphere.diameter]
		].iz();
		let sphereHasPi = ['площадь поверхности', 'объём'].includes(nameSphere[0]);
		let sphereValue = nameSphere[0] === 'объём' ? cube.baseSide.pow(3).texfrac(6) + '\\pi' :
			(sphereHasPi ? cube.baseSide.pow(2) + '\\pi' : nameSphere[1]);
		let cubeValue = nameCube[0] === 'диагональ' ? (3 * cube.baseSide.pow(2)).texsqrt(1) : nameCube[1];
		let answer = rand ? nameCube[1] : (sphereHasPi ? nameSphere[1] / Math.PI : nameSphere[1]);
		let ps = !rand && sphereHasPi ? ' Ответ разделите на $\\pi$.' : '';

		let strok = [5, 4];

		let parForPaint = new Cube(300);
		let sphereForPaint = new Sphere(0.5 * parForPaint.baseSide);

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
			ctx.translateToCenter();
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			let faces = [[0, 1, 2, 3], [5, 6, 7, 4], [0, 1, 6, 5], [1, 2, 7, 6], [2, 3, 4, 7], [3, 0, 5, 4]];
			let visibility = facesVisibility(parForPaint.verticesOfFigure, point2DPar, faces);
			ctx.drawFigure(point2DPar, dashHiddenEdges(parForPaint.connectionMatrix, faces, visibility, strok));

			ctx.setLineDash([4, 5]);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawCircle(sphereForPaint.radius);
			ctx.drawEllipse(0, 0, sphereForPaint.radius, 30, 0, 0, 2 * Math.PI);
		};

		NAtask.setTask({
			text: ['В куб с ' + sklonlxkand(nameCube[0]).te + ' $' + cubeValue + '$ вписан шар. Найдите ' + sklonlxkand(nameSphere[0]).ve + ' этого шара.' + ps,
				'Прямоугольный параллелепипед описан около сферы с ' + sklonlxkand(nameSphere[0]).te + ' $' + sphereValue +
				'$. Найдите его ' +	sklonlxkand(nameCube[0]).ve + '.',
			][rand],
			answers: answer,
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);

})();
//4883,27043

