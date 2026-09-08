(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '369494';
		
		let preference1 = ['decimalFrac', 'ordinalyFrac'];
		let useFractions = getSelectedPreferenceFromList(key, preference1);
		let preference2 = ['chooseLetter', 'chooseNumber'];
		let randChoose = getSelectedPreferenceFromList(key, preference2);
		
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

		let pairs = nums.map((n, i) => ({ val: n, str: formattedNums[i] }));
		pairs.sort((a, b) => a.val - b.val);
		
		nums = pairs.map(p => p.val);
		formattedNums = pairs.map(p => p.str);

		let idx = sl(0, 3);
		let isChooseLetter = randChoose === 'chooseLetter';
	
		let answers = isChooseLetter ? letters[idx] : formattedNums[idx];
		let wrongAnswers = isChooseLetter 
			? letters.filter(l => l !== letters[idx]) 
			: formattedNums.filter((_, i) => i !== idx);

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
			text: 'На координатной прямой точки $A$, $B$, $C$ и $D$ ' + ['соответствуют числам $' + formattedNums.join('; ') + '$. Какой точке соответствует число $' + formattedNums[idx] + '$',
			'отмечены числа. Какому числу соответствует точка $' + letters[idx] + '$'][randChoose] + '?',
			answers: answers,
			wrongAnswers: wrongAnswers,
			preference: [preference1, preference2]
		});

		AtoB(3, {autoLaTeX: true});

		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 100,
			paint: paint
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://oge.sdamgia.ru/test?likes=317102
// https://oge.sdamgia.ru/problem?id=369494
