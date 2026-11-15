(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let m = sl(40, 80, 5); // масса ученика от 40 до 80 кг с шагом 5
		let g = 10; // ускорение свободного падения, м/с^2
		let answer = m * g;

		NAtask.setTask({
			text: 'Масса ученика равна ' + m + ' кг. Чему равна сила, с которой этот ученик притягивает к себе Землю? Ответ дайте в ньютонах.',
			answers: answer,
		});
	}, 2000);
})();
// https://3.shkolkovo.online/catalog/3067/71216
// https://github.com/nickkolok/chas-ege/issues/3522
