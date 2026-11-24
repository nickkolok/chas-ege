(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '507055';
		let preference = ['12', '15', '18', '22', '30', '60'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let N = [12, 15, 18, 22, 30, 60][rand];

		let multiplier = sl(101, 999);
		let T = (N * multiplier).toString();

		let arr = T.split('');
		for (let i = 0; i < 3; i++) {
			let pos = sl(0, arr.length);
			let digit = (pos === 0) ? sl(1, 9).toString() : sl(0, 9).toString();
			arr.splice(pos, 0, digit);
		}
		let S = arr.join('');
		function getAllSubsequences(str, toRemove) {
			let result = new Set();
			let n = str.length;
			let keep = n - toRemove;

			function dfs(pos, current) {
				if (current.length === keep) {
					if (current[0] === '0' && current.length > 1) {
						return;
					}
					result.add(current);
					return;
				}
				if (pos >= n) {
					return;
				}
				dfs(pos + 1, current + str[pos]);
				dfs(pos + 1, current);
			}
			dfs(0, '');
			return Array.from(result);
		}
		let candidates = getAllSubsequences(S, 3);
		let validAnswers = [];
		for (let cand of candidates) {
			let num = parseInt(cand, 10);
			if (num % N === 0) {
				validAnswers.push(cand);
				if (validAnswers.length >= 3) {
					break;
				}
			}
		}

		genAssert(validAnswers.length > 0, `Не найдено ни одного числа, делящегося на N, после вычёркивания 3 цифр из S`);

		NAtask.setTask({
			text: 'Вычеркните в числе $' + S + '$ три цифры так, чтобы получившееся число делилось на $' + N + '$. В ответе укажите какое-нибудь одно получившееся число.',
			answers: validAnswers,
			preference: preference,
		});

	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=507055
