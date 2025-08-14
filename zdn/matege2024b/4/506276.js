(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506630';
		let preference = ['kilometer', 'meter', 'decimeter'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_pedestrianOnRoad = sklonlxkand(decor.pedestrianOnRoad.iz());

		let l = sl(30, 90);
		let n = sl(1000, 10000, 100);

		let answer = l * n * [0.00001, 0.01, 0.1][rand];

		NAtask.setTask({

			text: 'Зная длину своего шага, ' + the_pedestrianOnRoad.ie + ' может приближённо подсчитать пройденное им расстояние $s$ по формуле $s = nl$,' +
				' где $n$ – число шагов, $l$ – длина шага. ' +
				'Какое расстояние прошёл ' + the_pedestrianOnRoad.ie + ', ' +
				'если $l = ' + l + '$ см, $n = ' + n + '$? Ответ выразите в ' + ['километрах', 'метрах', 'дециметрах'][rand] + '.',
			answers: answer,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506630
