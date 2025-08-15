(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506630';
		let preference1 = ['kilometer', 'meter', 'decimeter', 'centimeter'];
		let preference2 = ['decimeterStep', 'centimeterStep', 'millimeterStep'];
		let rand = getSelectedPreferenceFromList(key, preference1);
		let randSecond = getSelectedPreferenceFromList(key, preference2);

		let the_pedestrianOnRoad = sklonlxkand(decor.pedestrianOnRoad.iz());
		let metric = ['дм', 'см', 'мм'][randSecond];

		let l = sl(30, 90);
		let n = sl(1000, 10000, 100);

		let answer = l * n * [[0.0001, 0.1, 1, 10][rand], [0.00001, 0.01, 0.1, 1][rand], [0.000001, 0.001, 0.01, 0.1][rand],][randSecond];

		NAtask.setTask({

			text: 'Зная длину своего шага, ' + the_pedestrianOnRoad.ie + ' может приближённо подсчитать пройденное им расстояние $s$ по формуле $s = nl$,' +
				' где $n$ – число шагов, $l$ – длина шага. ' +
				'Какое расстояние прошёл ' + the_pedestrianOnRoad.ie + ', ' +
				'если $l = ' + l + '$ ' + metric + ', $n = ' + n + '$? Ответ выразите в ' + ['километрах', 'метрах', 'дециметрах', 'сантиметрах'][rand] + '.',
			answers: answer,
			preference: [preference1, preference2],

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506630
