(function() {
	retryWhileError(function() {
		'use strict';
		NAinfo.requireApiVersion(0, 2);

		let cube = new Cube(sl(1, 100));
		let sphere = new Sphere(0.5 * cube.baseSide);

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

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,

			rotationX: -Math.PI / 2 + Math.PI / 15,
			rotationY: 0,
			rotationZ: 2 * Math.PI / 3,
		};

		let point2DCube = cube.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(cube.verticesOfFigure, camera, point2DCube, {
			startX: -180,
			finishX: 180,
			startY: -160,
			finishY: 160,
			maxScale: 200,
			step: 0.5,
		});

		point2DCube = cube.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DCube, matrixCube);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.setLineDash([4, 5]);
			ctx.drawArc(0, 0, point2DCube[1].y, 0, Math.PI * 2, true);

			ctx.drawEllipse(0, 0, point2DCube[1].y, 20, 0, Math.PI * 2, 0);
		};

		NAtask.setTask({
			text: 'Прямоугольный параллелепипед описан около сферы c ' + [
				['радиусом', sphere.radius],
				['диаметром', sphere.diameter],
				['объёмом', sphere.volume],
				['площадью поверхности', sphere.surfaceArea],
				['площадью большого круга', sphere.areaGreatCircle],
			].iz().join(' $') + '$. Найдите его ',
			questions: [{
				text: 'площадь поверхности',
				answers: cube.surfaceArea,
			}, {
				text: 'объём',
				answers: cube.volume,
			}, {
				text: 'диагональ',
				answers: cube.mainDiagonal
			}, {
				text: 'диагональ его грани',
				answers: cube.DWDiagonal
			}, {
				text: 'площадь основания',
				answers: cube.baseArea,
			}, ],
			postquestion: '.',
			analys: '',
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.multiplyAnswerBySqrt(12);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
// 27067 5065
