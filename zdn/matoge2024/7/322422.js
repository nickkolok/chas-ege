(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '322422';
		let prefSign = ['positive', 'negative'];
		let prefAns = ['matching', 'noneOfThem'];
		
		let isPositive = getSelectedPreferenceFromList(key, prefSign) === 0;
		let isNoneOfThem = getSelectedPreferenceFromList(key, prefAns) === 1;

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

		// 4. Выбираем знак и формируем варианты
		let matchingDiffs = allPossibleDiffs.filter(d => isPositive ? d.val > 0 : d.val < 0);
		let oppositeDiffs = allPossibleDiffs.filter(d => isPositive ? d.val < 0 : d.val > 0);
		let correctExpr, selectedDiffs, wrAns;

		if (isNoneOfThem) {
			selectedDiffs = oppositeDiffs.shuffle();
			correctExpr = 'ни одна из них';
			wrAns = selectedDiffs.map(d => d.expr);
		} else {
			let correctDiff = matchingDiffs.iz();
			let wrongDiffs = oppositeDiffs.shuffle().slice(0, 2);

			selectedDiffs = [correctDiff, ...wrongDiffs].shuffle();
			correctExpr = correctDiff.expr;
			wrAns = wrongDiffs.map(d => d.expr);
			wrAns.push('ни одна из них');
		}

		// 5. Форматируем для отображения: математические выражения оборачиваем в $...$
		let formatOption = (opt) => {
			if (opt === 'ни одна из них') {
				return opt; // оставляем как текст
			}
			return '$' + opt + '$'; // оборачиваем математику
		};

		// 6. Отрисовка
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

		// 7. Установка задачи
		NAtask.setTask({
			text: 'На координатной прямой отмечены числа $' + l1 + '$, $' + l2 + '$ и $' + l3 + '$. Какая из разностей ' + selectedDiffs.map(d => '$' + d.expr + '$').join(', ') + ' ' + (isPositive ? 'положительна' : 'отрицательна') + '?',
			answers: formatOption(correctExpr),
			wrongAnswers: wrAns.map(formatOption),
			preference: [['positive', 'negative'],['matching', 'noneOfThem']],
		});

		AtoB(3, {
			sortingFunction: (options, ver) => {
				let noneOfThemIndex = options.indexOf('ни одна из них');
				if (noneOfThemIndex !== -1 && noneOfThemIndex !== options.length - 1) {
					let item = options.splice(noneOfThemIndex, 1)[0];
					options.push(item);
				}
				return options;
			}
		}); // вариант "ни одна из них" всегда последний

		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 100,
			paint: paint
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();

//zer00player
//https://oge.sdamgia.ru/problem?id=322422
