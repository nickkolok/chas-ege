(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509729'
		let preference = ['CelToFar', 'FarToCel'];
		let rand = getSelectedPreferenceFromList(key, preference);
		
		let degreeName = ['Цельсия', 'Фаренгейта'][rand];
		let reverseDegreeName = ['Цельсия', 'Фаренгейта'][1 - rand];
		let degreeNumberCelsius = sl(-50, 150);
		let degreeNumberFahrenheit = [1.8 * degreeNumberCelsius + 32, 1.8 * degreeNumberCelsius + 32][rand];

		let givenDegree = [degreeNumberCelsius, degreeNumberFahrenheit][rand];
		let givenText = chislitlx(givenDegree.abs(), 'градус', '$');
		if (givenDegree < 0) givenText = givenText.replace('$', '$-');

		NAtask.setTask({

			text: 'Чтобы перевести температуру из шкалы ' + degreeName + ' в шкалу ' + reverseDegreeName +
				', пользуются формулой $' + ['t_F =1{,}8t_C +32', 't_C =\\frac{5}{9}(t_F -32)'][rand] + '$, где $t_C$ – градусы Цельсия, $t_F$ – градусы Фаренгейта. ' +
				'Скольким градусам по шкале ' + reverseDegreeName + ' соответствует '
				+ givenText + ' по шкале ' + degreeName + '?',
			answers: [degreeNumberFahrenheit, degreeNumberCelsius][rand],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=509729
//https://oge.sdamgia.ru/problem?id=348559
// ФИПИ: сопоставленные позиции категории 4 и все исходные коды.
// 4.75: 3B924B, 9948BB, B86BFA, 90F568
// 4.76: 3FC01E, 3111C7, F4F406, 0A3343, DCE445, 897FC1, 16A52D, 806852, 13CCAD, E85590, AECBEE, 89A0E4, 7F636D, 86168C
// 4.77: E1C518
// 4.78: 087E8A
// 4.79: D047F4, F6A648, F0A4BB, C00DBF, 29579B, E07F94, D65E4E, 50524C, 0B1C99, 56C960, A8948C
