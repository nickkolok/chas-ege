(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Набор пифагоровых троек для генерации вариантов задачи
		// (полусторона, апофема, боковое ребро)
		let triples = [
			{ halfBase: 5, apothem: 12, edge: 13 },
			{ halfBase: 8, apothem: 15, edge: 17 },
			{ halfBase: 7, apothem: 24, edge: 25 },
			{ halfBase: 12, apothem: 35, edge: 37 },
			{ halfBase: 9, apothem: 40, edge: 41 }
		];

		let t = triples.iz();
		let a = t.halfBase * 2;  // сторона основания
		let l = t.edge;          // боковое ребро

		// Высота пирамиды: для правильного шестиугольника R = a, поэтому H = sqrt(l^2 - a^2)
		let H = Math.sqrt(l * l - a * a);

		// Пирамида для вычислений (класс из lib/figure.js)
		let pyramid = new RegularPyramid({
			height: H,
			baseSide: a,
			numberSide: 6
		});

		// Площадь боковой поверхности — через getter класса
		let S_bok = pyramid.sideSurfaceArea;

		// Фиксированная пирамида для иллюстрации: рисунок всегда одинаковый
		let drawPyramid = new RegularPyramid({
			height: Math.sqrt(37 * 37 - 24 * 24),
			baseSide: 24,
			numberSide: 6
		});

		// Камера: вид спереди и сверху, без поворота вбок (симметричный рисунок)
		let camera = {
			x: 0,
			y: 0,
			z: 0,
			rotationX: -2.1,
			rotationY: 0,
			rotationZ: 0,
			scale: 6          // увеличенный масштаб рисунка
		};

		// Проецируем 3D-вершины в 2D (lib/project3DTo2D.js)
		let vertices2D = drawPyramid.verticesOfFigure.map(v => project3DTo2D(v, camera));

		// Центрируем фигуру на канвасе 400x350
		let xs = vertices2D.map(p => p.x);
		let ys = vertices2D.map(p => p.y);
		let cx = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
		let cy = (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2;
		vertices2D = vertices2D.map(p => ({ x: p.x - cx + 200, y: p.y - cy + 175 }));

		// Матрица смежности из класса; помечаем невидимые рёбра пунктиром
		let matrix = drawPyramid.connectionMatrix;
		matrix[0][0] = [4, 2]; // ребро основания 0-1 (заднее правое)
		matrix[1][1] = [4, 2]; // ребро основания 1-2 (заднее, горизонтальное)
		matrix[2][2] = [4, 2]; // ребро основания 2-3 (заднее левое)
		matrix[5][1] = [4, 2]; // боковое ребро к задней вершине 1
		matrix[5][2] = [4, 2]; // боковое ребро к задней вершине 2

		// Отрисовка через drawFigure (lib/canvas.js)
		let paint1 = function (ct) {
			ct.lineWidth = 1.5;
			ct.strokeStyle = '#000';
			ct.drawFigure(vertices2D, matrix);
		};

		NAtask.setTask({
			text: 'Сторона основания правильной шестиугольной пирамиды равна $' + a + '$, боковое ребро равно $' + l + '$. Найдите площадь боковой поверхности этой пирамиды.',
			answers: S_bok,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 350,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=514225
