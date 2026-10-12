(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506579';
		let preferenceQuestion = ['объём', 'площадь поверхности'];
		let question = preferenceQuestion[getSelectedPreferenceFromList(key, preferenceQuestion)];

		// Деталь-ступенька: нижний параллелепипед a × d × c,
		// на нём сзади верхний параллелепипед той же ширины, отступающий от края на s.
		let a = sl(2, 6);
		let d = sl(2, 6);
		let s = sl(1, d - 1);
		let h = sl(2, 6);
		let c = sl(1, h - 1);

		let detail = new RectilinearSolid([
			[0, 0, 0, a, d, c],
			[0, s, c, a, d, h],
		]);

		let answer = question === 'объём' ? detail.volume() : detail.surfaceArea();

		let paint1 = function (ct) {
			ct.drawRectilinearSolid(detail, {
				width: 300,
				height: 300,
				labels: [
					{ from: [0, s, c], to: [0, s, h], text: h - c },
					{ from: [0, 0, c], to: [0, s, c], text: s, direction: [-1, 0] },
					{ from: [a, d, 0], to: [a, d, h], text: h, direction: [1, 0] },
					{ from: [0, 0, 0], to: [a, 0, 0], text: a },
					{ from: [a, 0, 0], to: [a, d, 0], text: d },
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
// https://mathb-ege.sdamgia.ru/problem?id=506579
// https://mathb-ege.sdamgia.ru/problem?id=525098
// https://mathb-ege.sdamgia.ru/problem?id=525121
// Открытый банк ФИПИ: C15157, DA70C8, 40EDBF
