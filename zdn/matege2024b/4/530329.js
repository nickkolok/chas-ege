(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '530329';
		let preference = ['findSin', 'findSide'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(1, 30);
		let b = slKrome([a], 1, 30);

		let deNumA = sl(3, 50);
		let numA = sl(1, deNumA - 1);
		let sinA = numA / deNumA;

		genAssertZ1000(sinA, 'sinA должно быть не более 3 знаков после запятой');

		let sinB = (sinA * b) / a;

		genAssertZ1000(sinB, 'sinB должно быть не более 3 знаков после запятой');
		genAssert(sinB < 1, 'sinB не должен превышать 1');

		let nameLetter = ['a', 'b'];
		let nameSin = ['\\alpha', '\\beta'];

		NAtask.setTask({

			text: 'Теорему синусов можно записать в виде  $ \\frac{a}{\\sin{\\alpha}} = \\frac{b}{\\sin{\\beta}} $' +
				', где $a$ и $b$ - две стороны треугольника, а $\\alpha$ и $\\beta$ - углы треугольника, лежащие против них соответственно. ' +
				' Пользуясь этой формулой, ' + the_orderToFind + ' ' + '$' + ['\\sin{' + nameSin[0] + '}', nameLetter[0]][rand] + '$' +
				', если ' + '$' + [nameLetter[0] + ' =' + a, '\\sin{' + nameSin[0] + '} =' + sinA.texfrac(1)][rand] + '$' +
				', $' + nameLetter[1] + ' =' + b + '$, $\\sin{' + nameSin[1] + '} = ' + sinB.texfrac(1) + '$.',
			answers: [sinA, a][rand],
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=530329
