(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '513771';
		let preference1 = ['useQ', 'useU'];
		let preference2 = ['lessWords', 'moreWords'];
		let formula = getSelectedPreferenceFromList(key, preference1);
		let wording = getSelectedPreferenceFromList(key, preference2);
		let coefficient = sl(1, 10);
		let C = coefficient / 10000;
		let q = sl(1, 900) / 10000;
		let U = sl(2, 20);
		let energy = formula === 0 ? q * q / (2 * C) : C * U * U / 2;
		genAssert((energy * 100000).isAlmostInteger(), 'Ответ должен иметь не более пяти знаков после запятой');
		let answer = +energy.toFixed(5);
		NAtask.setTask({
		    text: 'Энергия заряженного конденсатора $W$ (в ' + ['Дж', 'джоулях'][wording] + ') вычисляется по формуле $' +
		        ['W=\\frac{q^2}{2C}', 'W=\\frac{CU^2}{2}'][formula] + '$, где $C$ — ёмкость в фарадах, ' +
		        (formula === 0 ? '$q$ — заряд на одной обкладке в кулонах.' : '$U$ — разность потенциалов в вольтах.') +
		        ' Найдите энергию, если $C=' + coefficient + '\\cdot10^{-4}$ Ф и $' +
		        [ 'q=' + q.ts(true) + '$ Кл.', 'U=' + U + '$ В.'][formula] + ' Ответ дайте в джоулях.',
		    answers: answer, preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=513771
//https://mathb-ege.sdamgia.ru/problem?id=513811
// ФИПИ: сопоставленные позиции категории 4 и все исходные коды.
// 4.86: BB836B, B18BA1, F47F83
// 4.87: EE3E4A, B80856, 9E6080, E76124, BA7487, 662485
// 4.88: 9331CD
// 4.89: 49AF19, BA932F, 8394C4, EE23EF, F8B874, 49BEEB, 598136
// 4.105: 727E60, 17EC80
// 4.106: CCB181, E9B484
