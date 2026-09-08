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

		// 3. Все возможные разности и их значения
		let allDiffs = [
			{ expr: l1 + '-' + l2, val: val1 - val2 },
			{ expr: l2 + '-' + l1, val: val2 - val1 },
			{ expr: l1 + '-' + l3, val: val1 - val3 },
			{ expr: l3 + '-' + l1, val: val3 - val1 },
			{ expr: l2 + '-' + l3, val: val2 - val3 },
			{ expr: l3 + '-' + l2, val: val3 - val2 }
		];

		// 4. Фильтрация по условию
		let targetCondition = isPositive ? (d => d.val > 0) : (d => d.val < 0);
		let wrongCondition = isPositive ? (d => d.val < 0) : (d => d.val > 0);

		let correctPool = allDiffs.filter(targetCondition);
		let wrongPool = allDiffs.filter(wrongCondition);

		// 5. Выбор ответов
		let correctDiff = correctPool.iz();
		let wrongDiffs = wrongPool.shuffle().slice(0, 3);

		// 6. Формирование списка вариантов
		let options = [correctDiff, ...wrongDiffs].shuffle();
		let correctExpr = correctDiff.expr;
		let wrAns = options.filter(d => d.expr !== correctExpr).map(d => d.expr);

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
			text: `На координатной прямой отмечены числа ${l1}, ${l2} и ${l3}. Какая из разностей ${isPositive ? 'положительна' : 'отрицательна'}?`,
			answers: correctExpr,
			wrongAnswers: wrAns,
			preference: preference,
		});

		AtoB(3, { autoLaTeX: true });

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
