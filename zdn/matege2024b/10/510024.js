(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let A = sl(30, 80);
		let B = sl(20, A - 5);
		let passage = sl(2, 10);

		let answer = 2 * (A + B) - passage;

		NAtask.setTask({
			text: 'Участок земли имеет прямоугольную форму. Стороны прямоугольника равны $' + B + '$ м и $' + A + '$ м. ' +
				'Найдите длину забора (в метрах), которым нужно огородить участок, предусмотрев проезд шириной $' + passage + '$ м.',
			analys: 'Периметр участка равен $2\\cdot(' + A + '+' + B + ')$. Из него нужно вычесть ширину проезда: ' +
				'$2\\cdot(' + A + '+' + B + ')-' + passage + '=' + answer + '$ м.',
			answers: answer,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function (ct) {
				let left = 70;
				let right = 330;
				let top = 95;
				let bottom = 300;

				let gapWidth = 45;
				let gapLeft = (left + right) / 2 - gapWidth / 2;
				let gapRight = (left + right) / 2 + gapWidth / 2;

				ct.strokeStyle = om.primaryBrandColors[0];
				ct.fillStyle = om.primaryBrandColors[0];
				ct.lineWidth = 2;

				ct.drawLine(left, top, right, top);
				ct.drawLine(left, top, left, bottom);
				ct.drawLine(right, top, right, bottom);
				ct.drawLine(left, bottom, gapLeft, bottom);
				ct.drawLine(gapRight, bottom, right, bottom);

				ct.font = '16px liberation_sans';
				ct.fillStyle = om.secondaryBrandColors[0];

				ct.textAlign = 'center';
				ct.textBaseline = 'alphabetic';
				ct.fillText(A, (left + right) / 2, top - 10);

				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				ct.fillText(B, left - 10, (top + bottom) / 2);

				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				ct.fillText(passage, (gapLeft + gapRight) / 2, bottom + 10);
			},
		});
	}, 20000);
})();

//https://mathb-ege.sdamgia.ru/problem?id=510024
