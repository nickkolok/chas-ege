(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	
	let key = '501205';
	let preference1 = ['power_2', 'power_3', 'power_4', 'power_5'];
	let rand1 = getSelectedPreferenceFromList(key, preference1);
	let preference2 = ['no_frac', 'inverse_frac', 'frac', 'reciprocalSquareRoot'];
	let rand2 = getSelectedPreferenceFromList(key, preference2);

	var b = sluchch(1, 9).pm();
	var power = rand1 + 2;
	var c = sluchch(1, 12);
	if (power % 2) {
		c *= [1, -1].iz();
	}
	var x = sluchch(-100, 100) / 2;
	if (rand2 === 3) {
		x = c * c;
	}
	var a = c.pow(power) - b * x;
	var textpower = ('[' + power + ']').esli(power != 2);

	var numerator = sl(1, 9);
	var multiplier = sl(1, 9);

	var parts = [
		['\\sqrt' + textpower + '{' + [a, b + 'x'].shuffle().slag0() + '}', c],
		['\\sqrt' + textpower + '{\\frac{' + numerator.pow(power) * multiplier + '}{' + [a * multiplier, b * multiplier + 'x'].slag0() + '}}', numerator.texrndfrac(c)],
		['\\sqrt' + textpower + '{\\frac{' + [a * multiplier, b * multiplier + 'x'].slag0() +
			'}{' + numerator.pow(power) * multiplier + '}}', c.texrndfrac(numerator)
		],
		[(1).texfrac('\\sqrt{x}'), (1).texfrac(c.abs())],
	][rand2];


	chas2.task.setEquationTask({
		parts: parts,
		roots: x,
		enablePartsSubtraction: rand2 !== 3,
		customPreamble: ['Найдите корень уравнения', 'Решите уравнение'].iz(),
		preference: [preference1, preference2],
	});
})();
// В том числе РешуЕГЭ 501205
// 67E07E, B24E2D, B1E129, C24306, C859C1, 57B229, F54472, F8C0A8, 1B6980, BEDBF2, 0594AE, BD2AE1, C3E34A, D8000C, 9FEE01, 02F6B5, 1C6FC9, 859866, 64F731, 934D07, 8EDC07, 94EBB4, 744D55, EB63E4, 61C59D, 75896E, F3734B, 90C341, 9857FF, FCD672, 3F1FAC
