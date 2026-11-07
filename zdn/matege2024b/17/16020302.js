(function () {
	'use strict';
	let preference = ['bothSides', 'bracketsAndVariable', 'bracketsAndConstant'];
	let variant = getSelectedPreferenceFromList('16020302', preference);
	let x = sl(-30, 30) / 10;
	let step = [1, 2, 5, 10].filter(n => (n * x).isZ()).iz();
	let a = sl(1, 5).pm();
	let b = sl(1, 4).pm();
	let c = sl(1, 8).pm();
	let d = sl(1, 8).pm();
	let left, slope;
	if (variant === 0) {
		slope = a * step;
		left = [slope + 'x', d].shuffle().slag0();
	} else {
		let bracket = a + '(' + [b * step + 'x', c].shuffle().slag0() + ')';
		slope = a * b * step;
		if (variant === 1) {
			left = [bracket, d * step + 'x'].shuffle().slag0();
			slope += d * step;
		} else {
			left = [bracket, d].shuffle().slag0();
		}
	}
	let rightSlope = slKrome(slope / step, variant ? -5 : 1, 5);
	if (variant === 2 && !sl1() && slope !== 0) {
		rightSlope = 0;
	}
	rightSlope *= step;
	let leftConstant = variant === 0 ? d : a * c + (variant === 2 ? d : 0);
	let rightConstant = Math.round(leftConstant + (slope - rightSlope) * x);
	let right = [rightSlope ? rightSlope + 'x' : 0, rightConstant].shuffle().slag0() || '0';
	chas2.task.setEquationTask({
		parts: [left, right],
		roots: x,
		enablePartsExchange: 0,
		enablePartsDivision: 0,
		preference: preference,
	});
})();

// F4734E, A89186, D946F5, 8DA718, 9E55AE, E5A16C, E9FBF6, 8D2C06, 481D7A, B15DCE, BED672, 9F24ED, C118BD, 2A3583, C1E814, 9A2456, 2EFA5B, 291351, D78CF6, 4CC2D4, 902E52, A15806, F61E6B, B38712, AA5AF0, FCCA19, 167195, 25D0EA, EDCC7C, B4E7AD, 34A032, 560777, DAF255, AECDC2, 38F29A, 74D37B, 0555FB, A353D5, 314609, 5B8EDD, BA0BA3, D5DBB2, E4D0B8, 7C9521
