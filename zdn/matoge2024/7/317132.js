(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let rand = sl1();

		let countDrob = sl(1, 5, 1);
		let denominator = sl(2, 25, 1);
		let numerator = sl(1, denominator - 1, 1);

		let numDrob = countDrob * denominator + numerator;
		let valueDrob = numDrob / denominator;
		let exprStrDrob = numDrob.texfrac(denominator);

		let countSqrt = sl(5, 25, 1);
		let numSqrt = countSqrt * countSqrt + denominator;
		let valueSqrt = numSqrt.sqrt();
		genAssert(valueSqrt != valueSqrt.round(), "корень не должен быть простым для расчёта ");

		let value = [valueDrob, valueSqrt][rand];
		let step = [0.1, 1][rand];
		let format = rand === 0
			? x => (Math.round(x * 10) / 10).toFixed(1).replace('.', ',')
			: x => `${x}`;

		
		let start = Math.floor(value / step) * step;
		let end = start + step;
		let correct = `[${format(start)}; ${format(end)}]`;

		
		let wrongAnswers = new Set();
		wrongAnswers.add(correct); 

		let tries = 0;
		while (wrongAnswers.size < 4 && tries < 50) {
			let offset = slKrome([0], -3, 3, 1);
			let fakeStart = start + offset * step;
			let fakeEnd = fakeStart + step;
			if (fakeStart < 0) continue;

			let fake = `[${format(fakeStart)}; ${format(fakeEnd)}]`;
			wrongAnswers.add(fake);
			tries++;
		}
		wrongAnswers.delete(correct);

		NAtask.setTask({
			text: 'Какому из данных промежутков принадлежит число $' + [exprStrDrob, '\\sqrt{' + numSqrt + '}'][rand] + '$?',
			answers: correct,
			wrongAnswers: Array.from(wrongAnswers)
		});

		AtoB(3);
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=317132
//https://oge.sdamgia.ru/test?likes=317223
