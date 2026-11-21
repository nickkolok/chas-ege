(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function() {
		const cube = new Cube(sl(1, 100));
		const sphere = new Sphere(0.5 * cube.baseSide);
		const dash = [5, 4];
		const camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,
			rotationX: -Math.PI / 2 + Math.PI / 15,
			rotationY: 0,
			rotationZ: 2 * Math.PI / 3,
		};
		const projection = cube.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		const point2DCube = autoScale(cube.verticesOfFigure, camera, projection, {
			startX: -180,
			finishX: 180,
			startY: -160,
			finishY: 160,
			maxScale: 200,
			step: 0.05,
		});
		const faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 6, 5],
			[1, 2, 7, 6], [2, 3, 4, 7], [3, 0, 5, 4]];
		const visibility = facesVisibility(cube.verticesOfFigure, point2DCube, faces);
		const matrixCube = dashHiddenEdges(cube.connectionMatrix, faces, visibility, dash);
		const paint = function(ctx) {
			ctx.translateToCenter();
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawFigure(point2DCube, matrixCube);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.setLineDash(dash);
			ctx.drawCircle(sphere.radius * camera.scale);
		};
		NAtask.setTask({
			text: 'Прямоугольный параллелепипед описан около сферы с ' + [
				['радиусом', sphere.radius],
				['диаметром', sphere.diameter],
				['объёмом', cube.volume.texfracpi(6)],
				['площадью поверхности', cube.baseArea.texfracpi(1)],
				['площадью большого круга', cube.baseArea.texfracpi(4)],
			].iz().join(' $') + '$. Найдите его ',
			questions: [{
				text: 'площадь поверхности',
				answers: cube.surfaceArea,
			}, {
				text: 'объём',
				answers: cube.volume,
			}, {
				text: 'диагональ',
				answers: cube.mainDiagonal,
			}, {
				text: 'диагональ грани',
				answers: cube.DWDiagonal,
			}, {
				text: 'площадь основания',
				answers: cube.baseArea,
			}],
			postquestion: '.',
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(12);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});
	}, 100000);
})();
// 27067 5065
