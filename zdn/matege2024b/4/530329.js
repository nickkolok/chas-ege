(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '530329';
		let preference = ['findSin', 'findSide'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let a = sl(1, 30);
		let b = slKrome(a, 1, 30);
		let denominator = sl(Math.max(a, b) + 1, 100);
		let sinA = a / denominator;
		if (variant === 0) genAssertZ1000(sinA, 'Искомый синус должен быть конечной десятичной дробью');
		NAtask.setTask({
		    text: 'Теорему синусов можно записать в виде $\\frac{a}{\\sin\\alpha}=\\frac{b}{\\sin\\beta}$, где $a$ и $b$ — стороны треугольника, ' +
		        'а $\\alpha$ и $\\beta$ — противолежащие им углы. Пользуясь этой формулой, найдите $' +
		        ['\\sin\\alpha', 'a'][variant] + '$, если $b=' + b + '$, $\\sin\\beta=' + b.texfrac(denominator) + '$ и $' +
		        ['a=' + a, '\\sin\\alpha=' + a.texfrac(denominator)][variant] + '$.',
		    answers: [sinA, a][variant], preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=530329
// ФИПИ: сопоставленные позиции категории 4 и все исходные коды.
// 4.31: D56049, F907F0, AA2104, 8E9100, 0CFD73, 95636F, 54EF31, 2F9781, 5A77BE, 6D671F
// 4.32: C5F1C6
// 4.33: B81F9F
// 4.34: 362DD6, 5E188B
// 4.50: 8A5AA3, FC96A3
// 4.51: DAA842, 2A63BF, 0FC6A7
