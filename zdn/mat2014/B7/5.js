(function() {
	'use strict';
	let key = '26652';
	let preference = ['frac', 'no_frac'];
	let rand = getSelectedPreferenceFromList(key, preference);

	var d = sluchch(2, 9);
	var f = [2, 4].iz();
	var a = d.pow(f);
	var c = sluchch(1, 9).pm();
	var x = -1 / f - c;
	var p;
	switch (rand) {
	case 0:
		p = ['\\left(\\frac{1}{' + a + '}\\right)^{' + 'x+' + c + '}', d];
		break;
	case 1:
		p = ['{' + a + '}^{' + 'x+' + c + '}', (1).texfrac(d)];
		break;
	}
	chas2.task.setEquationTask({
		parts: p,
		roots: x,
		enablePartsSubtraction: 1,
		enablePartsExchange: 0,
	}, {
		tags: {
			drs: 1
		},
		preference: preference, 
	});
})();

//https://math-ege.sdamgia.ru/problem?id=26652
//https://math-ege.sdamgia.ru/problem?id=26654
