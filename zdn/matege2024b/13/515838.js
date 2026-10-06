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
			// Увеличиваем размеры для лучшего отображения
			let drawWidth = a * 2;
			let drawHeight = c * 2;
			let drawDepth = b * 2;
			
			ct.translate(100, 50);
			ct.scale(15, 15);
			ct.lineWidth = 0.15;

			ct.drawParallelepiped({
				width: drawWidth,
				height: drawHeight,
				depth: drawDepth,
				angle: 40,
				strokeStyle: om.secondaryBrandColors,
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
