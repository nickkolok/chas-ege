(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510024';
		let preference = ['top', 'bottom', 'left', 'right'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let gapPos = preference[rand];

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
			preference: preference,
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

				function drawSide(x1, y1, x2, y2, isGap) {
					if (!isGap) {
						ct.drawLine(x1, y1, x2, y2);
					} else {
						let midX = (x1 + x2) / 2;
						let midY = (y1 + y2) / 2;
						if (y1 === y2) {
							ct.drawLine(x1, y1, midX - gapWidth / 2, y1);
							ct.drawLine(midX + gapWidth / 2, y1, x2, y2);
						} else {
							ct.drawLine(x1, y1, x1, midY - gapWidth / 2);
							ct.drawLine(x1, midY + gapWidth / 2, x1, y2);
						}
					}
				}

				ct.strokeStyle = om.primaryBrandColors[0];
				ct.fillStyle = om.primaryBrandColors[0];
				ct.lineWidth = 2;

				drawSide(left, top, right, top, gapPos === 'top');
				drawSide(left, bottom, right, bottom, gapPos === 'bottom');
				drawSide(left, top, left, bottom, gapPos === 'left');
				drawSide(right, top, right, bottom, gapPos === 'right');

				ct.font = '16px liberation_sans';
				ct.fillStyle = om.secondaryBrandColors[0];

				// Draw A
				if (gapPos === 'top') {
					ct.textAlign = 'center';
					ct.textBaseline = 'top';
					ct.fillText(A, (left + right) / 2, bottom + 5);
				} else {
					ct.textAlign = 'center';
					ct.textBaseline = 'alphabetic';
					ct.fillText(A, (left + right) / 2, top - 5);
				}

				// Draw B
				if (gapPos === 'left') {
					ct.textAlign = 'left';
					ct.textBaseline = 'middle';
					ct.fillText(B, right + 10, (top + bottom) / 2);
				} else {
					ct.textAlign = 'right';
					ct.textBaseline = 'middle';
					ct.fillText(B, left - 10, (top + bottom) / 2);
				}

				// Draw passage
				if (gapPos === 'top') {
					ct.textAlign = 'center';
					ct.textBaseline = 'alphabetic';
					ct.fillText(passage, (left + right) / 2, top - 10);
				} else if (gapPos === 'bottom') {
					ct.textAlign = 'center';
					ct.textBaseline = 'top';
					ct.fillText(passage, (left + right) / 2, bottom + 10);
				} else if (gapPos === 'left') {
					ct.textAlign = 'right';
					ct.textBaseline = 'middle';
					ct.fillText(passage, left - 10, (top + bottom) / 2);
				} else if (gapPos === 'right') {
					ct.textAlign = 'left';
					ct.textBaseline = 'middle';
					ct.fillText(passage, right + 10, (top + bottom) / 2);
				}
			},
		});
	}, 20000);
})();

//https://mathb-ege.sdamgia.ru/problem?id=510024
