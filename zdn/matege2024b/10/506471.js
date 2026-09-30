(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let B = sl(18, 30);
		let A = sl(B + 4, B + 16);

		let answer = 2 * (A + B) + B;

		NAtask.setTask({
			text: 'Дачный участок имеет форму прямоугольника со сторонами ' + chislitlx(A, 'метр') + ' и ' + chislitlx(B, 'метр') + '. ' +
				'Хозяин планирует обнести его забором и разделить таким же забором на две части, одна из которых имеет форму квадрата. ' +
				'Найдите ' + ['суммарную', 'общую'].iz() + ' длину забора в метрах.',
			analys: 'Длина внешнего забора равна периметру участка: $2\\cdot(' + A + '+' + B + ')=' + (2 * (A + B)) + '$ м. ' +
				'Чтобы отделить квадрат, нужен ещё один забор длиной ' + chislitlx(B, 'метр') + '. ' +
				'Тогда ' + ['суммарная', 'общая'].iz() + ' длина забора равна $' + (2 * (A + B)) + '+' + B + '=' + answer + '$ м.',
			answers: answer,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function (ct) {
				let left = 70;
				let right = 330;
				let top = 110;
				let bottom = 280;

				let rectH = bottom - top;
				let splitX = left + rectH;

				ct.strokeStyle = om.primaryBrandColors[0];
				ct.fillStyle = om.primaryBrandColors[0];
				ct.lineWidth = 2;

				ct.drawLine(left, top, right, top);
				ct.drawLine(right, top, right, bottom);
				ct.drawLine(right, bottom, left, bottom);
				ct.drawLine(left, bottom, left, top);
				ct.drawLine(splitX, top, splitX, bottom);

				ct.font = '16px liberation_sans';
				ct.fillStyle = om.secondaryBrandColors[0];

				ct.textAlign = 'center';
				ct.textBaseline = 'alphabetic';
				ct.fillText(A, (left + right) / 2, top - 10);

				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				ct.fillText(B, left - 10, (top + bottom) / 2);
			},
		});
	}, 20000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=506471
