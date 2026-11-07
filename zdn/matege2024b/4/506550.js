(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '506550';
		let preference = ['l_c', 'm_c'];
		let preferenceSides = ['integerSides', 'radicalSides'];
		let kind = getSelectedPreferenceFromList(key, preference);
		let form = getSelectedPreferenceFromList(key, preferenceSides);
		let aSquared = sl(2, 20) ** 2;
		let bSquared = sl(2, 20) ** 2;
		let cSquared = sl(2, 20) ** 2;
		if (form) {
		    if (kind === 0) cSquared = sl(2, 600);
		    else { aSquared = sl(2, 200); bSquared = sl(2, 200); }
		    genAssert([aSquared, bSquared, cSquared].some(value => !value.isPolnKvadr()), 'Нужна хотя бы одна иррациональная сторона');
		}
		let a = Math.sqrt(aSquared), b = Math.sqrt(bSquared), c = Math.sqrt(cSquared);
		genAssert(isValidTriangle(a, b, c), 'Фактические стороны должны образовывать треугольник');
		let answer = kind === 0 ? Math.sqrt(a * b * ((a + b) ** 2 - cSquared)) / (a + b) :
		    Math.sqrt(2 * aSquared + 2 * bSquared - cSquared) / 2;
		genAssertZ1000(answer, 'Ответ должен быть конечной десятичной дробью не длиннее трёх знаков');
		let name = ['биссектрисы $l_c$', 'медианы $m_c$'][kind];
		NAtask.setTask({
		    text: 'Длина ' + name + ', проведённой к стороне $c$ треугольника со сторонами $a$, $b$ и $c$, вычисляется по формуле $' +
		        ['l_c=\\frac{1}{a+b}\\sqrt{ab((a+b)^2-c^2)}', 'm_c=\\frac{\\sqrt{2a^2+2b^2-c^2}}{2}'][kind] + '$. ' +
		        'Найдите длину ' + name + ', если $a=' + aSquared.texsqrt(true) + '$, $b=' + bSquared.texsqrt(true) +
		        '$ и $c=' + cSquared.texsqrt(true) + '$.',
		    answers: answer,
		    preference: [preference, preferenceSides],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506550
//https://mathb-ege.sdamgia.ru/problem?id=509649
// ФИПИ: сопоставленные позиции категории 4 и все исходные коды.
// 4.6: CBC679
// 4.7: A52DC9
// 4.8: AB5D4C, E6D17E, 3F25BC, 3658DF, 738250, D0145D, 38865B, 872BC5, 00BE93, A91FE1, 9A54E0, 8F84E8, 70476E
// 4.9: 5E6906, 5F9871, 70E2D3, 864992, D22E39
// 4.18: 9B4845, DC2B79, 86932A
// 4.19: 372847, BF4008, 3B18D8, 5E01A2, A86BCB, 629EEB
// 4.20: E8B2FE, 0EF2D1, 635CC4, 9AE487
// 4.21: 26F726, 910650, CE81EC, 0F6F30, BF8B8C
// 4.22: A43774, 527BCD
