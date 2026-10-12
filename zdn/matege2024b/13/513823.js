(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Три взаимно перпендикулярных ребра. Ни одно из них не обязано быть
		// кратным 6, и стоят они в любом порядке: у ФИПИ встречаются «4, 12 и 1»,
		// «4, 6 и 1», «2, 15 и 7». Для целого объёма достаточно, чтобы на 6
		// делилось произведение рёбер.
		let edges = [sl(1, 24), sl(1, 24), sl(1, 24)];
		let product = edges[0] * edges[1] * edges[2];
		genAssert(product % 6 === 0, 'Объём пирамиды должен быть целым');
		let V = product / 6;
		genAssert(V <= 250, 'Объём не должен быть громоздким');
		// Чертёж не должен вырождаться в «иглу» вроде 1, 1, 30 (md/task_geometry.md):
		// наибольшее ребро не более чем в 5 раз длиннее среднего. Самый вытянутый
		// набор ФИПИ (3, 5, 24) под это ограничение попадает.
		let sorted = edges.slice().sort((x, y) => x - y);
		genAssert(sorted[2] <= 5 * sorted[1], 'Пирамида не должна быть иглой');
		// Самое короткое ребро не короче двенадцатой части самого длинного
		// (у ФИПИ крайний случай - 1 и 12): иначе оно сливается с вершиной.
		genAssert(sorted[2] <= 12 * sorted[0], 'Самое короткое ребро не должно вырождаться в точку');
		let a = edges[0];
		let b = edges[1];
		let h = edges[2];

		// Две формулировки ФИПИ: с вершинами ABCD («рёбра AB, AC и AD взаимно
		// перпендикулярны», 14 задач из 16) и без букв («три ребра взаимно
		// перпендикулярны», 2 задачи). Буквы на чертеже - только в первой
		let key = '513823';
		let preference = ['withLetters', 'withoutLetters'];
		let withLetters = getSelectedPreferenceFromList(key, preference) === 0;
		// letters[0] - вершина прямых углов, letters[1..3] - концы рёбер a, b, h
		let letters = ['A', 'B', 'C', 'D'];

		let text, analys;
		if (withLetters) {
			text = 'В треугольной пирамиде $ABCD$ рёбра $AB$, $AC$ и $AD$ взаимно перпендикулярны. ' +
				'Найдите объём этой пирамиды, если $AB = ' + a + '$, $AC = ' + b + '$ и $AD = ' + h + '$.';
			analys = 'Рёбра $AB$ и $AC$ перпендикулярны, поэтому треугольник $ABC$ прямоугольный, его площадь равна $\\frac{' +
				a + ' \\cdot ' + b + '}{2} = ' + (a * b / 2) + '$. Ребро $AD$ перпендикулярно двум пересекающимся прямым $AB$ и $AC$ ' +
				'плоскости $ABC$, значит, перпендикулярно самой плоскости и является высотой пирамиды: $V = \\frac{1}{3} \\cdot ' +
				(a * b / 2) + ' \\cdot ' + h + ' = ' + V + '$.';
		} else {
			// В условии не сказано, что рёбра выходят из одной вершины; так они
			// расположены на рисунке (и только так понимается задача ФИПИ)
			text = 'В треугольной пирамиде три ребра взаимно перпендикулярны, а их длины равны $' +
				a + '$, $' + b + '$ и $' + h + '$. Найдите объём этой пирамиды.';
			analys = 'Как видно на рисунке, три взаимно перпендикулярных ребра выходят из одной вершины. Два из них, $' + a +
				'$ и $' + b + '$, лежат в одной грани и образуют прямоугольный ' +
				'треугольник площадью $\\frac{' + a + ' \\cdot ' + b + '}{2} = ' + (a * b / 2) +
				'$; третье перпендикулярно двум пересекающимся прямым плоскости этой грани, значит, перпендикулярно ' +
				'самой плоскости и является высотой пирамиды: $V = \\frac{1}{3} \\cdot ' + (a * b / 2) +
				' \\cdot ' + h + ' = ' + V + '$.';
		}

		// Класс из lib/figure.js: три взаимно перпендикулярных ребра выходят из вершины 0.
		// Вершины 0, 1, 2 - основание (прямой угол в 0), вершина 3 - над вершиной 0.
		// Все три ребра равноправны, поэтому их роли на чертеже выбираем ради
		// читаемости: высотой служит среднее по длине ребро, катетами основания -
		// крайние (буквы вершин при этом ставятся по длинам рёбер из условия).
		// Самое длинное ребро - катет sideA: при выбранном ракурсе он уходит
		// вглубь, а короткий катет ложится поперёк луча зрения и не сжимается
		// в точку (иначе при «1 и 12» две вершины и их буквы сливались).
		// Если высотой сделать самое короткое ребро, пирамида при взгляде чуть
		// сверху сплющивается в полоску; если самое длинное - тянется в иглу.
		let pyramid = new RectangularPyramidWithRightAngledTriangleAtBase({
			height: sorted[1],
			sideA: sorted[2],
			sideB: sorted[0],
		});

		// Вершины берём у класса: после #3474 findTriangleVertices() центрирует основание
		// только в его плоскости, поэтому z основания (-h/2) и вершины (+h/2) верны сами по себе.
		let vertices = pyramid.verticesOfFigure;
		// Какое ребро условия (0 - a, 1 - b, 2 - h) изображено каким отрезком:
		// вершина 1 - конец самого длинного, 2 - самого короткого, 3 - среднего
		let byLength = [0, 1, 2].sort((i, j) => edges[i] - edges[j]);
		let edgeAtVertex = [null, byLength[2], byLength[0], byLength[1]];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,
			rotationX: -Math.PI / 2 + Math.PI / 9,
			rotationY: 0,
			// Ракурс подобран так, чтобы вершина прямого угла смотрела на зрителя:
			// при rotationZ = PI/10 калиброванная видимость прятала саму вершину 0
			// и все три перпендикулярных ребра уходили в пунктир, а при 4PI/3
			// скрытым оказывается одно ребро основания, не инцидентное вершине 0.
			rotationZ: 4 * Math.PI / 3,
		};
		autoScale(vertices, camera, vertices.map((vertex) => project3DTo2D(vertex, camera)), {
			startX: -150,
			finishX: 150,
			startY: -150,
			finishY: 150,
			maxScale: 200,
		});
		let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));
		// Центрируем проекцию на холсте: пирамида несимметрична, и без сдвига
		// она прижимается к одному краю
		let shiftX = (Math.min(...points2D.map((p) => p.x)) + Math.max(...points2D.map((p) => p.x))) / 2;
		let shiftY = (Math.min(...points2D.map((p) => p.y)) + Math.max(...points2D.map((p) => p.y))) / 2;
		points2D = points2D.map((p) => ({ x: p.x - shiftX, y: p.y - shiftY }));

		// Видимость граней tetraэдра - по знаку ориентированной площади проекции
		// (приём откалиброван на одобренном 513803.js). Нормаль грани ориентируем
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
			// Знак площади берём от обхода, согласованного с ВНЕШНЕЙ нормалью:
			// если перечисление вершин грани даёт нормаль внутрь, площадь берём с минусом.
			// Признак откалиброван на одобренном 513803.js: для его камеры и пирамиды
			// он даёт ровно одно скрытое ребро (0,1) - то самое, что в том шаблоне
			// зашито как matrixPyr[0][0] = [5, 3].
			let orient = (n.x * fc.x + n.y * fc.y + n.z * fc.z) < 0 ? -1 : 1;
			let q0 = points2D[f[0]], q1 = points2D[f[1]], q2 = points2D[f[2]];
			let area = (q1.x - q0.x) * (q2.y - q0.y) - (q2.x - q0.x) * (q1.y - q0.y);
			return orient * area > 0;
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

			if (withLetters) {
				// Буквы - снаружи от вершин, по лучу из центра проекции
				ctx.fillStyle = ctx.strokeStyle;
				ctx.font = '20px liberation_sans';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				let center = {
					x: points2D.reduce((sum, p) => sum + p.x, 0) / 4,
					y: points2D.reduce((sum, p) => sum + p.y, 0) / 4,
				};
				let labels = points2D.map(function (p, i) {
					let dx = p.x - center.x;
					let dy = p.y - center.y;
					let length = Math.sqrt(dx * dx + dy * dy) || 1;
					return {
						text: i === 0 ? letters[0] : letters[1 + edgeAtVertex[i]],
						x: p.x + 18 * dx / length,
						y: p.y + 18 * dy / length,
					};
				});
				// Короткий катет (у ФИПИ бывает 1 при 12) сводит две вершины почти
				// в точку, и буквы налезают друг на друга - раздвигаем их
				for (let step = 0; step < 20; step++) {
					for (let i = 0; i < 4; i++) {
						for (let j = i + 1; j < 4; j++) {
							let dx = labels[j].x - labels[i].x;
							let dy = labels[j].y - labels[i].y;
							let d = Math.sqrt(dx * dx + dy * dy);
							if (d >= 24) {
								continue;
							}
							if (d < 1e-6) {
								dx = points2D[j].x - points2D[i].x;
								dy = points2D[j].y - points2D[i].y;
								d = Math.sqrt(dx * dx + dy * dy) || 1;
							}
							let push = (24 - d) / 2;
							labels[i].x -= push * dx / d;
							labels[i].y -= push * dy / d;
							labels[j].x += push * dx / d;
							labels[j].y += push * dy / d;
						}
					}
				}
				labels.forEach(function (label) {
					ctx.fillText(label.text, label.x, label.y);
				});
			}
		};

		NAtask.setTask({
			text: text,
			analys: analys,
			answers: V,
			authors: ['chas-ege-selena'],
			preference: [preference],
		});
		if (withLetters) {
			// V в решении - объём, а не вершина: его не переименовываем
			NAtask.modifiers.variativeABC(letters, { preserve: ['V'] });
		}
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
//513823
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=513823
