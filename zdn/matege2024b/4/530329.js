(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '530329';
		let preference = ['findSin', 'findA'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(1, 30);
		let b = slKrome([a], 1, 30);

		let deNumA = sl(3, 50);
		let deNumB = slKrome([deNumA], 3, 50);
		let numA = sl(1, deNumA - 1);
		let numB = slKrome([numA], 1, deNumB - 1);

		if (rand === 0) {
			genAssertZ1000(numA / deNumA, 'должно быть не более 3 - х знаков после запятой');
		}

		genAssert(a * deNumA / numA - b * deNumB / numB === 0, 'должна выполняться теорема');

		NAtask.setTask({

			text: 'Теорему синусов можно записать в виде  $ \\frac{a}{\\sin{\\alpha}} = \\frac{b}{\\sin{\\beta}} $' +
				', где $a$ и $b$ - две стороны треугольника, а $\\alpha$ и $\\beta$ - углы треугольника, лежащие против них соответственно. ' +
				' Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['$\\sin{\\alpha}$', '$a$'][rand] +
				', если ' + ['$a =' + a + '$', '$\\sin{\\alpha} = \\frac{' + numA + '}{' + deNumA + '}$'][rand] + ', $b =' + b + '$, $\\sin{\\beta} = \\frac{' + numB + '}{' + deNumB + '}$.',
			answers: [numA / deNumA, a][rand],
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=530329
