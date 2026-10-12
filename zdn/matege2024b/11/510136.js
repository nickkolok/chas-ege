(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510136';
		let preferenceQuestion = ['объём', 'площадь поверхности'];
		let question = preferenceQuestion[getSelectedPreferenceFromList(key, preferenceQuestion)];

		// Параллелепипед a × d × h, у которого спереди справа
		// по всей высоте вырезан параллелепипед w × s.
		let a = sl(2, 6);
		let w = sl(1, a - 1);
		let d = sl(2, 6);
		let s = sl(1, d - 1);
		let h = sl(2, 6);

		let detail = new RectilinearSolid([
			[0, 0, 0, a - w, d, h],
			[a - w, s, 0, a, d, h],
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
					{ from: [a - w, 0, 0], to: [a - w, s, 0], text: s, direction: [0, 1] },
					{ from: [a - w, s, 0], to: [a, s, 0], text: w, direction: [0, 1] },
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
// https://mathb-ege.sdamgia.ru/problem?id=510136
// https://mathb-ege.sdamgia.ru/problem?id=528649
// https://mathb-ege.sdamgia.ru/problem?id=511600
// https://mathb-ege.sdamgia.ru/problem?id=525151
// Открытый банк ФИПИ: EE651B, 0F67EF, 1B4F93
