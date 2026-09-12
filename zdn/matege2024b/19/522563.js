(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let K = [12, 15, 18, 22, 24].iz();
		
		let validNums = [];
		for (let n = 1111; n <= 9999; n++) {
			let s = String(n);
			if (s.includes('0')) continue;
			if (n % K !== 0) continue;
			let prod = 1;
			for (let c of s) prod *= parseInt(c, 10);
			validNums.push({n: n, p: prod});
		}
		
		let conditionType = ['eq', 'range'].iz();
		let answers = [];
		let textCondition = '';
		
		if (conditionType === 'eq') {
			let P = sl(1, 250);
			answers = validNums.filter(x => x.p === P).map(x => String(x.n));
			genAssert(answers.length > 0 && answers.length <= 5, 'Не найдено подходящих чисел для P=' + P);
			textCondition = 'равно $' + P + '$';
		} else {
			let A = sl(0, 20) * 5;
			let B = sl(A / 5 + 1, 30) * 5;
			answers = validNums.filter(x => x.p > A && x.p < B).map(x => String(x.n));
			genAssert(answers.length > 0 && answers.length <= 5, 'Не найдено подходящих чисел для диапазона ' + A + '-' + B);
			textCondition = 'больше $' + A + '$, но меньше $' + B + '$';
		}
		
		NAtask.setTask({
			text: 'Найдите четырёхзначное число, кратное $' + K + '$, произведение цифр которого ' + textCondition + '. В ответе укажите какое-нибудь одно такое число.',
			answers: answers,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=522563
