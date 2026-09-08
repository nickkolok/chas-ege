(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '317102';
		let preference = ['decimalFrac', 'ordinalyFrac'];
		let useFractions = getSelectedPreferenceFromList(key, preference);
		
		let nums = [];
		let letters = ['A', 'B', 'C', 'D'];
		let formattedNums = [];

		if (useFractions) {
			// Генерируем обыкновенные дроби
			let minDistance = 0.1;
			
			while (nums.length < 4) {
				let denominator = sl(2, 10);
				let numerator = sl(1, denominator - 1);
				let num = numerator / denominator;
				
				let tooClose = nums.some(n => Math.abs(n - num) < minDistance);
				if (!tooClose) {
					nums.push(num);
					formattedNums.push(numerator.texfrac(denominator));
				}
			}
		} else {
			// Генерируем десятичные дроби
			let minDistance = 0.15;
			while (nums.length < 4) {
				let num = sl(-10000, 10000) / 10000;
				
				let tooClose = nums.some(n => Math.abs(n - num) < minDistance);
				if (!tooClose) {
					nums.push(num);
				}
			}
			let formatNum = function(n) {
				return parseFloat(n.toFixed(4)).toString().replace('.', ',');
			};
			
			formattedNums = nums.map(formatNum);
		}

		// Сортируем числа по возрастанию
		nums.sort((a, b) => a - b);
		formattedNums.sort((a, b) => nums[nums.indexOf(a)] - nums[nums.indexOf(b)]);

		// Выбираем случайное число и определяем правильную точку
		let correctIndex = sl(0, 3);
		let correctFormatted = formattedNums[correctIndex];
		let correctLetter = letters[correctIndex];

		// Формируем неправильные ответы
		let wrongAnswers = letters.filter(l => l !== correctLetter);

		// Рисуем координатную прямую
		let paint = function (ct) {
			let minVal = Math.floor(nums[0] * 10) / 10 - 0.1;
			let maxVal = Math.ceil(nums[3] * 10) / 10 + 0.1;
			
			coordAxis_drawAuto(ct, {
				min: minVal,
				max: maxVal,
				points: [
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
			text: 'На координатной прямой точки A, B, C и D соответствуют числам $' + formattedNums.join('; ') + '$.' +
			      ' Какой точке соответствует число $' + correctFormatted + '$?',
			answers: correctLetter,
			wrongAnswers: wrongAnswers,
			preference: preference
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
