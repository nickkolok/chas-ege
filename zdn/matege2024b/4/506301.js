(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506301';
		let preference = ['noSqrt', 'withSqrt'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(2, 30);
		let b = slKrome([a], 2, 30);
		let c = slKrome([a, b], 2, 30);

		genAssert(isValidTriangle(a, b, c), 'должно быть треугольником');

		let p = (a + b + c) / 2;
		let r = ((p - a) * (p - b) * (p - c)).sqrt();

		let S = ((a + b + c) * r) / 2;
		let sqrt = slKrome([4, 9], 2, 15);

		genAssertZ1000(S, 'должно быть не более 3 - х знаков после запятой');

		NAtask.setTask({

			text: 'Площадь треугольника можно вычислить по формуле $S =\\frac{(a+b+c)r}{2}$, где $a$, $b$ и $c$ – стороны треугольника, ' +
				'а $r$ – радиус окружности, ' + 'вписанной в этот треугольник. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' $b$, если $a = ' + a + '$, $c = ' + c + '$, $S =' + S + ['', ' \\sqrt{' + sqrt + '}'][rand] +
				'$ и $r = ' + r + ['', ' \\sqrt{' + sqrt + '}'][rand] + '$.',
			answers: b,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=506301
