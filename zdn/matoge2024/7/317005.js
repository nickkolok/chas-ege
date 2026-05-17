(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let base = sl(2, 10);
		let start = base;
		let end = base + 2;
		let mid = base + 1;
		let isLeftSide = sl1();

		let min_correct, max_correct;
		let min_wrong, max_wrong;
		if (isLeftSide) {
			min_correct = start * start + 1;
			max_correct = mid * mid - 1;
			min_wrong = mid * mid + 1;
			max_wrong = end * end - 1;
		} else {
			min_correct = mid * mid + 1;
			max_correct = end * end - 1;
			min_wrong = start * start + 1;
			max_wrong = mid * mid - 1;
		}
		let correct_num = sl(min_correct, max_correct);

		genAssert((max_wrong - min_wrong) >= 3, "Недостаточно чисел для неправильных вариантов");

		let wrong_nums = [];
		while (wrong_nums.length < 3) {
			let num = sl(min_wrong, max_wrong);
			if (!wrong_nums.includes(num)) {
				wrong_nums.push(num);
			}
		}

		genAssert(!correct_num.isPolnKvadr(), "Число под корнем должно быть не полным квадратом");
		wrong_nums.forEach(num => {
			genAssert(!num.isPolnKvadr(), "Число под корнем должно быть не полным квадратом");
		});

		let a = Math.sqrt(correct_num);
		if (isLeftSide) {
			genAssert(a > start && a < mid, "Точка A должна быть между " + start + " и " + mid);
		} else {
			genAssert(a > mid && a < end, "Точка A должна быть между " + mid + " и " + end);
		}

		let paint1 = function (ct) {
			coordAxis_drawAuto(ct, {
				min: start,
				max: end,
				points: [
					{ value: start, mark: "line", label: start.toString(), labelPos: "underAxis" },
					{ value: mid, mark: "line", label: mid.toString(), labelPos: "underAxis" },
					{ value: end, mark: "line", label: end.toString(), labelPos: "underAxis" },
					{ value: a, mark: "dot", label: "A", labelPos: "overAxis" }
				],
				width: 400,
				height: 100,
				margin: 20
			});
		};

		let options = [correct_num, ...wrong_nums];
		options = options.sort(() => Math.random() - 0.5);
		let optionsText = options.map(num => '\\sqrt{' + num + '}').join(', ');
		let wrAns = options.filter(num => num !== correct_num).map(num => '$\\sqrt{' + num + '}$');

		NAtask.setTask({
			text: 'Одно из чисел $' + optionsText + '$ отмечено на прямой точкой $A$. Какое это число?',
			answers: '$\\sqrt{' + correct_num + '}$',
			wrongAnswers: wrAns,
		});

		AtoB(3);

		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//zer00player
//https://math-oge.sdamgia.ru/problem?id=317005
