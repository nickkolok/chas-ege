(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '27210';
		let preferenceQuestion = ['объём', 'площадь поверхности'];
		let question = preferenceQuestion[getSelectedPreferenceFromList(key, preferenceQuestion)];

		// Нижний параллелепипед a × d × (H − c), на нём в заднем левом углу
		// верхний параллелепипед w × e × c; H — общая высота.
		let a = sl(3, 7);
		let d = sl(3, 7);
		let w = sl(2, a - 1);
		let e = sl(2, d - 1);
		let c = sl(2, 6);
		let H = c + sl(1, 4);

		let polyhedron = new RectilinearSolid([
			[0, 0, 0, a, d, H - c],
			[0, d - e, H - c, w, d, H],
		]);

		let paint1 = function (ct) {
			ct.drawRectilinearSolid(polyhedron, {
				width: 300,
				height: 300,
				labels: [
					{ from: [0, d - e, H], to: [0, d, H], text: e },
					{ from: [0, d, H], to: [w, d, H], text: w },
					{ from: [0, d - e, H - c], to: [0, d - e, H], text: c },
					{ from: [0, d, 0], to: [0, d, H], text: H, direction: [1, 0] },
					{ from: [0, 0, 0], to: [a, 0, 0], text: a },
					{ from: [a, 0, 0], to: [a, d, 0], text: d },
				],
			});
		};

		NAtask.setTask({
			text: 'Найдите ' + question + ' многогранника, изображённого на рисунке (все двугранные углы прямые).',
			answers: question === 'объём' ? polyhedron.volume() : polyhedron.surfaceArea(),
			preference: [preferenceQuestion],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
// 27210 25871 25875 25873 25877 25879 (объём)
// 25881 25883 25885 25887 25889 (площадь поверхности)
// https://math-ege.sdamgia.ru/problem?id=27210
