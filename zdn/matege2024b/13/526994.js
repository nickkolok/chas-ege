(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '526994';
		let preference = ['two_legs', 'leg_and_hypotenuse'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Данные - в тех же пределах, что у ФИПИ. Даны два катета (C60E1D):
		// «3 и 16», «13 и 4», «5 и 7», «2 и 18», «11 и 5», высота от 3 до 5.
		// Даны катет и гипотенуза (490442): катет от 2 до 6, второй катет
		// от 2 до 7, высота от 2 до 7.
		let a, b;
		if (rand === 0) {
			a = sl(2, 18);
			b = sl(2, 18);
		} else {
			a = sl(2, 6);
			b = sl(2, 7);
		}
		let h = sl(2, 7);
		// Объём a * b * h / 2 - целый: чётным должно быть произведение, а не
		// обязательно один из катетов (у ФИПИ есть «5 и 7» при высоте 4)
		genAssert(a * b * h % 2 === 0, 'Объём призмы должен быть целым');
		// Основание не должно вырождаться в полоску: катеты отличаются не более
		// чем в 9 раз (крайний случай ФИПИ - «2 и 18»)
		genAssert(Math.max(a, b) <= 9 * Math.min(a, b), 'Основание не должно быть узкой полоской');

		// Призма с прямоугольным треугольником в основании (класс из lib/figure.js);
		// прямой угол - при вершине 0, вершина 3 - над ней
		let prism = new RectangularPrismWithRightAngledTriangleAtBase({
			height: h,
			sideA: a,
			sideB: b,
		});

		let S = a * b / 2;
		let V = S * h;
		genAssert(Math.abs(prism.volume - V) < 1e-6, 'Объём должен совпасть с вычисленным через класс');

		let c2 = a * a + b * b;
		let cLatex = c2.texsqrt(true);
		// Квадрат гипотенузы в решении: целую (3, 4, 5) пишем без скобок
		let cSquaredLatex = Math.sqrt(c2).isAlmostInteger() ? cLatex + '^2' : '\\left(' + cLatex + '\\right)^2';

		let textOptions = [
			'В основании прямой призмы лежит прямоугольный треугольник, катеты которого равны $' + a + '$ и $' + b + '$. ',
			'В основании прямой призмы лежит прямоугольный треугольник, один из катетов которого равен $' + a +
				'$, а гипотенуза равна $' + cLatex + '$. ',
		];
		let analysOptions = [
			'Площадь прямоугольного треугольника равна половине произведения катетов: $S = \\frac{' + a + ' \\cdot ' + b + '}{2} = ' + S + '$. ',
			'По теореме Пифагора второй катет равен $\\sqrt{' + cSquaredLatex + ' - ' + a + '^2} = \\sqrt{' + c2 + ' - ' + a * a +
				'} = \\sqrt{' + b * b + '} = ' + b + '$. Площадь основания: $S = \\frac{' + a + ' \\cdot ' + b + '}{2} = ' + S + '$. ',
		];

		let text = textOptions[rand] + 'Найдите объём призмы, если её высота равна $' + h + '$.';
		let analys = analysOptions[rand] + 'Объём призмы: $V = S \\cdot h = ' + S + ' \\cdot ' + h + ' = ' + V + '$.';

		// Вершины нормируем на наибольший размер: autoScale() начинает с масштаба 5
		// и отбраковывает фигуру, которая уже на старте не помещается в холст
		let size = Math.max(a, b, h);
		let vertices = prism.verticesOfFigure.map((p) => ({ x: p.x / size, y: p.y / size, z: p.z / size }));

		// Вид спереди-сверху, как в соседних шаблонах папки (513823, 514225).
		// Поворот выбран так, что вершина прямого угла ближе всего к зрителю,
		// а оба катета уходят от неё назад (влево и вправо), гипотенуза - сзади:
		// треугольник основания не схлопывается ни при каких катетах.
		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,
			rotationX: -Math.PI / 2 + Math.PI / 8,
			rotationY: 0,
			rotationZ: 7 * Math.PI / 6,
		};
		autoScale(vertices, camera, vertices.map((vertex) => project3DTo2D(vertex, camera)), {
			startX: -160,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 400,
		});
		// project3DTo2D уже умножает на camera.scale - повторно масштабировать не нужно
		let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));
		// Центрируем проекцию на холсте
		let shiftX = (Math.min(...points2D.map((p) => p.x)) + Math.max(...points2D.map((p) => p.x))) / 2;
		let shiftY = (Math.min(...points2D.map((p) => p.y)) + Math.max(...points2D.map((p) => p.y))) / 2;
		let project = function (p) {
			let q = project3DTo2D(p, camera);
			return { x: q.x - shiftX, y: q.y - shiftY };
		};
		points2D = vertices.map(project);

		// Видимость граней - по знаку ориентированной площади проекции при обходе,
		// согласованном с внешней нормалью (приём из 513823 и 514225). Ребро
		// невидимо (пунктир), если невидимы обе смежные грани.
		let centroid = {
			x: vertices.reduce((s, v) => s + v.x, 0) / 6,
			y: vertices.reduce((s, v) => s + v.y, 0) / 6,
			z: vertices.reduce((s, v) => s + v.z, 0) / 6,
		};
		let faces = [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]];
		let facesVisible = faces.map(function (f) {
			let p0 = vertices[f[0]], p1 = vertices[f[1]], p2 = vertices[f[2]];
			let u = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
			let w = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };
			let n = { x: u.y * w.z - u.z * w.y, y: u.z * w.x - u.x * w.z, z: u.x * w.y - u.y * w.x };
			let fc = { x: 0, y: 0, z: 0 };
			f.forEach(function (i) {
				fc.x += vertices[i].x / f.length;
				fc.y += vertices[i].y / f.length;
				fc.z += vertices[i].z / f.length;
			});
			let orient = (n.x * (fc.x - centroid.x) + n.y * (fc.y - centroid.y) + n.z * (fc.z - centroid.z)) < 0 ? -1 : 1;
			let q0 = points2D[f[0]], q1 = points2D[f[1]], q2 = points2D[f[2]];
			return orient * ((q1.x - q0.x) * (q2.y - q0.y) - (q2.x - q0.x) * (q1.y - q0.y)) > 0;
		});
		let edges = [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [0, 3], [1, 4], [2, 5]];
		let isHidden = function (edge) {
			return !faces.some(function (f, k) {
				return facesVisible[k] && f.includes(edge[0]) && f.includes(edge[1]) &&
					(Math.abs(f.indexOf(edge[0]) - f.indexOf(edge[1])) === 1 ||
					Math.abs(f.indexOf(edge[0]) - f.indexOf(edge[1])) === f.length - 1);
			});
		};
		let dash = [7, 5];

		// Отметка прямого угла - на верхнем основании (оно видно при взгляде сверху),
		// при вершине 3 между рёбрами 3-4 и 3-5; точки строятся в пространстве
		// и проецируются той же камерой, что и вершины
		let v3 = vertices[3], v4 = vertices[4], v5 = vertices[5];
		let unit = function (p, q) {
			let d = Math.sqrt((q.x - p.x) ** 2 + (q.y - p.y) ** 2 + (q.z - p.z) ** 2);
			return { x: (q.x - p.x) / d, y: (q.y - p.y) / d, z: (q.z - p.z) / d };
		};
		let d1 = unit(v3, v4), d2 = unit(v3, v5);
		let t = 0.15 * Math.min(a, b) / size;
		let markPoint = function (k1, k2) {
			return project({ x: v3.x + t * (k1 * d1.x + k2 * d2.x), y: v3.y + t * (k1 * d1.y + k2 * d2.y), z: v3.z + t * (k1 * d1.z + k2 * d2.z) });
		};
		let q1 = markPoint(1, 0), q2 = markPoint(1, 1), q3 = markPoint(0, 1);

		let paint1 = function (ctx) {
			ctx.translate(200, 200);
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.lineWidth = 2;
			edges.forEach(function (edge) {
				ctx.setLineDash(isHidden(edge) ? dash : []);
				ctx.drawLine(points2D[edge[0]].x, points2D[edge[0]].y, points2D[edge[1]].x, points2D[edge[1]].y);
			});
			ctx.setLineDash([]);
			ctx.lineWidth = 1.5;
			ctx.drawLine(q1.x, q1.y, q2.x, q2.y);
			ctx.drawLine(q2.x, q2.y, q3.x, q3.y);
		};

		NAtask.setTask({
			text: text,
			analys: analys,
			answers: V,
			authors: ['Zer00Player', 'chas-ege-selena'],
			preference: [preference],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		// При нечётном произведении катетов площадь основания дробная (4,5 и т.п.)
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
//526994
//Zer00Player, chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=526994
