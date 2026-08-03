(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506301';
		let preference = ['noSqrt', 'withSqrt'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();
		let letter = ['a', 'b', 'c'].shuffle();

		let p = sl(2, 10).pow(2);

		let a = sl(1, p - 1);
		let b = slKrome([a], 1, p - 2);
		let c = 2 * p - a - b;

		genAssert(a != c, 'Равнобедренный треугольник');

		let triangle = new Triangle({
			lengths: {
				lengthAB: a,
				lengthBC: b,
				lengthCA: c,
			},
		});

		let r = triangle.radiusOfInscribedCircle;
		let r2 = r * r;
		let S = triangle.area();
		let S2 = S * S;

		if (rand === 0) {
			genAssertZ1000(S, 'должно быть не более 3 - х знаков после запятой');
			genAssertZ1000(r, 'должно быть не более 3 - х знаков после запятой');
		} else {
			genAssert(!r2.isPolnKvadr());
			genAssertAlmostInteger(r2, 'должно быть не более 3 - х знаков после запятой');
		}

		NAtask.setTask({

			text: 'Площадь треугольника можно вычислить по формуле $S =\\frac{(a+b+c)r}{2}$, где $a$, $b$ и $c$ – стороны треугольника, ' +
				'а $r$ – радиус окружности, ' + 'вписанной в этот треугольник. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' $' + letter[1] + '$, если $' + letter[0] + ' = ' + a + '$, $' + letter[2] + ' = ' + c + '$,' +
				' $S =' + [S, S2.okrugldo(0.0001).texsqrt(1)][rand] + '$ и $r = ' + [r, r2.okrugldo(0.0001).texsqrt(1)][rand] + '$.',
			answers: b,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=506301
