(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506276';
		let preference = ['geometric', 'quadratic', 'harmonic', 'quadraticRadicals'];
		let rand = getSelectedPreferenceFromList(key, preference);


		let the_orderToFind = decor.orderToFind.iz();
		let word = ['геометрическое', 'квадратичное', 'гармоническое', 'квадратичное'][rand];

		let a = sl(1, 50);
		let b = slKrome([a], 1, 50);
		let c = slKrome([a, b], 1, 50);

		let squared = [];
		let quadraticMean;
		if (rand === 3) {
			quadraticMean = sl(2, 12);
			let total = 3 * quadraticMean ** 2;
			squared = [sl(1, total - 2), 0, 0];
			squared[1] = sl(1, total - squared[0] - 1);
			squared[2] = total - squared[0] - squared[1];
			genAssert(squared.some(value => !value.isPolnKvadr()), 'Хотя бы один корень должен быть иррациональным');
		}

		let answer = [(a * b * c).cbrt(), ((a ** 2 + b ** 2 + c ** 2) / 3).sqrt(), 3 / (a + b + c), quadraticMean][rand];

		genAssertZ1000(answer, 'Должно быть не более 3 знаков после запятой');

		NAtask.setTask({

			text: 'Среднее ' + word + ' трёх чисел $a$, $b$ и $c$ вычисляется по формуле $ ' +
				['g = \\sqrt[3]{abc}', 'q = \\sqrt{\\frac{a^2+b^2+c^2}{3}}', 'h =  \\left(\\frac{\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}}{3} \\right)^{-1}', 'q = \\sqrt{\\frac{a^2+b^2+c^2}{3}}'][rand] + '$. ' +
				the_orderToFind.toZagl() + ' среднее ' + word +
				' чисел $' + [a, a, '\\frac{1}{' + a + '}', rand === 3 ? squared[0].texsqrt(true) : ''][rand] + '$, $' + [b, b, '\\frac{1}{' + b + '}', rand === 3 ? squared[1].texsqrt(true) : ''][rand] + '$, $' + [c, c, '\\frac{1}{' + c + '}', rand === 3 ? squared[2].texsqrt(true) : ''][rand] + '$.',
			answers: answer,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506276
//https://mathb-ege.sdamgia.ru/test?likes=506737
//https://mathb-ege.sdamgia.ru/test?likes=506507
// 109643, 7AA300, B10B19, 240C2A, F033D2, BE90D5, C2E3AB, C06B37, AB5289, 0B99FF, 9E9BF6, 0E0308, E5D1B6, F40011, F5D525, 76BE28, 150F9F, C2199F, B8B9E9, A76AEC, 145C04, 838CBA, BA1FF7, E315F4, 73E17B, 889272, 56FF19, 28C9D4, 9A45D3, E38DA3, D7E5E9, 7B7C62, 391C33, 33548E, 51FCD6, 850AA9, 42C70A, 00B3B8, 02C5B8, 9C5B9F, 96AF93, A1A4D0, 7DB79E, A7088F, E00043, 31834E, 558922, B9AAA7, 24E1C2, E703E2, 575E67, F1183A, E9DEC1, E26062, F4E277, 6186AC, 166E9C, F712E7, F2F579, 5BF171, C570BF, 6890D9
