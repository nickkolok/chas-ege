(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let rand = sl1();
		let randMinus = sl1();

		let countDrob = sl(3, 12, 1);
		let denominator = sl(2, 25, 1);
		let numerator = sl(1, denominator - 1, 1);

		let numDrob = countDrob * denominator + numerator;
		let valueDrob = (numDrob / denominator) * [-1, 1][randMinus];
		let exprStrDrob = ['-', ''][randMinus] + numDrob.texfrac(denominator);

		let countSqrt = sl(5, 25, 1);
		let numSqrt = countSqrt * countSqrt + denominator;
		let valueSqrt = numSqrt.sqrt();
		genAssert(valueSqrt != valueSqrt.round(), "корень не должен быть простым для расчёта ");

		let value = [valueDrob, valueSqrt][rand];

		let floor = Math.floor(value);
		let correct = `${floor} и ${floor + 1}`;

		let wrongAnswers = new Set();
		let usedOffsets = new Set([0]);

		while (wrongAnswers.size < 3) {
			let offset = slKrome([0], -3, 3, 1);
			if (usedOffsets.has(offset)) continue;
			usedOffsets.add(offset);

			let start = floor + offset;
			let variant = `${start} и ${start + 1}`;
			wrongAnswers.add(variant);
		}

		NAtask.setTask({
			text: 'Между какими целыми числами заключено число $' + [exprStrDrob, '\\sqrt{' + numSqrt + '}'][rand] + '$?',
			answers: correct,
			wrongAnswers: Array.from(wrongAnswers)
		});

		AtoB(3);
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=337311
