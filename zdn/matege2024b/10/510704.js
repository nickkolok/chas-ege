(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510704';
		let preference = ['findHeight', 'findWidth'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Генерация пифагоровой тройки с помощью формулы Евклида
		// a = m^2 - n^2, b = 2mn, c = m^2 + n^2
		let a, b, c;
		do {
			let m = sl(2, 9);
			let n = sl(1, m - 1);
			// m и n должны быть взаимно простыми и не оба нечётными
			if (m.nod(n) !== 1) continue;
			if (m % 2 === 1 && n % 2 === 1) continue;

			let x = m * m - n * n;
			let y = 2 * m * n;
			let z = m * m + n * n;

			// Упорядочиваем катеты по возрастанию
			a = Math.min(x, y);
			b = Math.max(x, y);
			c = z;

			// Масштабируем для получения разумных размеров экрана
			let k = sl(1, 4);
			a *= k;
			b *= k;
			c *= k;

			// Фильтруем: диагональ от 20 до 120 см, разумное соотношение сторон,
			// минимальный катет не менее 10 см
		} while (c < 20 || c > 120 || b > 3 * a || a < 10);

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
			`По теореме Пифагора высота экрана равна $\\sqrt{${diagonal}^2-${width}^2}=\\sqrt{${diagonal * diagonal}-${width * width}}=\\sqrt{${height * height}}=${height}$ см.`,
			`По теореме Пифагора ширина экрана равна $\\sqrt{${diagonal}^2-${height}^2}=\\sqrt{${diagonal * diagonal}-${height * height}}=\\sqrt{${width * width}}=${width}$ см.`,
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

				// Рисуем только известные величины, чтобы не давать подсказку прямо на рисунке
				if (rand === 1) {
					// Ищем ширину, значит она неизвестна. Рисуем высоту.
					ct.textAlign = 'right';
					ct.textBaseline = 'middle';
					ct.fillText(height, left - 12, (top + bottom) / 2);
				} else {
					// Ищем высоту, значит она неизвестна. Рисуем ширину.
					ct.textAlign = 'center';
					ct.textBaseline = 'alphabetic';
					ct.fillText(width, (left + right) / 2, bottom + 25);
				}

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
