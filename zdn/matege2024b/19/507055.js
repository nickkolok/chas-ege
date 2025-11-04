(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '507055';
		let preference = ['12', '15', '18', '22', '30', '60'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let N = [12, 15, 18, 22, 30, 60][rand];

		let T = '';
		if (N === 22) {
			let attempts = 0;
			while (attempts++ < 50) {
				let d = [sl(1, 9), sl(0, 9), sl(0, 9), sl(0, 9), [0, 2, 4, 6, 8][sl(0, 4)]];
				let sumOdd = d[0] + d[2] + d[4];
				let sumEven = d[1] + d[3];
				if ((sumOdd - sumEven) % 11 === 0) {
					T = d.join('');
					break;
				}
			}
			genAssert(T !== '', 'Не удалось создать число для 22');
		} else {
			let templates = {
				12: ['10020', '10140', '10212', '10308', '10404', '10500', '10608', '10716', '10824', '10932'],
				15: ['10005', '10020', '10035', '10050', '10065', '10080', '10095', '10110', '10125', '10140'],
				18: ['10008', '10026', '10044', '10062', '10080', '10098', '10116', '10134', '10152', '10170'],
				30: ['10020', '10050', '10080', '10110', '10140', '10170', '10200', '10230', '10260', '10290'],
				60: ['10020', '10080', '10140', '10200', '10260', '10320', '10380', '10440', '10500', '10560']
			};
			T = templates[N][sl(0, 9)];
		}

		let arr = T.split('');
		for (let i = 0; i < 3; i++) {
			let pos = sl(0, arr.length);
			let digit;
			if (pos === 0) {
				digit = sl(1, 9);
			} else {
				digit = sl(0, 9);
			}
			arr.splice(pos, 0, digit.toString());
		}
		let S = arr.join('');

		NAtask.setTask({
			text: 'Вычеркните в числе $' + S + '$ три цифры так, чтобы получившееся число делилось на $' + N + '$. В ответе укажите какое-нибудь одно получившееся число.'
			,
			answers: T,
		});

	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=507055
