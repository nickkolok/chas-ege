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
		let r;
		let S;
		if (rand === 0) {

			r = ((p - a) * (p - b) * (p - c)).sqrt();

			S = ((a + b + c) * r) / 2;
			genAssertZ1000(S, 'должно быть не более 3 - х знаков после запятой');
		} else {
			let triangle = new Triangle({
				lengths: {
					lengthAB: a, lengthBC: b, lengthCA: c,
				},
			})
			S = triangle.area();
			genAssertAlmostInteger(S * S);
			r = triangle.radiusOfInscribedCircle;
			genAssertZ1000(r * r);
		}

		NAtask.setTask({

			text: 'Площадь треугольника можно вычислить по формуле $S =\\frac{(a+b+c)r}{2}$, где $a$, $b$ и $c$ – стороны треугольника, ' +
				'а $r$ – радиус окружности, ' + 'вписанной в этот треугольник. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' $b$, если $a = ' + a + '$, $c = ' + c + '$, $S =' + [S, (S * S).okrugldo(0.0001).texsqrt(1)][rand] +
				'$ и $r = ' + [r, (r * r).okrugldo(1).texsqrt(1)][rand] + '$.',
			answers: b,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=506301
