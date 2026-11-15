(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();
		let a = sl(2, 30);
		let b = slKrome([a], 2, 30);
		let c = slKrome([a, b], 2, a + b - 1);

		genAssert(isValidTriangle(a, b, c), 'Должно выполняться правило треугольника');

		let p = (a + b + c) / 2;
		let triangle = (p * (p - a) * (p - b) * (p - c)).sqrt();

		genAssert(triangle.isZ(), "результат должен быть целым");

		NAtask.setTask({
			text: 'Площадь треугольника со сторонами $a$, $b$, $c$ можно найти по формуле Герона $S = \\sqrt{p(p-a)(p-b)(p-c)}$, где $p = \\frac{a+b+c}{2}$. '
				+ the_orderToFind.toZagl() + ' площадь треугольника, ' +
				'если длины его сторон равны $' + a + '$, $' + b + '$, $' + c + '$.',
			answers: triangle,


		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506387
