(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '506277';
	let preference = ['scaledLog', 'shiftedLog', 'negativeMultiplier'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let base = sl(2, 9);
	let argument = sl(2, 15);
	let logarithm = () => 'varlog(' + base + ',' + argument + ')';
	let exponent;
	if (variant === 0) {
		exponent = sl(2, 4) + '*' + logarithm();
	} else if (variant === 1) {
		let shift = sl(1, 3);
		if (sl1()) {
			exponent = [shift + '+' + logarithm(), logarithm() + '+' + shift].iz();
		} else {
			base = [2, 4, 5].iz();
			shift = base === 4 ? 1 : sl(1, 2);
			exponent = logarithm() + '-' + shift;
		}
	} else {
		argument = [2, 5, 10].iz();
		exponent = '-' + sl(1, 2) + '*' + logarithm();
	}
	NAtask.setEvaluationTask({
		expr: base + '^(' + exponent + ')',
		authors: ['Алендарь Сергей'],
		preference,
	});
})();
// 420E00, C1C74D, C58700, D7D277, F4AFB5, ECF3BC, 3FBDB2, C6291A, 22D72D, 930328, C1C2A3, 46F0CE, F3E4C3, E4F1CC, 846A96, 1E158B, D724F9, 994A85, 807906, A05B24, AE3E47, 1EBDFD, 6E1BD5, 87F9AF, 7C59C9, E83B6B, 9E9B3C, DDCA0C, 58C60D, 6D4609, BE4C1F, 26C510, 9B531B, 76DBC8, A6D2CA, 231964, DF0281, ED7682, BCD442, C5B202, 243E99, E909E2
