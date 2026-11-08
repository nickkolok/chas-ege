(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let rand = sl1();

		let numberSqrtFisrt = slKrome([4, 9, 16], 2, 20);
		let numberSqrtSecond = numberSqrtFisrt * slKrome([numberSqrtFisrt, 4, 9, 16, 25], 2, 35);

		genAssert(!numberSqrtSecond.isPolnKvadr(), "корень не должен быть полным квадратом");

		let numberSqrtWithRatio = slKrome([4, 9, 16, numberSqrtFisrt], 2, 20);

		let val1 = [numberSqrtFisrt.sqrt(), numberSqrtWithRatio * numberSqrtFisrt.sqrt()][rand];
		let val2 = [numberSqrtSecond.sqrt(), numberSqrtFisrt * numberSqrtWithRatio.sqrt()][rand];

		let minV = Math.min(val1, val2);
		let maxV = Math.max(val1, val2);

		// Количество целых чисел между ними
		let left = Math.ceil(minV);
		let right = Math.floor(maxV);
		let count = Math.max(0, right - left) + 1;

		let text1 = [`\\sqrt{${numberSqrtFisrt}}`, `${numberSqrtWithRatio}\\sqrt{${numberSqrtFisrt}}`][rand];
		let text2 = [`\\sqrt{${numberSqrtSecond}}`, `${numberSqrtFisrt}\\sqrt{${numberSqrtWithRatio}}`][rand];

		NAtask.setTask({
			text:
				'Сколько целых чисел расположено между ${' + text1 + '}$ и ${' + text2 + '}$?',
			answers: count,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=401572
