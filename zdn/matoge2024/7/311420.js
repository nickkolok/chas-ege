(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let count = sl(0, 3);

		let denominatorFirst = sl(2, 25);
		let denominatorSecond = slKrome([denominatorFirst], 2, 25);
		let numeratorFirst = sl(1, denominatorFirst - 1) + count * denominatorFirst;
		let numeratorSecond = sl(1, denominatorSecond - 1) + count * denominatorSecond;

		let frac1 = numeratorFirst / denominatorFirst;
		let frac2 = numeratorSecond / denominatorSecond;

		genAssert((frac1 - frac2).abs() >= 0.1, "разница между двумя значениями должна составлять 0,1");

		let text1 = numeratorFirst.texfrac(denominatorFirst);
		let text2 = numeratorSecond.texfrac(denominatorSecond);

		if (frac1 > frac2) {
			[frac1, frac2] = [frac2, frac1];
			[text1, text2] = [text2, text1];
		}
		let correctVal = ((frac1 + frac2) / 2);
		let correct = correctVal.toFixed(1).ts();


		let wrong = new Set();
		while (wrong.size < 3) {
			let noise = slKrome([0], -7, 7) * 0.1;
			let candidate = +(correctVal + noise).toFixed(1);


			if (candidate <= 0 || candidate > frac1 && candidate < frac2 || candidate === +correctVal.toFixed(1)) {
				continue
			};

			wrong.add(candidate.ts());
		}

		NAtask.setTask({
			text: 'Какое из следующих чисел заключено между числами ${' + text1 + '}$ и ${' + text2 + '}$? В ответе укажите номер правильного варианта.',
			answers: correct,
			wrongAnswers: Array.from(wrong)
		});

		AtoB(3, { autoLaTeX: true });
	}, 1000);
})();

//zer00player
//https://oge.sdamgia.ru/test?likes=311420
