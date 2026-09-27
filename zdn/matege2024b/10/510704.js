(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510704';
		let preference = ['findHeight', 'findWidth'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let triples = [
			{ a: 30, b: 40, c: 50 },
			{ a: 48, b: 64, c: 80 },
			{ a: 60, b: 80, c: 100 },
			{ a: 18, b: 24, c: 30 },
			{ a: 40, b: 42, c: 58 },
		];

		let triple = triples.iz();

		let height;
		let width;
		let diagonal = triple.c;

		if (rand === 0) {
			height = triple.a;
			width = triple.b;
		} else {
			height = triple.a;
			width = triple.b;
		}

		let device = rand === 0 ? 'телевизора' : ['ноутбука', 'телевизора'].iz();

		let answers = [
			height,
			width,
		];

		let analys = [
			`По теореме Пифагора высота экрана равна $\\sqrt{${diagonal}^2−${width}^2}=\\sqrt{${diagonal * diagonal}−${width * width}}=\\sqrt{${height * height}}=${height}$ см.`,
			`По теореме Пифагора ширина экрана равна $\\sqrt{${diagonal}^2−${height}^2}=\\sqrt{${diagonal * diagonal}−${height * height}}=\\sqrt{${width * width}}=${width}$ см.`,
		][rand];

		NAtask.setTask({
			text: `Диагональ прямоугольного экрана ${device} равна ${diagonal} см, а `,
			questions: [
				[{
					text: `ширина экрана – ${width} см. Найдите высоту экрана`,
					answers: answers[0],
				}, {
					text: `высота экрана – ${height} см. Найдите ширину экрана`,
					answers: answers[1],
				}][rand]
			],
			postquestion: `. Ответ дайте в сантиметрах.`,
			analys: analys,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function (ct) {
				let left = 70;
				let right = 330;
				let top = 105;
				let bottom = 295;

				ct.strokeStyle = om.primaryBrandColors[0];
				ct.lineWidth = 2;

				ct.strokeRect(left, top, right - left, bottom - top);
				ct.drawLine(left, bottom, right, top);

				ct.fillStyle = om.secondaryBrandColors[0];
				ct.font = '16px liberation_sans';

				ct.textAlign = 'center';
				ct.textBaseline = 'alphabetic';
				ct.fillText(width, (left + right) / 2, bottom + 25);

				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				ct.fillText(height, left - 12, (top + bottom) / 2);

				ct.save();
				ct.translate((left + right) / 2, (top + bottom) / 2);
				ct.rotate(Math.atan2(top - bottom, right - left));
				ct.textAlign = 'center';
				ct.textBaseline = 'bottom';
				ct.fillText(diagonal, 0, -8);
				ct.restore();
			},
		});
	}, 20000);
})();

// https://mathb-ege.sdamgia.ru/problem?id=510704
