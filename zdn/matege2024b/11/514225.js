(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Фиксированные параметры для рисунка
		let drawSide = 24;   // сторона для отрисовки
		let drawHeight = 25; // уменьшенная высота для менее вытянутого рисунка
		
		// Набор пифагоровых троек для генерации вариантов задачи
		let triples = [
			{ halfBase: 5, apothem: 12, edge: 13 },
			{ halfBase: 8, apothem: 15, edge: 17 },
			{ halfBase: 7, apothem: 24, edge: 25 },
			{ halfBase: 12, apothem: 35, edge: 37 },
			{ halfBase: 9, apothem: 40, edge: 41 },
			{ halfBase: 20, apothem: 21, edge: 29 }
		];

		let t = triples.iz();
		let a = t.halfBase * 2;
		let l = t.edge;
		let h = t.apothem;

		let S_bok = 6 * 0.5 * a * h;

		let paint1 = function (ct) {
			ct.translate(200, 190);
			ct.scale(6, 6);
			ct.lineWidth = 1.5 / 6;

			let side = drawSide;
			let height = drawHeight;
			let k = Math.sqrt(3) / 2;

			let p1 = [-side / 2, side * 0.2];
			let p2 = [-side / 4, side * 0.2 + side * k * 0.5];
			let p3 = [side / 4, side * 0.2 + side * k * 0.5];
			let p4 = [side / 2, side * 0.2];
			let p5 = [side / 4, side * 0.2 - side * k * 0.5];
			let p6 = [-side / 4, side * 0.2 - side * k * 0.5];
			let apex = [0, -height + side * 0.2];

			// Невидимые рёбра (пунктир) - только задние
			ct.setLineDash([3 / 6, 2 / 6]);
			ct.beginPath();
			ct.moveTo(p6[0], p6[1]); ct.lineTo(apex[0], apex[1]);
			ct.moveTo(p5[0], p5[1]); ct.lineTo(apex[0], apex[1]);
			ct.stroke();
			ct.setLineDash([]);

			// Видимый контур основания
			ct.beginPath();
			ct.moveTo(p1[0], p1[1]);
			ct.lineTo(p2[0], p2[1]);
			ct.lineTo(p3[0], p3[1]);
			ct.lineTo(p4[0], p4[1]);
			ct.stroke();
			
			// Невидимая часть основания (пунктир)
			ct.setLineDash([3 / 6, 2 / 6]);
			ct.beginPath();
			ct.moveTo(p4[0], p4[1]);
			ct.lineTo(p5[0], p5[1]);
			ct.lineTo(p6[0], p6[1]);
			ct.lineTo(p1[0], p1[1]);
			ct.stroke();
			ct.setLineDash([]);

			// Видимые боковые рёбра (включая левое p1)
			ct.beginPath();
			ct.moveTo(p1[0], p1[1]); ct.lineTo(apex[0], apex[1]);
			ct.moveTo(p2[0], p2[1]); ct.lineTo(apex[0], apex[1]);
			ct.moveTo(p3[0], p3[1]); ct.lineTo(apex[0], apex[1]);
			ct.moveTo(p4[0], p4[1]); ct.lineTo(apex[0], apex[1]);
			ct.stroke();
		};

		NAtask.setTask({
			text: 'Сторона основания правильной шестиугольной пирамиды равна $' + a + '$, боковое ребро равно $' + l + '$. Найдите площадь боковой поверхности этой пирамиды.',
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
