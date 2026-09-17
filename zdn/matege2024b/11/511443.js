(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let k = sl(2, 5);
		let H = sl(2, 20);
		let h = H * k * k;
		let k_word = (k === 2 || k === 3 || k === 4) ? "раза" : "раз";

		NAtask.setTask({
			text: 'Вода в сосуде цилиндрической формы находится на уровне $h = ' + h + '$ см. На каком уровне окажется вода, если её перелить в другой цилиндрический сосуд, у которого радиус основания в $' + k + '$ ' + k_word + ' больше, чем у данного? Ответ дайте в сантиметрах.',
			answers: H,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
