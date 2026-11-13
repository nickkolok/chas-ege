(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let preference = ['bothSides', 'bracketsAndVariable', 'bracketsAndConstant'];
	let variant = getSelectedPreferenceFromList('509214', preference);
	retryWhileError(function () {
		let a = slKrome(0, -10, 10);
		let b = slKrome(0, -10, 10);
		let c = sl(-10, 10);
		let d = sl(-10, 10);
		let rightSlope = sl(-10, 10);
		let rightConstant = sl(-10, 10);
		let left, slope, constant;
		if (variant === 0) {
			left = [a + 'x', d].slag0();
			slope = a;
			constant = d;
		} else {
			let bracket = a + '(' + [b + 'x', c].slag0() + ')';
			left = [bracket, variant === 1 ? d + 'x' : d].slag0();
			slope = a * b + (variant === 1 ? d : 0);
			constant = a * c + (variant === 2 ? d : 0);
		}
		genAssert(slope !== rightSlope, 'Уравнение должно иметь один корень');
		let x = (rightConstant - constant) / (slope - rightSlope);
		genAssertZ1000(x);
		chas2.task.setEquationTask({
			parts: [left, [rightSlope + 'x', rightConstant].slag0() || '0'],
			roots: x,
			enablePartsExchange: 0,
			enablePartsDivision: 0,
			preference: preference,
		});
	}, 1000);
})();
// РешуЕГЭ 509214, 509712
// F4734E, A89186, D946F5, 8DA718, 9E55AE, E5A16C, E9FBF6, 8D2C06, 481D7A, B15DCE, BED672, 9F24ED, C118BD, 2A3583, C1E814, 9A2456, 2EFA5B, 291351, D78CF6, 4CC2D4, 902E52, A15806, F61E6B, B38712, AA5AF0, FCCA19, 167195, 25D0EA, EDCC7C, B4E7AD, 34A032, 560777, DAF255, AECDC2, 38F29A, 74D37B, 0555FB, A353D5, 314609, 5B8EDD, BA0BA3, D5DBB2, E4D0B8, 7C9521

