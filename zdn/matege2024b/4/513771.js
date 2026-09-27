(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '513771';
		let preference1 = ['useQ', 'useU'];
		let preference2 = ['lessWords', 'moreWords'];
		let rand = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let the_orderToFind = decor.orderToFind.iz();

		let C = sl(1, 10);
		let q = slKrome([C], 2, 15);
		let U = slKrome([C], 2, 15);

		let answer;
		if (rand === 0) {
			answer = q ** 2 / (2 * 0.0001 * C);
		} else {
			answer = C * (10).pow(-4) * U ** 2 / 2;
		}

		genAssertZ1000(answer, 'должно быть не более 3-х знаков после запятой');

		NAtask.setTask({

			text: 'Энергия заряженного конденсатора $W$ (в ' + ['Дж', 'джоулях'][rand2] + ') вычисляется по формуле $' +
				['W = \\frac{q^2}{2C}', 'W = \\frac{CU^2}{2}'][rand] + '$, где $C$ – ёмкость конденсатора (в ' + ['Ф', 'фарадах'][rand2] + '), а ' +
				['$q$ – заряд на одной обкладке конденсатора (в ' + ['Кл', 'кулонах'][rand2] + ')',
				'$U$ – разность потенциалов на обкладах конденсатора (в ' + ['В', 'вольтах'][rand2] + ')'][rand] + '. ' +
				the_orderToFind.toZagl() + [' $W$ (в Дж)', ' энергию конденсатора ёмкостью '][rand2] + [', если $C$ = $' + C + '$', '$' + C + '$'][rand2] +
				'$\\cdot 10^{-4}$ ' + ['Ф', 'фарад'][rand2] + [' и', ', если'][rand2] + ' ' +
				[['$q =' + q + '$' + ' Кл', '$U =' + U + '$' + ' В'][rand],
				['заряд на одной обкладке конденсатора равен ' + chislitlx(q, 'кулон', 'd$'),
				'разность потенциалов на обкладах конденсатора равна ' + chislitlx(U, 'вольт', 'd$')][rand]][rand2] + ['', '. Ответ дайте в джоулях'][rand2] + '.',
			answers: answer,
			preference: [preference1, preference2],

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=513771
//https://mathb-ege.sdamgia.ru/problem?id=513811
