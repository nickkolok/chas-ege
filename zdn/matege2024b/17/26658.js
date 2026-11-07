(function () {
	'use strict';
	let preference = ['squareRoot', 'reciprocalSquareRoot'];
	let variant = getSelectedPreferenceFromList('26658', preference);
	let value = sl(2, 12);
	let x, left, right;
	if (variant === 0) {
		x = sl(-20, 20) / 2;
		let slope = sl(1, 6).pm() * (x.isZ() ? 1 : 2);
		left = '\\sqrt{' + [slope + 'x', value * value - slope * x].slag0() + '}';
		right = value;
	} else {
		x = value * value;
		left = (1).texfrac('\\sqrt{x}');
		right = (1).texfrac(value);
	}
	chas2.task.setEquationTask({
		parts: [left, right],
		roots: x,
		enablePartsExchange: 0,
		enablePartsDivision: 0,
		preference: preference,
	}, { tags: { iras: 1 } });
})();

// 67E07E, B24E2D, B1E129, C24306, C859C1, 57B229, F54472, F8C0A8, 1B6980, BEDBF2, 0594AE, BD2AE1, C3E34A, D8000C, 9FEE01, 02F6B5, 1C6FC9, 859866, 64F731, 934D07, 8EDC07, 94EBB4, 744D55, EB63E4, 61C59D, 75896E, F3734B, 90C341, 9857FF, FCD672, 3F1FAC
