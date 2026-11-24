(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = "11607036";
		let preference = ['findS', 'findA', 'findP', 'findN'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let A = sl(10000, 100000, 500);
		let p = sl(6, 21);
		let n = sl(2, 3);

		let factor = Math.pow(1 + p / 100, n);
		let S = A * factor;

		genAssert(S.isAlmostInteger(), "Итоговая сумма должна быть целой");

		let knownParts = [];
		if (rand !== 1) {
			knownParts.push('$A = ' + A + '$')
		}
		if (rand !== 2) {
			knownParts.push('$p = ' + p + '\\%$')
		}
		if (rand !== 3) {
			knownParts.push('$n = ' + n + '$')
		}
		if (rand !== 0) {
			knownParts.push('$S = ' + S + '$')
		}
		let knownText = knownParts.join(', ') + '.';

		NAtask.setTask({
			text: 'Для определения итоговой суммы вклада без возможности пополнения и частичного снятия ' +
				'денежных средств в банках используется формула расчёта ' +
				'$S = A \\cdot \\left(1 + \\frac{p}{100}\\right)^n$, где $A$ — первоначальная сумма вклада (в рублях), ' +
				'$p$ — годовая ставка по вкладу (в процентах), $n$ — срок размещения вклада (в годах), ' +
				'$S$ — итоговая сумма вклада (в рублях). ' +
				'Найдите ' + ['итоговую сумму вклада $S$', 'первоначальную сумму вклада $A$', 'годовую процентную ставку $p$ (в %)', 'срок размещения вклада $n$ (в годах)'][rand] +
				', если ' + knownText + ' Ответ дайте в рублях.',
			answers: [S, A, p, n][rand],
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//11607036
//Открытый банк заданий B11BFC
//zer00player
