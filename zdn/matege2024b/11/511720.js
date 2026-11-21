(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '511720';
		let preferenceQuestion = ['объём', 'площадь поверхности'];
		let question = preferenceQuestion[getSelectedPreferenceFromList(key, preferenceQuestion)];

		// Деталь с Г-образной передней гранью: высокая часть шириной b и высотой h
		// и низкая часть высотой c; общая ширина a, глубина d.
		let a = sl(2, 6);
		let b = sl(1, a - 1);
		let h = sl(2, 6);
		let c = sl(1, h - 1);
		let d = sl(1, 5);

		let detail = new RectilinearSolid([
			[0, 0, 0, b, d, h],
			[b, 0, 0, a, d, c],
		]);

		let answer = question === 'объём' ? detail.volume() : detail.surfaceArea();

		let paint1 = function (ct) {
			ct.drawRectilinearSolid(detail, {
				width: 300,
				height: 300,
				labels: [
					{ from: [0, d, h], to: [b, d, h], text: b },
					{ from: [0, 0, h], to: [0, d, h], text: d },
					{ from: [b, d, c], to: [b, d, h], text: h - c, direction: [1, 0] },
					{ from: [0, 0, 0], to: [0, 0, h], text: h },
					{ from: [a, d, 0], to: [a, d, c], text: c },
					{ from: [0, 0, 0], to: [a, 0, 0], text: a },
				],
			});
		};

		NAtask.setTask({
			text: 'Деталь имеет форму изображённого на рисунке многогранника (все двугранные углы прямые). ' +
				'Числа на рисунке обозначают длины рёбер в сантиметрах. ' +
				'Найдите ' + question + ' этой детали. ' +
				'Ответ дайте в ' + (question === 'объём' ? 'кубических' : 'квадратных') + ' сантиметрах.',
			answers: answer,
			preference: [preferenceQuestion],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=511720
// https://mathb-ege.sdamgia.ru/problem?id=511740
// https://mathb-ege.sdamgia.ru/problem?id=507938
// Открытый банк ФИПИ: 02985D, 2D7A61, 450281
