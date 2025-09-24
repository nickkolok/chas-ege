(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = "317132";
		let preference = ['frac', 'square'];
		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));

		let countDrob = sl(1, 5);
		let denominator = sl(2, 25);
		let numerator = sl(1, denominator - 1);

		let numDrob = countDrob * denominator + numerator;
		let valueDrob = numDrob / denominator;

		genAssert(!(valueDrob * 100).isAlmostInteger(), "дробь должна иметь 2 или более знака после запятой");

		let exprStrDrob = numDrob.texfrac(denominator);

		let countSqrt = sl(5, 25);
		let numSqrt = countSqrt * countSqrt + denominator;

		genAssert(!numSqrt.isPolnKvadr(), "корень не должен быть полным квадратом");

		let valueSqrt = numSqrt.sqrt();

		let value = [valueDrob, valueSqrt][rand];
		let step = [0.1, 1][rand];
		let format = rand === 0 ? x => ((x * 10).round() / 10).ts(true) : x => x;

		let start = Math.floor(value / step) * step;
		let end = start + step;
		let correct = `[${format(start)}; ${format(end)}]`;

		let wrongAnswers = new Set();
		wrongAnswers.add(correct);

		let tries = 0;
		while (wrongAnswers.size < 4 && tries < 50) {
			let offset = slKrome([0], -3, 3);
			let fakeStart = start + offset * step;
			let fakeEnd = fakeStart + step;
			if (fakeStart < 0) continue;

			let fake = `[${format(fakeStart)}; ${format(fakeEnd)}]`;
			wrongAnswers.add(fake);
			tries++;
		}
		wrongAnswers.delete(correct);

		NAtask.setTask({
			text: 'Какому из данных промежутков принадлежит число $' + [exprStrDrob, '\\sqrt{' + numSqrt + '}'][rand] + '$? В ответе укажите номер правильного варианта.',
			answers: correct,
			wrongAnswers,
			preference: preference,
		});

		AtoB(3, { autoLaTeX: true });
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=317132
//https://oge.sdamgia.ru/test?likes=317223
