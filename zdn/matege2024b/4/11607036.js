(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let A = sl(10000, 100000, 500);
		let p = sl(6, 21);
		let n = sl(2, 3);

		let factor = Math.pow(1 + p / 100, n);
		let S = A * factor;

		genAssert(S.isAlmostInteger(), "Итоговая сумма должна быть целой");

		NAtask.setTask({
			text: 'Для определения итоговой суммы вклада без возможности пополнения и частичного снятия ' +
				'денежных средств в банках используется формула расчёта ' +
				'$S = A \\cdot \\left(1 + \\frac{p}{100}\\right)^n$, где $A$ — первоначальная сумма вклада (в рублях), ' +
				'$p$ — годовая ставка по вкладу (в процентах), $n$ — срок размещения вклада (в годах), ' +
				'$S$ — итоговая сумма вклада (в рублях). ' +
				'Найдите итоговую сумму вклада, если $A = ' + A + '$, $p = ' + p + '\\%$, $n = ' + n + '$. ' +
				'Ответ дайте в рублях.',
			answers: S,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//11607036
//zer00player
