(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 6);
		let m = sl(1, 15);
		let k = 4 * m;
		let V = a * a * m;

		let paintPyramid = function (ct) {
			// Отражение по Y: вершина пирамиды сверху, основание снизу.
			// Угол PI/4 даёт невырожденную проекцию: задняя вершина основания
			// не лежит на боковом ребре (при PI/6 чертёж вырождался в треугольник).
			ct.translate(110, 141);
			ct.scale(90, -90);
			ct.lineWidth = 2 / 90;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			ct.drawRightPyramid3({
				edge: 2,
				height: 2.5,
				angle: Math.PI / 4
			}, [5], [5 / 90, 2 / 90]); // пунктиром скрытое боковое ребро (задняя вершина - вершина)
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
