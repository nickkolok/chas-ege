(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let B = sl(18, 30);
		let A = sl(B + 5, B + 20);
		let squareSide = sl(5, B - 3);
		let wording = ['суммарную', 'общую'].iz();

		let answer = 2 * (A + B) + 2 * squareSide;

		NAtask.setTask({
			text: 'Дачный участок имеет форму прямоугольника со сторонами ' + chislitlx(A, 'метр') + ' и ' + chislitlx(B, 'метр') + '. ' +
				'Хозяин планирует обнести его изгородью и отгородить такой же изгородью квадратный участок со стороной ' + chislitlx(squareSide, 'метр') + ' (см. рис.). ' +
				'Найдите ' + wording + ' длину изгороди в метрах.',
			analys: 'Периметр участка равен $2\\cdot(' + A + '+' + B + ')=' + (2 * (A + B)) + '$ м. ' +
				'Так как две стороны квадратного участка совпадают со сторонами дачного участка, дополнительно требуется $2\\cdot' + squareSide + '=' + (2 * squareSide) + '$ м изгороди. ' +
				'Всего получаем $' + (2 * (A + B)) + '+' + (2 * squareSide) + '=' + answer + '$ м.',
			answers: answer,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function (ct) {
				let left = 65;
				let right = 335;
				let top = 90;
				let bottom = 305;

				let rectWidth = right - left;
				let rectHeight = bottom - top;

				let k = Math.min(rectWidth / A, rectHeight / B);
				let squareSize = squareSide * k;

				let squareRight = left + squareSize;
				let squareTop = bottom - squareSize;

				ct.strokeStyle = om.primaryBrandColors[0];
				ct.lineWidth = 2;

				ct.drawLine(left, top, right, top);
				ct.drawLine(right, top, right, bottom);
				ct.drawLine(right, bottom, left, bottom);
				ct.drawLine(left, bottom, left, top);

				ct.drawLine(left, squareTop, squareRight, squareTop);
				ct.drawLine(squareRight, squareTop, squareRight, bottom);

				ct.fillStyle = om.secondaryBrandColors[0];
				ct.font = '16px liberation_sans';

				ct.textAlign = 'center';
				ct.textBaseline = 'alphabetic';
				ct.fillText(A, (left + right) / 2, top - 12);

				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				ct.fillText(B, left - 12, (top + bottom) / 2);

				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				ct.fillText(squareSide, left + squareSize / 2, bottom + 10);
			},
		});
	}, 20000);
})();

// https://mathb-ege.sdamgia.ru/problem?id=512536
