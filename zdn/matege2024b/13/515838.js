(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 9, 1);
		let b = slKrome(a, 2, 9, 1);
		let c = sl(2, 9, 1);
		let V = a * b * c;
		let S = 2 * (a * b + b * c + a * c);

		let paint1 = function (ct) {
			// Создаём параллелепипед с заданными размерами
			let parallelepiped = new Parallelepiped({
				width: a,
				height: c,
				depth: b
			});
			
			// Получаем 3D вершины и матрицу связей
			let vertices3D = parallelepiped.verticesOfFigure;
			let connectionMatrix = parallelepiped.connectionMatrix;
			
			// Настраиваем камеру для проекции 3D в 2D
			let maxDim = Math.max(a, b, c);
			let camera = {
				x: 0,
				y: 0,
				z: 50,
				rotationX: 0.3,
				rotationY: -0.5,
				rotationZ: 0,
				scale: 300 / maxDim
			};
			
			// Проецируем 3D вершины в 2D
			let vertices2D = vertices3D.map(v => project3DTo2D(v, camera));
			
			// Вычисляем центр фигуры для центрирования на canvas
			let minX = Math.min(...vertices2D.map(v => v.x));
			let maxX = Math.max(...vertices2D.map(v => v.x));
			let minY = Math.min(...vertices2D.map(v => v.y));
			let maxY = Math.max(...vertices2D.map(v => v.y));
			
			let centerX = (minX + maxX) / 2;
			let centerY = (minY + maxY) / 2;
			
			// Смещаем вершины так, чтобы центр фигуры был в центре canvas (200, 200)
			vertices2D = vertices2D.map(v => ({
				x: v.x - centerX + 200,
				y: v.y - centerY + 200
			}));
			
			// Рисуем фигуру с использованием матрицы связей
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.drawFigure(vertices2D, connectionMatrix);
		};

		NAtask.setTask({
			text: 'Два ребра прямоугольного параллелепипеда равны $' + a + '$ и $' + b + '$, а объём параллелепипеда равен $' + V + '$. Найдите площадь поверхности этого параллелепипеда.',
			answers: S,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=515838
