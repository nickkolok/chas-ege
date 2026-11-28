(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '3252902';
		let preference = ['sameColors', 'diffColors'];
		let targetColor = getSelectedPreferenceFromList(key, preference);

		let color1 = sl(10, 40, 2);
		let color2 = sl(10, 30, 2);
		let total = color1 + color2;

		let probability = [color1 - 1, color2][targetColor] / (total - 1);
		let colorSecond = ['тоже ', ''][targetColor];
		let colorName = om.trickyColors.iz(2);
		let item = sklonlxkand(['карандаш', 'фломастер', 'маркер', 'ластик', 'транспортир', 'циркуль', 'угольник', 'корректор', 'степлер', 'трафарет'].iz());

		genAssertZ1000(probability);

		NAtask.setTask({
			text: 'Из ящика, где хранятся ' + chislitlx(color1, item.ie) + ' цвета «' + colorName[0] + '» и ' +
				chislitlx(color2, item.ie) + ' цвета «' + colorName[1] + '», не глядя достали два ' + item.re + '. ' +
				'Известно, что первый ' + item.ie + ' был цвета «' + colorName[0] + '». ' +
				'Найдите вероятность того, что второй ' + item.ie + ' был ' + colorSecond + 'цвета «' + colorName[targetColor] + '».',
			answers: probability,
			preference: [preference],
		});
	}, 1000);
})();
//3252902
//Открытый банк заданий 31A2A6
