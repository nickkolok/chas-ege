(function () {
	'use strict';
	// Формула для двух квадратов взята из zdn/mat2014/B7/77368.js.
	let preference = ['equalSquares', 'differenceOfSquares'];
	let variant = getSelectedPreferenceFromList('77368', preference);
	let x = sl(-12, 12) / 4;
	let a = sl(1, 5);
	let b = variant === 1 && (2 * a * x).isZ() && x !== 0 ? 0 : slKrome(-a * x, -9, 9);
	let c = -2 * a * x - b;
	function square(constant) {
		if (!constant) {
			return [(a * a).toString(), 'x^2'].join('').replace(/^1x/, 'x');
		}
		return '(' + [a + 'x', constant.ts()].slag0() + ')^2';
	}
	chas2.task.setEquationTask({
		parts: variant === 0 ? [square(b), square(c)] : [square(b) + '-' + square(c), 0],
		roots: x,
		enablePartsExchange: 0,
		enablePartsDivision: 0,
		preference: preference,
	});
})();

// 6FEDF1, BD21B6, B35CF7, 714CB5, B5CC1A, 6B09AD, 1241D3, F1E4C3, E652DC, A16D64, 659171, 24A3B9, C423FA, 870F10
