(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '369494';
		let preference1 = ['decimalFrac', 'ordinalyFrac'];
		let useFractions = getSelectedPreferenceFromList(key, preference1) === 'ordinalyFrac';
		
		let preference2 = ['chooseLetter', 'chooseNumber'];
		let choose = getSelectedPreferenceFromList(key, preference2);
		
		let nums = [];
		let letters = ['A', 'B', 'C', 'D'];
		let formattedNums = [];

		if (useFractions) {
			let minDistance = 0.1;
			while (nums.length < 4) {
				let denominator = sl(2, 10);
				let numerator = sl(1, denominator - 1);
				let isNegative = sl1();
				let num = (isNegative ? -1 : 1) * numerator / denominator;
				
				let tooClose = nums.some(n => Math.abs(n - num) < minDistance);
				if (!tooClose) {
					nums.push(num);
					let numTexStr = isNegative ? '-' + numerator.texfrac(denominator) : numerator.texfrac(denominator);
					formattedNums.push(numTexStr);
				}
			}
		} else {
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

		// Сортируем пары (число, строка) по возрастанию числа
		let pairs = nums.map((n, i) => ({ val: n, str: formattedNums[i] }));
		pairs.sort((a, b) => a.val - b.val);
		
		nums = pairs.map(p => p.val);
		formattedNums = pairs.map(p => p.str);

		let text, answers, wrongAnswers, correctIndexForAtoB;

		if (choose === 'chooseLetter') {
			let correctIndex = sl(0, 3);
			let correctFormatted = formattedNums[correctIndex];
			let correctLetter = letters[correctIndex];

			text = 'На координатной прямой точки A, B, C и D соответствуют числам $' + formattedNums.join('; ') + '$. Какой точке соответствует число $' + correctFormatted + '$?';
			answers = correctLetter;
			wrongAnswers = letters.filter(l => l !== correctLetter);
			correctIndexForAtoB = letters.indexOf(correctLetter);
		} else {
			let targetIndex = sl(0, 3);
			let targetLetter = letters[targetIndex];
			let correctFormatted = formattedNums[targetIndex];
			
			text = 'На координатной прямой точками A, B, C и D отмечены числа. Какому числу соответствует точка ' + targetLetter + '?';
			answers = correctFormatted;
			wrongAnswers = formattedNums.filter((_, i) => i !== targetIndex);
			correctIndexForAtoB = targetIndex;
		}

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
			text: text,
			answers: answers,
			wrongAnswers: wrongAnswers,
			preference: [preference1, preference2]
		});

		AtoB(3, correctIndexForAtoB);

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
