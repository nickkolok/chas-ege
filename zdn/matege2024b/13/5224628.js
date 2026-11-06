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

		// Чертёж пропорционален условию; рисует drawParallelepiped(). Ракурс,
		// как у ФИПИ: A спереди слева, B спереди справа, D сзади; видны верхняя,
		// передняя и правая грани. Номера вершин drawParallelepiped(): нижнее
		// основание 5, 6, 7, 4 (A, B, C, D), верхнее 1, 2, 3, 0 (A1, B1, C1, D1).
		// Ребро AB идёт по ширине, BC - вглубь, поэтому ребро xy - по ширине,
		// если x чётная, и вглубь, если нечётная.
		let base = [5, 6, 7, 4];
		let top = [1, 2, 3, 0];
		// Глубина в косоугольной проекции сокращена, как в 523577
		let depthRatio = 0.6;
		let angle = Math.PI / 4;

		let paint = function (ct) {
			let size = Math.max(a, b, h);
			let width = (x % 2 === 0 ? a : b) / size;
			let depth = depthRatio * (x % 2 === 0 ? b : a) / size;
			let height = h / size;
			let dx = depth * Math.cos(angle);
			let dy = depth / 2;
			// Вершины в тех же координатах, что и в drawParallelepiped()
			let vertex = [
				[dx, dy + height], [0, height], [width, height], [dx + width, dy + height],
				[dx, dy], [0, 0], [width, 0], [dx + width, dy],
			];
			let s = Math.min(300 / (width + dx), 240 / (height + dy));
			let originX = 200 - s * (width + dx) / 2;
			let originY = 160 + s * (height + dy) / 2;

			ct.save();
			ct.translate(originX, originY);
			ct.scale(s, -s);
			ct.lineWidth = 2 / s;
			// Пунктиром - невидимые рёбра при задней нижней вершине D (6, 8, 10)
			ct.drawParallelepiped({
				width: width,
				height: height,
				depth: depth,
				angle: angle,
				strokeStyle: om.secondaryBrandColors.iz(),
			}, [6, 8, 10], false, [7 / s, 5 / s]);
			// Диагональ боковой грани: грани AA1B1B и BB1C1C видны, CC1D1D и DD1A1A - нет
			ct.strokeStyle = om.primaryBrandColors.iz();
			ct.setLineDash(x >= 2 ? [7 / s, 5 / s] : []);
			ct.drawLine(vertex[base[x]][0], vertex[base[x]][1], vertex[top[y]][0], vertex[top[y]][1]);
			ct.setLineDash([]);
			ct.restore();

			// Подписи вершин: смещения в пикселях от вершины до начала надписи.
			// Задняя нижняя D и передняя верхняя B1 - внутри контура, их подписи -
			// вправо-вверх и вправо-вниз от вершины, как у ФИПИ
			let labelShift = [[-22, -4], [-22, 4], [6, 22], [6, -4], [6, -6], [-18, 20], [4, 22], [8, 14]];
			ct.fillStyle = om.secondaryBrandColors.iz();
			let put = function (v, letter, subscript) {
				let px = originX + s * vertex[v][0] + labelShift[v][0];
				let py = originY - s * vertex[v][1] + labelShift[v][1];
				ct.font = '20px liberation_sans';
				ct.fillText(letter, px, py);
				if (subscript) {
					ct.font = '14px liberation_sans';
					ct.fillText(subscript, px + 13, py + 5);
				}
			};
			for (let i = 0; i < 4; i++) {
				put(base[i], letters[i], '');
				put(top[i], letters[i], '1');
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
