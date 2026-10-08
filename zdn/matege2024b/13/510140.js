(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510140';

		// Пропорции чертежа (md/task_geometry.md): чертёж обязан быть читаемым,
		// поэтому отношение высоты призмы к стороне основания H/a = k*sqrt(3)/a
		// держим в коридоре [0.7; 3.2]. Вне него призма вырождается в «блин»
		// (верхнее основание сливается с нижним) или в «иглу» (основание не читается).
		let pairs = [];
		for (let side = 2; side <= 8; side++) {
			for (let k = 1; k <= 6; k++) {
				let ratio = k * Math.sqrt(3) / side;
				if (ratio >= 0.7 && ratio <= 3.2)
					pairs.push([side, k]);
			}
		}
		let chosen = pairs.iz();
		let a = chosen[0];
		let k = chosen[1];
		let H = k * Math.sqrt(3);
		// V = S_осн * H = (sqrt(3)/4 * a^2) * (k * sqrt(3)) = 3 * a^2 * k / 4
		let V = 3 * a * a * k / 4;

		let letters = ['A', 'B', 'C'];
		let prismName = '$' + letters[0] + letters[1] + letters[2] +
			letters[0] + '_1' + letters[1] + '_1' + letters[2] + '_1$';
		let heightTex = (3 * k * k).texsqrt(true, true);

		let text = [
			'Сторона основания правильной треугольной призмы ' + prismName + ' равна $' + a +
				'$, а высота этой призмы равна $' + heightTex + '$. Найдите объём призмы ' + prismName + '.',
			'У правильной треугольной призмы ' + prismName + ' сторона основания равна $' + a +
				'$, а высота равна $' + heightTex + '$. Найдите объём этой призмы.',
		].iz();

		let analys = 'Основание призмы - правильный треугольник со стороной $' + a +
			'$, его площадь вычисляется по формуле $S = \\frac{\\sqrt{3}}{4}a^2 = \\frac{\\sqrt{3}}{4} \\cdot ' +
			a * a + '$. Объём призмы равен произведению площади основания на высоту: $V = S \\cdot h = ' +
			'\\frac{\\sqrt{3}}{4} \\cdot ' + a * a + ' \\cdot ' + heightTex + ' = \\frac{3 \\cdot ' + a * a +
			' \\cdot ' + k + '}{4} = ' + V + '$.';

		NAtask.setTask({
			text: text,
			analys: analys,
			answers: V,
			authors: ['chas-ege-selena'],
		});

		// Буквы есть и в условии, и на официальном рисунке задачи, поэтому вводим их
		// и перемешиваем модификатором; V и S в решении не перемешиваем.
		NAtask.modifiers.variativeABC(letters, { preserve: ['V', 'S'] });

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function (ct) {
				ct.translate(200, 200);
				// Класс из lib/figure.js: правильная призма с треугольным основанием.
				let prism = new RegularPrism({ height: H, baseSide: a, numberSide: 3 });
				let vertices = prism.verticesOfFigure;

				let camera = {
					x: 0,
					y: 0,
					z: 0,
					scale: 5,
					rotationX: -Math.PI / 2 + Math.PI / 9,
					rotationY: 0,
					// Ракурс как на официальном рисунке: верхнее основание целиком
					// видно, из трёх боковых граней дальняя от зрителя скрыта,
					// поэтому пунктирным оказывается ровно одно ребро нижнего основания.
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

				// Видимость граней - по знаку ориентированной площади проекции при обходе,
				// согласованном с внешней нормалью (приём откалиброван на одобренном 509658.js).
				let n = vertices.length;
				let centroid = { x: 0, y: 0, z: 0 };
				vertices.forEach(function (vertex) {
					centroid.x += vertex.x / n;
					centroid.y += vertex.y / n;
					centroid.z += vertex.z / n;
				});
				// Грани: нижнее и верхнее основания и три боковые.
				let faces = [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]];
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
					// Знак площади берём от обхода, согласованного с ВНЕШНЕЙ нормалью:
					// если обход грани даёт нормаль внутрь, площадь берём с минусом.
					let orient = (normal.x * fc.x + normal.y * fc.y + normal.z * fc.z) < 0 ? -1 : 1;
					let q0 = points2D[face[0]], q1 = points2D[face[1]], q2 = points2D[face[2]];
					let area = (q1.x - q0.x) * (q2.y - q0.y) - (q2.x - q0.x) * (q1.y - q0.y);
					return orient * area > 0;
				});

				// Матрица смежности: matrix[i][j] - ребро между точками i+1 и j,
				// значение-массив задаёт штрихи пунктира. У RegularPrism геттер
				// connectionMatrix возвращает неверный набор рёбер (лишние диагонали
				// боковых граней и отсутствие двух боковых рёбер, см. #3478), поэтому
				// матрицу строим сами: треугольники оснований и три боковых ребра.
				let matrix = [
					[1],
					[1, 1],
					[1, 0, 0],
					[0, 1, 0, 1],
					[0, 0, 1, 1, 1],
				];
				// Ребро и две смежные с ним грани: пунктир, когда невидимы обе.
				[[0, 0, 0, 2], [1, 0, 0, 4], [1, 1, 0, 3], [2, 0, 2, 4], [3, 1, 2, 3],
					[3, 3, 1, 2], [4, 2, 3, 4], [4, 3, 1, 4], [4, 4, 1, 3]].forEach(function (edge) {
					if (!facesVisible[edge[2]] && !facesVisible[edge[3]])
						matrix[edge[0]][edge[1]] = [6, 4];
				});

				ct.strokeStyle = om.secondaryBrandColors.iz();
				ct.lineWidth = 2;
				ct.drawFigure(points2D, matrix);

				// Подписи вершин: уводим от центра проекции наружу, как на официальном рисунке.
				let center = { x: 0, y: 0 };
				points2D.forEach(function (point) {
					center.x += point.x / points2D.length;
					center.y += point.y / points2D.length;
				});
				ct.fillStyle = om.primaryBrandColors.iz();
				ct.font = '20px liberation_sans';
				let put = function (point, letter, subscript) {
					let dx = point.x < center.x ? -22 : 8;
					let dy = point.y < center.y ? -10 : 22;
					ct.fillText(letter, point.x + dx, point.y + dy);
					if (subscript)
						ct.fillText(subscript, point.x + dx + 12, point.y + dy + 5);
				};
				for (let i = 0; i < 3; i++) {
					put(points2D[i], letters[i]);
					put(points2D[i + 3], letters[i], '₁');
				}
			},
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//510140
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=510140
