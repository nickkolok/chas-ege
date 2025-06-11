(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = "337311";
		let preference = ['frac', 'square'];
		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));
		let randMinus = [-1, 1].iz();

		let countDrob = sl(3, 12);
		let denominator = sl(2, 25);
		let numerator = sl(1, denominator - 1);

		let numDrob = countDrob * denominator + numerator;
		let valueDrob = (numDrob / denominator) * randMinus;
		let exprStrDrob = (randMinus * numDrob).texfrac(denominator);

		let countSqrt = sl(5, 25);
		let numSqrt = countSqrt * countSqrt + denominator;

		genAssert(!numSqrt.isPolnKvadr(), "корень не должен быть полным квадратом");

		let valueSqrt = numSqrt.sqrt();

		let value = [valueDrob, valueSqrt][rand];

		let floor = Math.floor(value);
		let correct = `${floor}` + '\\mbox{ и }' + `${floor + 1}`;

		let wrongAnswers = new Set();
		let usedOffsets = new Set([0]);

		while (wrongAnswers.size < 3) {
			let offset = slKrome([0], -3, 3);
			if (usedOffsets.has(offset)) {
				continue
			};
			usedOffsets.add(offset);

			let start = floor + offset;
			let variant = `${start}` + '\\mbox{ и }' + `${start + 1}`;
			wrongAnswers.add(variant);
		}

		NAtask.setTask({
			text: 'Между какими целыми числами заключено число $' + [exprStrDrob, '\\sqrt{' + numSqrt + '}'][rand] + '$? В ответе укажите номер правильного варианта.',
			answers: correct,
			wrongAnswers: Array.from(wrongAnswers),
			preference: preference,
		});

		AtoB(3, { autoLaTeX: true });
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=337311
