(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '507055';
		let preference = ['12', '15', '18', '22', '30', '60'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let N = [12, 15, 18, 22, 30, 60][rand];

		let multiplier = sl(101, 200);
		let base = N * multiplier;
		let T = base.toString();

		let arr = T.split('');
		for (let i = 0; i < 3; i++) {
			let pos = sl(0, arr.length);
			let digit;
			if (pos === 0) {
				digit = sl(1, 9); // первая цифра — не 0
			} else {
				digit = sl(0, 9);
			}
			arr.splice(pos, 0, digit.toString());
		}
		let S = arr.join('');

		NAtask.setTask({
			text: 'Вычеркните в числе $' + S + '$ три цифры так, чтобы получившееся число делилось на $' + N + '$. В ответе укажите какое-нибудь одно получившееся число.',
			answers: T,
		});

	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=507055
