(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506300';
		let preference = ['findR', 'findA'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(2, 15);
		let deNum = sl(3, 20);
		let num = (1, deNum - 1);

		let R = a / (2 * (num / deNum));
		genAssertZ1000(R, 'Должно быть не более 3 знаков после запятой');

		NAtask.setTask({
			text: 'Радиус окружности, описанной около треугольника, ' +
				'можно вычислить по формуле $R = \\frac{a}{2\\sin{\\alpha}}$, где $a$ – сторона, ' +
				'а $\\alpha$ – противолежащий ей угол треугольника. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' $' + ['R', 'a'][rand] + '$' +
				', если $' + ['a =' + a, 'R =' + R][rand] + '$ и $\\sin{\\alpha} = \\frac{' + num + '}{' + deNum + '}$.',
			answers: [R, a][rand],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506300
