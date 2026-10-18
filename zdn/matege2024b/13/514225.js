(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Боковая грань - равнобедренный треугольник: половина стороны основания,
		// апофема и боковое ребро образуют пифагорову тройку. Перебираем все тройки
		// (и кратные примитивным) с гипотенузой до 101: так достижимы все наборы
		// ФИПИ, включая 20, 99, 101 и 11, 60, 61. Пирамида существует, только если
		// боковое ребро длиннее радиуса описанной окружности основания, то есть
		// стороны основания a = 2 * halfBase. Ограничение высоты снизу (H >= 0,35a)
		// не даёт пирамиде сплющиться в блин: у самой плоской из ФИПИ (16 и 17) H : a = 0,36.
		let triples = [];
		for (let halfBase = 1; halfBase <= 50; halfBase++) {
			for (let apothem = 1; apothem <= 100; apothem++) {
				let edge = Math.sqrt(halfBase * halfBase + apothem * apothem);
				if (edge <= 101 && edge.isAlmostInteger()) {
					edge = Math.round(edge);
					let h2 = edge * edge - 4 * halfBase * halfBase;
					// Площадь боковой поверхности 6 * halfBase * apothem - не больше
					// 12000: у ФИПИ наибольший ответ 11880 (40 и 101), а без этого
					// ограничения 62% ответов превышали 5000 (до 18720)
					if (h2 >= 0.35 * 0.35 * 4 * halfBase * halfBase && 6 * halfBase * apothem <= 12000) {
						triples.push({ halfBase: halfBase, apothem: apothem, edge: edge });
					}
				}
			}
		}

		let t = triples.iz();
		let a = t.halfBase * 2;  // сторона основания
		let l = t.edge;          // боковое ребро
		let apothem = t.apothem; // целая по построению: берём из тройки, а не из геттера

		// Высота пирамиды: для правильного шестиугольника R = a, поэтому H = sqrt(l^2 - a^2)
		let H = Math.sqrt(l * l - a * a);
		genAssert(H>15, 'Слишком маленькая высота');

		// Площадь боковой поверхности: шесть граней по a * apothem / 2
		let S_bok = 3 * a * apothem;

		let text = 'Сторона основания правильной шестиугольной пирамиды равна $' + a +
			'$, боковое ребро равно $' + l +
			'$. Найдите площадь боковой поверхности этой пирамиды.';
		let analys = 'Апофема правильной пирамиды — высота боковой грани. Боковая грань — равнобедренный треугольник ' +
			'с боковыми сторонами $' + l + '$ и основанием $' + a + '$, поэтому апофема — катет прямоугольного треугольника ' +
			'с гипотенузой $' + l + '$ (боковым ребром) и другим катетом $' + t.halfBase +
			'$ (половиной стороны основания): $\\sqrt{' + l + '^2-' + t.halfBase + '^2}=\\sqrt{' + (l * l - t.halfBase * t.halfBase) +
			'}=' + apothem + '$. Площадь боковой поверхности равна половине произведения периметра основания ' +
			'на апофему: $S=\\frac{1}{2}\\cdot' + (6 * a) + '\\cdot' + apothem + '=' + S_bok + '$.';

		// Пирамида для иллюстрации пропорциональна условию (класс из lib/figure.js).
		// Сторону основания берём единичной: autoScale() начинает с масштаба 5
		// и отбраковывает фигуру, если она уже на старте не помещается в холст.
		let drawPyramid = new RegularPyramid({
			height: H / a,
			baseSide: 1,
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
			// У плоских пирамид (у ФИПИ H : a до 0,36) при взгляде под углом PI/7
			// вершина проецировалась ниже задних вершин основания, и пирамида
			// читалась как плоский шестиугольник - для них смотрим положе
			rotationX: -Math.PI / 2 + Math.min(Math.PI / 7, Math.atan(0.75 * H / a)),
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
		// Центрируем проекцию на холсте
		let shiftX = (Math.min(...points2D.map((p) => p.x)) + Math.max(...points2D.map((p) => p.x))) / 2;
		let shiftY = (Math.min(...points2D.map((p) => p.y)) + Math.max(...points2D.map((p) => p.y))) / 2;
		points2D = points2D.map((p) => ({ x: p.x - shiftX, y: p.y - shiftY }));

		// Видимость граней - по знаку ориентированной площади проекции при обходе,
		// согласованном с внешней нормалью (признак откалиброван на одобренном 513803.js).
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
			analys: analys,
			answers: S_bok,
			authors: ['Zer00Player', 'chas-ege-selena'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 350,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//514225
//Zer00Player, chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=514225
