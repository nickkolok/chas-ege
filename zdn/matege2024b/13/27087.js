(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 6);
		let m = sl(1, 15);
		let k = 4 * m;
		let V = a * a * m;

		let paintPyramid = function (ct) {
			ct.translate(200, 280);
			ct.scale(40, 40);
			ct.lineWidth = 1.5 / 40;
			
			// Используем библиотечную функцию для отрисовки правильной треугольной пирамиды
			ct.drawRightPyramid3({
				edge: 2,
				height: 2.5,
				angle: Math.PI / 6
			}, [1, 2], [0.1, 0.1]); // Рёбра 1 и 2 (задние боковые) пунктиром
		};

		NAtask.setTask({
			text: 'Сторона основания правильной треугольной пирамиды равна $' + a + '$, а высота пирамиды равна $' + k + '\\sqrt{3}$. Найдите объём этой пирамиды.',
			answers: V,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paintPyramid,
		});
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=27087
