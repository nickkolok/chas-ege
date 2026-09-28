(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510704';
		let preference = ['findHeight', 'findWidth'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Генерация пифагоровой тройки перебором катетов.
		// Это даёт гораздо более вариативную генерацию, включая не только
		// примитивные тройки, но и все их кратные (например, 30-40-50, 15-20-25),
		// что делает размеры экранов более реалистичными и разнообразными.
		let a, b, c;
		let attempts = 0;
		do {
			a = sl(10, 120);
			// Соотношение сторон от 1:1 до 2.5:1 (реалистично для телевизоров и мониторов)
			b = sl(a, Math.floor(2.5 * a));
			c = Math.sqrt(a * a + b * b);
			attempts++;
		} while (!(Math.abs(c - Math.round(c)) < 1e-9) || c < 20 || c > 150 || attempts > 2000);
		
		if (attempts > 2000) {
			// Fallback на случай, если генератор зашёл в тупик
			a = 30; b = 40; c = 50;
		} else {
			c = Math.round(c);
		}

		let height;
		let width;
		let diagonal = c;

		// Случайно назначаем, какой катет — высота, а какой — ширина
		if (sl1()) {
			height = a;
			width = b;
		} else {
			height = b;
			width = a;
		}

		let device = ['телевизора', 'ноутбука', 'монитора'].iz();

		let answers = [
			height,
			width,
		];

		let analys = [
			`По теореме Пифагора высота экрана равна $sqrt{${diagonal}^2-${width}^2}=sqrt{${diagonal * diagonal}-${width * width}}=sqrt{${height * height}}=${height}$ см.`,
			`По теореме Пифагора ширина экрана равна $sqrt{${diagonal}^2-${height}^2}=sqrt{${diagonal * diagonal}-${height * height}}=sqrt{${width * width}}=${width}$ см.`,
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
