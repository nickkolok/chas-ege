(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '508004';
		let preferenceQuestion = ['объём', 'площадь поверхности'];
		let question = preferenceQuestion[getSelectedPreferenceFromList(key, preferenceQuestion)];

		// Параллелепипед a × d × h, к правой грани которого на всю глубину
		// приставлен выступ шириной w и высотой e, не касающийся верха и низа.
		let a = sl(1, 4);
		let d = sl(1, 5);
		let h = sl(3, 7);
		let e = sl(1, h - 2);
		let q = sl(1, h - e - 1);
		let w = sl(1, 4);

		let detail = new RectilinearSolid([
			[0, 0, 0, a, d, h],
			[a, 0, q, a + w, d, q + e],
		]);

		let answer = question === 'объём' ? detail.volume() : detail.surfaceArea();

		let paint1 = function (ct) {
			ct.drawRectilinearSolid(detail, {
				width: 300,
				height: 300,
				labels: [
					{ from: [0, 0, h], to: [0, d, h], text: d },
					{ from: [0, d, h], to: [a, d, h], text: a },
					{ from: [a, d, q + e], to: [a + w, d, q + e], text: w, direction: [0, -1] },
					{ from: [a + w, d, q], to: [a + w, d, q + e], text: e, direction: [1, 0] },
					{ from: [0, 0, 0], to: [0, 0, h], text: h },
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
// https://mathb-ege.sdamgia.ru/problem?id=508004
// https://mathb-ege.sdamgia.ru/problem?id=526128
// Открытый банк ФИПИ: 620DBA, 491685
