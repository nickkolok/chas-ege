(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 10);
		let b = sl(1, 10);
		let c = 6 * sl(1, 5);
		let V = a * b * (c / 6);

		let paint1 = function (ct) {
			// Сдвигаем начало координат в центр холста для лучшего центрирования фигуры
			ct.translate(180, 220);
			// Увеличиваем масштаб с 15 до 40, чтобы рисунок стал заметно крупнее
			ct.scale(40, 40);
			// Пропорционально увеличиваем толщину линий, чтобы они не стали слишком тонкими
			ct.lineWidth = 3 / 40;
			
			// Координаты вершин относительно вершины с прямыми углами (0, 0)
			let x1 = 3.5, y1 = 0;      // Правое ребро (горизонтальное)
			let x2 = -2, y2 = 2.5;     // Нижнее левое ребро
			let x3 = 0, y3 = -3.5;     // Верхнее ребро (вертикальное)
			
			ct.beginPath();
			// Рёбра, выходящие из вершины с прямыми углами
			ct.moveTo(0, 0);
			ct.lineTo(x1, y1);
			ct.moveTo(0, 0);
			ct.lineTo(x2, y2);
			ct.moveTo(0, 0);
			ct.lineTo(x3, y3);
			
			// Рёбра основания (соединяют концы выходящих рёбер)
			ct.moveTo(x1, y1);
			ct.lineTo(x2, y2);
			ct.moveTo(x2, y2);
			ct.lineTo(x3, y3);
			ct.moveTo(x3, y3);
			ct.lineTo(x1, y1);
			
			ct.strokeStyle = om.secondaryBrandColors;
			ct.stroke();
			
			// Знак прямого угла между горизонтальным и вертикальным рёбрами
			ct.beginPath();
			ct.moveTo(0.6, 0);
			ct.lineTo(0.6, -0.6);
			ct.lineTo(0, -0.6);
			ct.stroke();
		};

		NAtask.setTask({
			text: 'В треугольной пирамиде три ребра взаимно перпендикулярны, а их длины равны $' + a + '$, $' + b + '$ и $' + c + '$. Найдите объём этой пирамиды.',
			answers: V,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=513823
