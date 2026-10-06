(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 9, 1);
		let b = slKrome(a, 2, 9, 1);
		let c = sl(2, 9, 1);
		let V = a * b * c;
		let S = 2 * (a * b + b * c + a * c);

		let paint1 = function (ct) {
			ct.translate(100, 80);
			ct.scale(25, 25);
			ct.lineWidth = 2 / 25;

			// Используем фиксированные большие размеры для лучшего отображения
			let drawWidth = 8;
			let drawHeight = 8;
			let drawDepth = 5;

			ct.drawParallelepiped({
				width: drawWidth,
				height: drawHeight,
				depth: drawDepth,
				angle: 40,
				strokeStyle:om.secondaryBrandColors,
			}, [0, 3, 4], false, [0.5, 0.2]);
		};

		NAtask.setTask({
			text: 'Два ребра прямоугольного параллелепипеда равны $' + a + '$ и $' + b + '$, а объём параллелепипеда равен $' + V + '$. Найдите площадь поверхности этого параллелепипеда.',
			answers: S,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=515838
