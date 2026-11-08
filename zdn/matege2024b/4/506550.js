(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506550';
		let preference = ['l_c', 'm_c'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(2, 30);
		let b = sl(2, 30);
		let c = sl(2, 30);

		genAssert(isValidTriangle(a, b, c), 'Должно являться треугольником');

		let sqrt = slKrome([4, 9], 2, 15);

		let answer;
		if (rand === 0) {
			answer = (1 / (a + b)) * ((a * b) * ((a + b) ** 2 - (c ** 2 * sqrt))).sqrt();
		} else {
			answer = ((2 * a ** 2 + 2 * (b ** 2 * sqrt) - c ** 2).sqrt()) / 2;
		}
		genAssertZ1000(answer, 'Должно быть не более 3 знаков после запятой');

		NAtask.setTask({

			text: 'Длина ' + ['биссектрисы $l_c$', 'медианы $m_c$'][rand] + ', проведённой к стороне c треугольника со сторонами $a$, $b$ и $c$, вычисляется по формуле' +
				' $' + ['l_c = \\frac{1}{a+b}\\sqrt{ab((a+b)^2-c^2)}', 'm_c = \\frac{\\sqrt{2a^2+2b^2-c^2}}{2}'][rand] + '$. ' +
				the_orderToFind.toZagl() + ' длину ' + ['биссектрисы $l_c$', 'медианы $m_c$'][rand] +
				', если $a = ' + a + '$, $b = ' + b + ['$', '\\sqrt{' + sqrt + '}$'][rand] + ' и $c = ' + c + ['\\sqrt{' + sqrt + '}$', '$'][rand] + '.',
			answers: answer,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506550
//https://mathb-ege.sdamgia.ru/problem?id=509649
