(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let subjects = sklonlxkand(['ученик', 'ученица', 'студент', 'студентка'].iz());

		let m = sl(40, 80, 5); // масса от 40 до 80 кг, кратная 5
		let g = 10; // ускорение свободного падения, м/с^2
		let answer = m * g;

		NAtask.setTask({
			text: 'Масса ' + subjects.re + ' равна ' + m + ' кг. Чему равна сила, с которой ' + 
			      subjects.ie + ' притягивает к себе Землю? Ответ дайте в ньютонах.',
			answers: answer,
			analys: 'По третьему закону Ньютона ' + subjects.ie + ' и Земля притягивают друг друга с равными по модулю ' +
				'и противоположно направленными силами. Земля притягивает тело массой $' + m + '$ кг с силой тяжести ' +
				'$F = mg = ' + m + ' \\cdot ' + g + ' = ' + answer + '$ Н. ' +
				'Значит, и ' + subjects.ie + ' притягивает Землю с силой $' + answer + '$ Н.',
		});
	}, 2000);
})();
// https://3.shkolkovo.online/catalog/3067/71216
// https://github.com/nickkolok/chas-ege/issues/3522
// ФИПИ D2CAED
