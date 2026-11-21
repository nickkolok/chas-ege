(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// «С»-образная деталь a × d × h: между нижней и верхней плитами
		// во всю ширину вырезана выемка глубиной g и высотой e.
		// Толщины плит на площадь поверхности не влияют и на рисунке не подписаны.
		let a = sl(2, 6);
		let d = sl(2, 6);
		let g = sl(1, d - 1);
		let e = sl(2, 5);
		let t1 = sl(1, 2);
		let t2 = sl(1, 2);
		let h = t1 + e + t2;

		let detail = new RectilinearSolid([
			[0, 0, 0, a, d, t1],
			[0, g, t1, a, d, t1 + e],
			[0, 0, t1 + e, a, d, h],
		]);

		let paint1 = function (ct) {
			ct.drawRectilinearSolid(detail, {
				width: 300,
				height: 300,
				labels: [
					{ from: [0, 0, h], to: [0, d, h], text: d },
					{ from: [0, d, h], to: [a, d, h], text: a },
					{ from: [a, d, 0], to: [a, d, h], text: h, direction: [1, 0] },
					{ from: [a, g, t1], to: [a, g, t1 + e], text: e, direction: [-1, 0] },
					{ from: [0, 0, t1], to: [0, g, t1], text: g, direction: [-1, 0] },
				],
			});
		};

		NAtask.setTask({
			text: 'Деталь имеет форму изображённого на рисунке многогранника (все двугранные углы прямые). ' +
				'Числа на рисунке обозначают длины рёбер в сантиметрах. ' +
				'Найдите площадь поверхности этой детали. Ответ дайте в квадратных сантиметрах.',
			answers: detail.surfaceArea(),
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=507961
// https://mathb-ege.sdamgia.ru/problem?id=508045
// https://mathb-ege.sdamgia.ru/problem?id=510029
// Открытый банк ФИПИ: 4FA3F3, 6DF52F, D9E5CF
