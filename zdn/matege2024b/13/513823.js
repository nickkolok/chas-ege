(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '513823';

		let a = sl(1, 10);
		let b = sl(1, 10);
		let h = 6 * sl(1, 5);
		let V = a * b * h / 6;
		genAssertAlmostInteger(V, 'Объём пирамиды должен быть целым');

		// Букв на чертеже нет: в образце задачи (официальный рисунок СдамГИА, SVG без
		// единого текстового элемента) вершины не обозначены, значит и шаблон их не
		// вводит (соглашение команды). Условие и решение обходятся без имён вершин.
		let text = 'В треугольной пирамиде три ребра взаимно перпендикулярны, а их длины равны $' +
			a + '$, $' + b + '$ и $' + h + '$. Найдите объём этой пирамиды.';
		let analys = 'Пусть три взаимно перпендикулярных ребра, выходящие из одной вершины, равны $' + a +
			'$, $' + b + '$ и $' + h + '$. Два первых лежат в плоскости основания и образуют прямоугольный ' +
			'треугольник площадью $\\frac{' + a + ' \\cdot ' + b + '}{2} = ' + (a * b / 2) +
			'$; третье перпендикулярно двум пересекающимся прямым этой плоскости, значит, перпендикулярно ' +
			'самой плоскости и является высотой пирамиды: $V = \\frac{1}{3} \\cdot ' + (a * b / 2) +
			' \\cdot ' + h + ' = ' + V + '$.';

		// Класс из lib/figure.js: три взаимно перпендикулярных ребра выходят из вершины 0.
		// Вершины 0, 1, 2 - основание (прямой угол в 0), вершина 3 - над вершиной 0.
		let pyramid = new RectangularPyramidWithRightAngledTriangleAtBase({
			height: h,
			sideA: a,
			sideB: b,
		});

		// Вершины берём у класса, но высоту восстанавливаем: findTriangleVertices()
		// сдвигает основание на z центра описанной окружности вместе с z, из-за чего
		// основание оказывается в z=0, а вершина - в z=+height/2, и высота пирамиды на
		// чертеже выходит вдвое меньше заданной (см. issue про findTriangleVertices).
		// Чертёж обязан быть пропорционален условию (md/task_geometry.md).
		let vertices = pyramid.verticesOfFigure.map((vertex, index) =>
			({ x: vertex.x, y: vertex.y, z: (index < 3 ? -0.5 : 0.5) * h }));

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,
			rotationX: -Math.PI / 2 + Math.PI / 9,
			rotationY: 0,
			rotationZ: Math.PI / 10,
		};
		autoScale(vertices, camera, vertices.map((vertex) => project3DTo2D(vertex, camera)), {
			startX: -150,
			finishX: 150,
			startY: -150,
			finishY: 150,
			maxScale: 200,
		});
		let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));

		// Видимость граней tetraэдра - по знаку ориентированной площади проекции
		// (приём откалиброван на одобренном 509658.js). Нормаль грани ориентируем
		// наружу по центру тяжести: у выпуклого тела внешняя нормаль сонаправлена
		// с вектором из центра тела в центр грани.
		let centroid = {
			x: vertices.reduce((s, v) => s + v.x, 0) / 4,
			y: vertices.reduce((s, v) => s + v.y, 0) / 4,
			z: vertices.reduce((s, v) => s + v.z, 0) / 4,
		};
		let faceIndices = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]];
		let facesVisible = faceIndices.map(function (f) {
			let p0 = vertices[f[0]], p1 = vertices[f[1]], p2 = vertices[f[2]];
			let u = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
			let w = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };
			let n = { x: u.y * w.z - u.z * w.y, y: u.z * w.x - u.x * w.z, z: u.x * w.y - u.y * w.x };
			let fc = {
				x: (p0.x + p1.x + p2.x) / 3 - centroid.x,
				y: (p0.y + p1.y + p2.y) / 3 - centroid.y,
				z: (p0.z + p1.z + p2.z) / 3 - centroid.z,
			};
			if (n.x * fc.x + n.y * fc.y + n.z * fc.z < 0) {
				n = { x: -n.x, y: -n.y, z: -n.z };
			}
			let q0 = points2D[f[0]], q1 = points2D[f[1]], q2 = points2D[f[2]];
			let area = (q1.x - q0.x) * (q2.y - q0.y) - (q2.x - q0.x) * (q1.y - q0.y);
			return area > 0;
		});
		// Ребро невидимо, если невидимы обе смежные грани
		let tetraEdges = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
		let isHidden = function (edge) {
			return !faceIndices.some(function (f, k) {
				return facesVisible[k] && f.includes(edge[0]) && f.includes(edge[1]);
			});
		};

		// Матрица в формате drawFigure: строка i, столбец j - ребро между точками i+1 и j
		let matrix = [
			[1],
			[1, 1],
			[1, 1, 1],
		];
		let dash = [7, 5];
		tetraEdges.forEach(function (edge) {
			if (isHidden(edge)) {
				matrix[Math.max(edge[0], edge[1]) - 1][Math.min(edge[0], edge[1])] = dash;
			}
		});

		let paint1 = function (ctx) {
			ctx.translate(200, 200);
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.lineWidth = 2;

			ctx.drawFigure(points2D, matrix);

			// Прямой угол при вершине A между рёбрами AB и AC. Штрих отметки берём
			// таким же, как у ребра AB: если вершина A окажется скрытой, отметка
			// станет пунктирной вместе с её рёбрами, если видимой - сплошной.
			if (isHidden(tetraEdges[0])) {
				ctx.setLineDash(dash);
			}
			ctx.arcBetweenSegments([
				points2D[1].x, points2D[1].y,
				points2D[0].x, points2D[0].y,
				points2D[2].x, points2D[2].y,
			], 14, true);
			ctx.setLineDash([]);
		};

		NAtask.setTask({
			text: text,
			analys: analys,
			answers: V,
			authors: ['chas-ege-selena'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//513823
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=513823
