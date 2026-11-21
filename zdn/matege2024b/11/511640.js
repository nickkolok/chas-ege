(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '511640';
		let preferenceQuestion = ['объём', 'площадь поверхности'];
		let question = preferenceQuestion[getSelectedPreferenceFromList(key, preferenceQuestion)];

		// Плита a × d × h, у которой спереди вырезан паз шириной w и глубиной s.
		let a = sl(3, 7);
		let w = sl(1, a - 2);
		let p = sl(1, a - w - 1);
		let d = sl(2, 6);
		let s = sl(1, d - 1);
		let h = sl(1, 2);

		let detail = new RectilinearSolid([
			[0, 0, 0, p, d, h],
			[p, s, 0, p + w, d, h],
			[p + w, 0, 0, a, d, h],
		]);

		let answer = question === 'объём' ? detail.volume() : detail.surfaceArea();

		let paint1 = function (ct) {
			ct.drawRectilinearSolid(detail, {
				width: 300,
				height: 300,
				labels: [
					{ from: [0, 0, h], to: [0, d, h], text: d },
					{ from: [0, d, h], to: [a, d, h], text: a },
					{ from: [0, 0, 0], to: [0, 0, h], text: h },
					{ from: [p, s, h], to: [p + w, s, h], text: w, direction: [0, 1] },
					{ from: [p, 0, 0], to: [p, s, 0], text: s, direction: [0, 1] },
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
// https://mathb-ege.sdamgia.ru/problem?id=511640
// Открытый банк ФИПИ: 86869F, 6E952C, 2422CC
