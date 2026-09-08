(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let nums = [];
		let minDistance = 0.15;
		
		while (nums.length < 4) {
			let num = sl(-10000, 10000) / 10000;
			let tooClose = nums.some(n => Math.abs(n - num) < minDistance);
			if (!tooClose) {
				nums.push(num);
			}
		}
		// Сортируем числа по возрастанию
		nums.sort((a, b) => a - b);

		let letters = ['A', 'B', 'C', 'D'];
		
		// Выбираем случайное число и определяем правильную точку
		let correctIndex = sl(0, 3);
		let correctNumber = nums[correctIndex];
		let correctLetter = letters[correctIndex];

		let wrongAnswers = letters.filter(l => l !== correctLetter);

		// Функция для форматирования числа (максимум 4 знака после запятой)
		let formatNum = function(n) {
			return parseFloat(n.toFixed(4)).toString().replace('.', ',');
		};

		let paint = function (ct) {
			// Определяем диапазон для оси с небольшим запасом
			let minVal = Math.floor(nums[0] * 10) / 10 - 0.1;
			let maxVal = Math.ceil(nums[3] * 10) / 10 + 0.1;
			
			coordAxis_drawAuto(ct, {
				min: minVal,
				max: maxVal,
				points: [
					// Точки A, B, C, D
					{ value: nums[0], mark: "dot", label: "A", labelPos: "overAxis" },
					{ value: nums[1], mark: "dot", label: "B", labelPos: "overAxis" },
					{ value: nums[2], mark: "dot", label: "C", labelPos: "overAxis" },
					{ value: nums[3], mark: "dot", label: "D", labelPos: "overAxis" }
				],
				width: 500,
				height: 100,
				margin: 20
			});
		};

		NAtask.setTask({
			text: 'На координатной прямой точки A, B, C и D соответствуют числам' + nums.map(formatNum).join('; ') +
			      '. Какой точке соответствует число ' + formatNum(correctNumber) + '?',
			answers: correctLetter,
			wrongAnswers: wrongAnswers
		});

		AtoB(3, letters.indexOf(correctLetter));

		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 100,
			paint: paint
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://oge.sdamgia.ru/test?likes=317102
//https://oge.sdamgia.ru/problem?id=369494
