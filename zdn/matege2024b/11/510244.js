(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510244';
		let preferenceQuestion = ['объём', 'площадь поверхности'];
		let question = preferenceQuestion[getSelectedPreferenceFromList(key, preferenceQuestion)];

		// Параллелепипед a × d × c, на котором стоит выступ шириной w и высотой e
		// на всю глубину детали.
		let a = sl(3, 7);
		let w = sl(1, a - 2);
		let p = sl(1, a - w - 1);
		let d = sl(1, 5);
		let c = sl(1, 4);
		let e = sl(1, 4);

		let detail = new RectilinearSolid([
			[0, 0, 0, a, d, c],
			[p, 0, c, p + w, d, c + e],
		]);

		let answer = question === 'объём' ? detail.volume() : detail.surfaceArea();

		let paint1 = function (ct) {
			ct.drawRectilinearSolid(detail, {
				width: 300,
				height: 300,
				labels: [
					{ from: [p, d, c + e], to: [p + w, d, c + e], text: w, direction: [0, -1] },
					{ from: [p + w, d, c], to: [p + w, d, c + e], text: e, direction: [1, 0] },
					{ from: [a, d, 0], to: [a, d, c], text: c, direction: [1, 0] },
					{ from: [a, 0, 0], to: [a, d, 0], text: d },
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
// https://mathb-ege.sdamgia.ru/problem?id=510244
// https://mathb-ege.sdamgia.ru/problem?id=510264
// Открытый банк ФИПИ: FA53EE, 3AEB5C, 77C1DF
