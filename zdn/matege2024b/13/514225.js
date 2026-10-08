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
			{ halfBase: 9, apothem: 40, edge: 41 },
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
			numberSide: 6,
		});

		// Площадь боковой поверхности и апофема - через getter'ы класса
		let S_bok = pyramid.sideSurfaceArea;
		let apothem = pyramid.apothem;

		let text = 'Сторона основания правильной шестиугольной пирамиды равна $' + a +
			'$, боковое ребро равно $' + l +
			'$. Найдите площадь боковой поверхности этой пирамиды.';

		// Фиксированная пирамида для иллюстрации: рисунок всегда одинаковый
		let drawPyramid = new RegularPyramid({
			height: Math.sqrt(37 * 37 - 24 * 24),
			baseSide: 24,
			numberSide: 6,
		});
		let vertices = drawPyramid.verticesOfFigure;

		// Камера как в соседних шаблонах папки: вид спереди-сверху, лёгкий поворот вбок,
		// чтобы шестиугольник основания читался, а не сплющивался в симметричную «палатку»
		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,
			rotationX: -Math.PI / 2 + Math.PI / 7,
			rotationY: 0,
			rotationZ: Math.PI / 12,
		};
		autoScale(vertices, camera, vertices.map((vertex) => project3DTo2D(vertex, camera)), {
			startX: -160,
			finishX: 160,
			startY: -140,
			finishY: 140,
			maxScale: 200,
		});
		let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));

		// Видимость граней - по знаку ориентированной площади проекции при обходе,
		// согласованном с внешней нормалью (признак откалиброван на одобренном 509658.js).
		// Ребро пунктирно, когда невидимы обе смежные грани.
		let n = vertices.length;
		let centroid = { x: 0, y: 0, z: 0 };
		vertices.forEach(function (vertex) {
			centroid.x += vertex.x / n;
			centroid.y += vertex.y / n;
			centroid.z += vertex.z / n;
		});
		let faces = [[0, 1, 2, 3, 4, 5]];
		for (let i = 0; i < 6; i++) {
			faces.push([i, (i + 1) % 6, 6]);
		}
		let facesVisible = faces.map(function (face) {
			let p0 = vertices[face[0]], p1 = vertices[face[1]], p2 = vertices[face[2]];
			let u = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
			let w = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };
			let normal = { x: u.y * w.z - u.z * w.y, y: u.z * w.x - u.x * w.z, z: u.x * w.y - u.y * w.x };
			let fc = {
				x: (p0.x + p1.x + p2.x) / 3 - centroid.x,
				y: (p0.y + p1.y + p2.y) / 3 - centroid.y,
				z: (p0.z + p1.z + p2.z) / 3 - centroid.z,
			};
			let orient = (normal.x * fc.x + normal.y * fc.y + normal.z * fc.z) < 0 ? -1 : 1;
			let q0 = points2D[face[0]], q1 = points2D[face[1]], q2 = points2D[face[2]];
			return orient * ((q1.x - q0.x) * (q2.y - q0.y) - (q2.x - q0.x) * (q1.y - q0.y)) > 0;
		});
		let matrix = drawPyramid.connectionMatrix.map((row) => row.slice());
		let dash = [7, 5];
		let setDash = function (u, v) {
			matrix[Math.max(u, v) - 1][Math.min(u, v)] = dash;
		};
		for (let i = 0; i < 6; i++) {
			let j = (i + 1) % 6;
			// ребро основания (i, j): смежные грани - основание и боковая i
			if (!facesVisible[0] && !facesVisible[1 + i]) {
				setDash(i, j);
			}
			// боковое ребро (i, 6): смежные грани - боковые i-1 и i
			if (!facesVisible[1 + ((i + 5) % 6)] && !facesVisible[1 + i]) {
				setDash(i, 6);
			}
		}

		let paint1 = function (ct) {
			ct.translate(200, 175);
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.drawFigure(points2D, matrix);
		};

		NAtask.setTask({
			text: text,
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
