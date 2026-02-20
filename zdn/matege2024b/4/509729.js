(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509729'
		let preference = ['CelToFar', 'FarToCel'];
		let rand = getSelectedPreferenceFromList(key, preference);
		
		let degreeName = ['Цельсия', 'Фаренгейта'][rand];
		let reverseDegreeName = ['Цельсия', 'Фаренгейта'][1 - rand];
		let degreeNumberCelsius = sl(10, 99);
		let degreeNumberFahrenheit = 1.8 * degreeNumberCelsius + 32;

		NAtask.setTask({

			text: 'Чтобы перевести температуру из шкалы ' + degreeName + ' в шкалу ' + reverseDegreeName +
				', пользуются формулой $' + ['t_F =1{,}8t_C +32', 't_C =\\frac{5}{9}t_F -32 '][rand] + '$, где $t_C$ – градусы Цельсия, $t_F$ – градусы Фаренгейта. ' +
				'Скольким градусам по шкале ' + reverseDegreeName + ' соответствует '
				+ [chislitlx(degreeNumberCelsius, 'градус', '$'), chislitlx(degreeNumberFahrenheit, 'градус', '$')][rand] + ' по шкале ' + degreeName + '?',
			answers: [degreeNumberFahrenheit, degreeNumberCelsius][rand],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=509729
//https://oge.sdamgia.ru/problem?id=348559
