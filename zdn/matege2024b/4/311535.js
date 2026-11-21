(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '311535';
		let preference = ['findR', 'findC'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(2, 50);
		let b = slKrome([a], 2, 50);
		let c = (a ** 2 + b ** 2).sqrt();
		genAssertZ1000(c, 'должно быть до 3-х знаков');
		let R = (a + b - c) / 2;

		NAtask.setTask({

			text: 'Радиус вписанной в прямоугольный треугольник окружности вычиcляется по формуле $r = \\frac{a+b-c}{2}$, где $a$ и $b$ – катеты' +
				', а $c$ – гипотенуза. ' + 'Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['$r$', '$c$'][rand] +
				', если $a = ' + a + '$, $b = ' + b + '$ и $' + ['c = ' + c, 'r = ' + R][rand] + '$.',
			answers: [R, c][rand],
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//zer00player
//https://oge.sdamgia.ru/problem?id=311535
