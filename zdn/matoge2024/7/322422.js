(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '322422';
		let preference = ['positive', 'negative'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let isPositive = (rand === 0);

		// 1. Генерация чисел: val1 < val2 < val3
		let val1 = sl(-10, -3);
		let val2 = sl(val1 + 1, val1 + 4);
		let val3 = sl(val2 + 1, val2 + 4);

		// 2. Рандомизация букв
		let letters = ['a', 'b', 'c', 'x', 'y', 'z', 'm', 'n', 'p', 'k'].shuffle().slice(0, 3);
		let l1 = letters[0], l2 = letters[1], l3 = letters[2];

		// 3. Выбираем 3 конкретные разности (как в оригинале)
		let allPossibleDiffs = [
			{ expr: l1 + '-' + l2, val: val1 - val2 },
			{ expr: l2 + '-' + l1, val: val2 - val1 },
			{ expr: l1 + '-' + l3, val: val1 - val3 },
			{ expr: l3 + '-' + l1, val: val3 - val1 },
			{ expr: l2 + '-' + l3, val: val2 - val3 },
			{ expr: l3 + '-' + l2, val: val3 - val2 }
		];
		
		let selectedDiffs = allPossibleDiffs.shuffle().slice(0, 3);

		// 4. Проверяем, есть ли среди выбранных удовлетворяющая условию
		let targetCondition = isPositive ? (d => d.val > 0) : (d => d.val < 0);
		let matchingDiffs = selectedDiffs.filter(targetCondition);

		let correctExpr, wrAns;
		
		if (matchingDiffs.length > 0) {
			// Есть правильный ответ среди предложенных
			correctExpr = matchingDiffs[0].expr;
			wrAns = selectedDiffs.filter(d => d.expr !== correctExpr).map(d => d.expr);
			// Добавляем вариант "невозможно определить" как неправильный
			wrAns.push('ни одна из них');
		} else {
			// Ни одна из предложенных не подходит
			correctExpr = 'ни одна из них';
			wrAns = selectedDiffs.map(d => d.expr);
		}

		// 5. Перемешиваем варианты
		let options = [correctExpr, ...wrAns].shuffle();
		wrAns = options.filter(o => o !== correctExpr);

		// 6. Форматируем для отображения: математические выражения оборачиваем в $...$
		let formatOption = (opt) => {
			if (opt === 'ни одна из них') {
				return opt; // оставляем как текст
			}
			return '$' + opt + '$'; // оборачиваем математику
		};

		// 7. Отрисовка
		let paint = function (ct) {
			coordAxis_drawAuto(ct, {
				min: val1 - 1,
				max: val3 + 1,
				points: [
					{ value: val1, mark: "dot", label: l1, labelPos: "overAxis" },
					{ value: val2, mark: "dot", label: l2, labelPos: "overAxis" },
					{ value: val3, mark: "dot", label: l3, labelPos: "overAxis" }
				],
				width: 500,
				height: 100,
				margin: 20
			});
		};

		// 8. Установка задачи
		NAtask.setTask({
			text: 'На координатной прямой отмечены числа $' + l1 + '$, $' + l2 + '$ и $' + l3 + '$. Какая из разностей ' + selectedDiffs.map(d => '$' + d.expr + '$').join(', ') + ' ' + ['положительна', 'отрицательна'][rand] + '?',
			answers: formatOption(correctExpr),
			wrongAnswers: wrAns.map(formatOption),
			preference: preference,
		});

		AtoB(3); // без autoLaTeX, так как мы уже отформатировали

		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 100,
			paint: paint
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();

//zer00player
//https://oge.sdamgia.ru/problem?id=322422
