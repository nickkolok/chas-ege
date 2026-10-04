(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 12);
		let b = sl(2, 12);
		let h = sl(2, 12);

		// Стереометрия через библиотечный класс: объём считаем не вручную, а через свойство класса
		let pyramid = new RectangularPyramidWithRectangleAtBase({ height: h, sideA: a, sideB: b });
		let V = pyramid.volume;
		genAssertZ1000(V, 'Объём должен быть хорошей десятичной дробью');

		// Пирамида для чертежа (фиксированные пропорции, чертёж схематический)
		let drawPyramid = new RectangularPyramidWithRectangleAtBase({ height: 2.5, sideA: 2.5, sideB: 1.8 });
		let vertices3D = drawPyramid.verticesOfFigure;

		// Вершина пирамиды (индекс 4) должна стоять над центром основания
		vertices3D[4].x = 0;
		vertices3D[4].y = 0;

		// Камера: вид спереди-сверху-сбоку, как на эталонном рисунке
		let camera = {
			x: 0, y: 0, z: 0,
			rotationX: -70 * Math.PI / 180,
			rotationY: 0,
			rotationZ: 30 * Math.PI / 180,
			scale: 60,
		};
		let vertices2D = vertices3D.map(v => project3DTo2D(v, camera));

		// Самая дальняя вершина основания проецируется выше всех — из неё выходят невидимые рёбра
		let hidden = 0;
		for (let i = 1; i < 4; i++)
			if (vertices2D[i].y < vertices2D[hidden].y)
				hidden = i;

		// Ребро невидимо, если инцидентно дальней вершине основания
		let e = function (i, j) {
			let invisible = (i === hidden || j === hidden) && !(i === 4 && j === 4) &&
				((i < 4 && j < 4) || i === 4 || j === 4) &&
				(i === hidden || j === hidden) && (i !== j) &&
				(Math.abs(i - j) === 1 || Math.abs(i - j) === 3 || i === 4 || j === 4);
			return invisible ? [4, 3] : 1;
		};

		// Матрица связей пирамиды: 1 — сплошное ребро, [4,3] — пунктирное
		let matrix = [
			[e(1, 0)],
			[0, e(2, 1)],
			[e(3, 0), 0, e(3, 2)],
			[e(4, 0), e(4, 1), e(4, 2), e(4, 3)],
		];

		let paint = function (ct) {
			ct.translate(200, 185);
			ct.lineWidth = 2;
			ct.strokeStyle = '#000';

			// Рёбра пирамиды (пунктир задаётся матрицей связей)
			ct.drawFigure(vertices2D, matrix);

			// Высота пирамиды: пунктиром от центра основания к вершине
			let centerX = (vertices2D[0].x + vertices2D[1].x + vertices2D[2].x + vertices2D[3].x) / 4;
			let centerY = (vertices2D[0].y + vertices2D[1].y + vertices2D[2].y + vertices2D[3].y) / 4;
			ct.setLineDash([4, 3]);
			ct.drawLine(centerX, centerY, vertices2D[4].x, vertices2D[4].y);
			ct.setLineDash([0, 0]);
		};

		NAtask.setTask({
			text: 'Основанием четырёхугольной пирамиды является прямоугольник со сторонами $' + a + '$ и $' + b + '$. Найдите высоту этой пирамиды, если её объём равен $' + V + '$.',
			answers: h,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=73837
