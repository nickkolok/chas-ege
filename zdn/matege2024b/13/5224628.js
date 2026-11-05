(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// В прямоугольном параллелепипеде ABCDA1B1C1D1 даны два ребра основания
		// из одной вершины и диагональ боковой грани из той же вершины. У ФИПИ
		// (4FB8B4, 46FCAD, 696914, 66CF10 и др.) - четыре варианта букв: рёбра AB,
		// AD и диагональ AB1; BC, BA и BC1; CD, CB и CD1; DA, DC и DA1. Рёбра
		// основания - от 2 до 7, высота (её надо найти) - от 2 до 6.
		let letters = ['A', 'B', 'C', 'D'];
		let x = sl(0, 3);          // вершина, из которой выходят рёбра и диагональ
		let y = (x + 1) % 4;       // конец первого ребра; диагональ идёт к y1
		let z = (x + 3) % 4;       // конец второго ребра
		let a = sl(2, 7);          // ребро xy
		let b = sl(2, 7);          // ребро xz
		let h = sl(2, 6);          // боковое ребро
		let d2 = a * a + h * h;    // квадрат диагонали xy1
		let dTex = d2.texsqrt(true);
		let V = a * b * h;

		let X = letters[x], Y = letters[y], Z = letters[z];
		let text = 'В прямоугольном параллелепипеде $ABCDA_1B_1C_1D_1$ рёбра $' + X + Y + '$, $' + X + Z +
			'$ и диагональ $' + X + Y + '_1$ боковой грани равны соответственно $' + a + '$, $' + b +
			'$ и $' + dTex + '$. Найдите объём параллелепипеда.';
		let analys = 'Боковое ребро $' + Y + Y + '_1$ перпендикулярно основанию, поэтому треугольник $' + X + Y + Y +
			'_1$ прямоугольный с прямым углом при вершине $' + Y + '$, и $' + Y + Y + '_1 = \\sqrt{' + X + Y + '_1^2 - ' + X + Y +
			'^2} = \\sqrt{' + d2 + ' - ' + a * a + '} = ' + h + '$. Объём прямоугольного параллелепипеда равен произведению ' +
			'трёх его измерений: $V = ' + X + Y + ' \\cdot ' + X + Z + ' \\cdot ' + Y + Y + '_1 = ' + a + ' \\cdot ' + b +
			' \\cdot ' + h + ' = ' + V + '$.';

		NAtask.setTask({
			text: text,
			answers: V,
			analys: analys,
			authors: ['chas-ege-ellariya'],
		});
		// V в решении - обозначение объёма, а не вершина: её не переставляем
		NAtask.modifiers.variativeABC(letters, { preserve: ['V'] });

		// Чертёж пропорционален условию. В Parallelepiped вершины основания 0-3
		// идут по кругу, ребро 0-1 - вдоль оси x (ширина), 1-2 - вдоль оси y
		// (глубина); над вершиной i стоит вершина top[i]. Ребро xy вдоль оси x,
		// если x чётная, и вдоль оси y, если нечётная.
		let size = Math.max(a, b, h);
		let box = new Parallelepiped({
			width: (x % 2 === 0 ? a : b) / size,
			depth: (x % 2 === 0 ? b : a) / size,
			height: h / size,
		});
		let vertices = box.verticesOfFigure;
		let top = [5, 6, 7, 4];
		// Ракурс, как у ФИПИ: A спереди слева, B спереди справа, D сзади;
		// видны верхняя, передняя и правая грани
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
			startY: -120,
			finishY: 120,
			maxScale: 200,
		});
		let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));
		let shiftX = (Math.min(...points2D.map((p) => p.x)) + Math.max(...points2D.map((p) => p.x))) / 2;
		let shiftY = (Math.min(...points2D.map((p) => p.y)) + Math.max(...points2D.map((p) => p.y))) / 2;
		points2D = points2D.map((p) => ({ x: p.x - shiftX, y: p.y - shiftY }));

		let faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 6, 5], [1, 2, 7, 6], [2, 3, 4, 7], [3, 0, 5, 4]];
		let visibility = facesVisibility(vertices, points2D, faces);
		let dash = [7, 5];
		let matrix = dashHiddenEdges(box.connectionMatrix, faces, visibility, dash);
		let diagonalHidden = !isOnVisibleFace(faces, visibility, [x, top[y]]);

		let paint = function (ct) {
			ct.translate(200, 160);
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.drawFigure(points2D, matrix);

			// Диагональ боковой грани
			ct.strokeStyle = om.primaryBrandColors.iz();
			ct.setLineDash(diagonalHidden ? dash : []);
			ct.drawLine(points2D[x].x, points2D[x].y, points2D[top[y]].x, points2D[top[y]].y);
			ct.setLineDash([]);

			// Подписи вершин - снаружи, по лучу из центра чертежа. У вершин, чья
			// проекция внутри контура (задняя нижняя и передняя верхняя), снаружи
			// места нет: их подписи - вправо-вверх и вправо-вниз от вершины, как у ФИПИ
			let onHull = function (point) {
				let others = points2D.filter((q) => q !== point);
				for (let k = 0; k < 72; k++) {
					let nx = Math.cos(k * Math.PI / 36);
					let ny = Math.sin(k * Math.PI / 36);
					if (others.every((q) => (q.x - point.x) * nx + (q.y - point.y) * ny < -1e-6)) {
						return true;
					}
				}
				return false;
			};
			ct.fillStyle = om.secondaryBrandColors.iz();
			ct.font = '20px liberation_sans';
			let put = function (point, letter, subscript, isTop) {
				let len = Math.hypot(point.x, point.y) || 1;
				let px = point.x + 16 * point.x / len - 7;
				let py = point.y + 16 * point.y / len + 7;
				if (!onHull(point)) {
					px = point.x + 6;
					py = isTop ? point.y + 22 : point.y - 6;
				}
				ct.fillText(letter, px, py);
				if (subscript) {
					ct.font = '14px liberation_sans';
					ct.fillText(subscript, px + 13, py + 5);
					ct.font = '20px liberation_sans';
				}
			};
			for (let i = 0; i < 4; i++) {
				put(points2D[i], letters[i], '', false);
				put(points2D[top[i]], letters[i], '1', true);
			}
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 320,
			paint: paint,
		});
	}, 1000);
})();
//5224628
//Открытый банк заданий 4FB8B4, 46FCAD, 696914, 66CF10, A595C7, EA4433, C1234A, 259B36, 1CFDD1 и дубли
//chas-ege-ellariya
