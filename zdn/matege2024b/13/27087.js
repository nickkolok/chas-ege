(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 6);
		let m = sl(1, 15);
		let k = 4 * m;
		let V = a * a * m;

		let paintPyramid = function (ct) {
			// Чертёж схематический, с фиксированными пропорциями (приём одобренного
			// zdn/matege2024b/13/73837.js): при данных задачи высота H = 4m*sqrt(3)
			// может превышать сторону основания более чем вдесятеро, и пропорциональный
			// чертёж был бы нечитаемой иглой.
			let pyramid = new RegularPyramid({ height: 2.5, baseSide: 2, numberSide: 3 });
			let vertices = pyramid.verticesOfFigure;

			let camera = {
				x: 0,
				y: 0,
				z: 0,
				scale: 5,
				rotationX: -Math.PI / 2 + Math.PI / 9,
				rotationY: 0,
				rotationZ: Math.PI / 2,
			};
			autoScale(vertices, camera, vertices.map((vertex) => project3DTo2D(vertex, camera)), {
				startX: -150,
				finishX: 150,
				startY: -150,
				finishY: 150,
				maxScale: 200,
			});
			let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));

			// Видимость граней - по знаку ориентированной площади проекции при внешнем
			// обходе (приём откалиброван на одобренном 509658.js); нормаль ориентируем
			// наружу по центру тяжести. Ребро пунктирно, если невидимы обе смежные грани.
			let centroid = {
				x: vertices.reduce((sum, vertex) => sum + vertex.x, 0) / vertices.length,
				y: vertices.reduce((sum, vertex) => sum + vertex.y, 0) / vertices.length,
				z: vertices.reduce((sum, vertex) => sum + vertex.z, 0) / vertices.length,
			};
			let faceIndices = [[0, 1, 2], [0, 1, 3], [1, 2, 3], [2, 0, 3]];
			let facesVisible = faceIndices.map(function (face) {
				let p0 = vertices[face[0]], p1 = vertices[face[1]], p2 = vertices[face[2]];
				let u = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
				let w = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };
				let n = { x: u.y * w.z - u.z * w.y, y: u.z * w.x - u.x * w.z, z: u.x * w.y - u.y * w.x };
				let fc = {
					x: (p0.x + p1.x + p2.x) / 3 - centroid.x,
					y: (p0.y + p1.y + p2.y) / 3 - centroid.y,
					z: (p0.z + p1.z + p2.z) / 3 - centroid.z,
				};
				// Знак площади берём от обхода, согласованного с ВНЕШНЕЙ нормалью:
				// если обход грани даёт нормаль внутрь, площадь берём с минусом.
				// Признак откалиброван на одобренном 509658.js (скрытое ребро 0-1).
				let orient = (n.x * fc.x + n.y * fc.y + n.z * fc.z) < 0 ? -1 : 1;
				let q0 = points2D[face[0]], q1 = points2D[face[1]], q2 = points2D[face[2]];
				return orient * ((q1.x - q0.x) * (q2.y - q0.y) - (q2.x - q0.x) * (q1.y - q0.y)) > 0;
			});
			let edges = [[0, 1], [1, 2], [2, 0], [0, 3], [1, 3], [2, 3]];
			let matrix = [
				[1],
				[1, 1],
				[1, 1, 1],
			];
			let dash = [7, 5];
			edges.forEach(function (edge) {
				let hidden = !faceIndices.some(function (face, k) {
					return facesVisible[k] && face.includes(edge[0]) && face.includes(edge[1]);
				});
				if (hidden) {
					matrix[Math.max(edge[0], edge[1]) - 1][Math.min(edge[0], edge[1])] = dash;
				}
			});

			ct.translate(200, 200);
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.drawFigure(points2D, matrix);

			// Высота пирамиды - пунктиром от вершины к центру основания
			let baseCenter = {
				x: (points2D[0].x + points2D[1].x + points2D[2].x) / 3,
				y: (points2D[0].y + points2D[1].y + points2D[2].y) / 3,
			};
			ct.setLineDash(dash);
			ct.drawLine(points2D[3].x, points2D[3].y, baseCenter.x, baseCenter.y);
			ct.setLineDash([]);
		};
		NAtask.setTask({
			text: 'Сторона основания правильной треугольной пирамиды равна $' + a + '$, а высота пирамиды равна $' + k + '\\sqrt{3}$. Найдите объём этой пирамиды.',
			answers: V,
			analys: 'Площадь правильного треугольника со стороной $' + a + '$ равна $S = \\frac{\\sqrt{3}}{4} \\cdot ' + a + '^2$. Высота пирамиды $H = ' + k + '\\sqrt{3}$. ' +
				'Объём: $V = \\frac{1}{3} \\cdot S \\cdot H = \\frac{1}{3} \\cdot \\frac{\\sqrt{3}}{4} \\cdot ' + a +
				'^2 \\cdot ' + k + '\\sqrt{3} = \\frac{' + (a * a * k) + '}{4} = ' + V + '$.',
			authors: ['chas-ege-selena'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paintPyramid,
		});
	}, 1000);
})();
//27087
//chas-ege-selena
// https://mathb-ege.sdamgia.ru/problem?id=27087
