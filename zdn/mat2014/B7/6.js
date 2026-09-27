(function() {
	'use strict';
	
	let key = '501205';
	let preference1 = ['power_2', 'power_3', 'power_4', 'power_5'];
	let rand1 = getSelectedPreferenceFromList(key, preference1);
	let preference2 = ['no_frac', 'inverse_frac', 'frac'];
	let rand2 = getSelectedPreferenceFromList(key, preference2);

	var b = sluchch(1, 9).pm();
	var power = rand1 + 2;
	var c = sluchch(1, 9);
	if (power % 2) {
		c *= [1, -1].iz();
	}
	var x = sluchch(1, 9);
	var a = c.pow(power) - b * x;
	var textpower = ('[' + power + ']').esli(power != 2);

	var numerator = sl(1, 9);
	var multiplier = sl(1, 9);

	var parts = [
		['\\sqrt' + textpower + '{' + [a, b + 'x'].slag0() + '}', c],
		['\\sqrt' + textpower + '{\\frac{' + numerator.pow(power) * multiplier + '}{' + [('' + a * multiplier).esli(a *
			multiplier), b * multiplier + 'x'].slag() + '}}', numerator.texrndfrac(c)],
		['\\sqrt' + textpower + '{\\frac{' + [('' + a * multiplier).esli(a * multiplier), b * multiplier + 'x'].slag() +
			'}{' + numerator.pow(power) * multiplier + '}}', c.texrndfrac(numerator)
		],
	][rand2];


	chas2.task.setEquationTask({
		parts: parts,
		roots: x,
		enablePartsSubtraction: 1,
		preference: [preference1, preference2],
	});
})();
// В том числе РешуЕГЭ 501205
