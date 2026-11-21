(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '522563';
		let preference = ['product', 'range', 'fiveDigitRange'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let K = (rand === 2 ? [15, 25, 45, 55, 75] : [12, 15, 18, 22, 24]).iz();
		let min = rand === 2 ? 10000 : 1000;
		let max = 10 * min;

		let validNums = [];
		for (let n = Math.ceil(min / K) * K; n < max; n += K) {
			let digits = String(n).split('').map(Number);
			if (digits.includes(0))
				continue;
			validNums.push({
				n: n,
				p: digits.production()
			});
		}

		let answers = [];
		let textCondition = '';

		if (rand === 0) {
			let P = sl(1, 250);
			answers = validNums.filter(x => x.p === P).map(x => String(x.n));
			genAssert(answers.length > 0 && answers.length <= 5, 'Не найдено подходящих чисел для P=' + P);
			textCondition = 'равно $' + P + '$';
		} else {
			let A = sl(0, 20) * 5;
			let B = rand === 2 ? A + 10 : sl(A / 5 + 1, 30) * 5;
			answers = validNums.filter(x => x.p > A && x.p < B).map(x => String(x.n));
			genAssert(answers.length > 0 && answers.length <= 5, 'Не найдено подходящих чисел для диапазона ' + A + '-' + B);
			textCondition = 'больше $' + A + '$, но меньше $' + B + '$';
		}

		NAtask.setTask({
			text: 'Найдите ' + (rand === 2 ? 'пятизначное' : 'четырёхзначное') + ' число, кратное $' + K + '$, произведение цифр которого ' + textCondition +
				'. В ответе укажите какое-нибудь одно такое число.',
			answers: answers,
			preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=522563
// 91E8C3
