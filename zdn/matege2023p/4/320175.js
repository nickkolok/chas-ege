(function() {
	retryWhileError(function() {
		'use strict';
		NAinfo.requireApiVersion(0, 2);
		let key = '320175';
		let preference1 = ['two', 'three', 'four', 'five', 'six'];
		let preference2 = ['lamps', 'terminals'];
		let device = getSelectedPreferenceFromList(key, preference2);
		let numberOfDevices = getSelectedPreferenceFromList(key, preference1) + 2;
		let eventMatrix = generateBinaryMatrix(numberOfDevices);

		let zeroCounts = eventMatrix.map(event => event[event.length - 1]);
		let lampDescriptions = ['двумя', 'тремя', 'четырьмя', 'пятью', 'шестью'];
		let failureProbability = (numberOfDevices >= 5 ? [10, 20, 30, 40, 50].iz() : sl(10, 50)) / 100;
		let requiredFailures = sl(1, numberOfDevices);

		let probabilitySum = 0;
		for (let i = 0; i < zeroCounts.length; i++) {
			if (zeroCounts[i] >= requiredFailures) {
				probabilitySum += failureProbability.pow(zeroCounts[i]) * (1 - failureProbability).pow(numberOfDevices - zeroCounts[i]);
			}
		}

		let taskDescription = requiredFailures === numberOfDevices ? 'все лампы' : `хотя бы ${chislitlx(requiredFailures, 'лампа', '$')}`;
		let verb = chislit(requiredFailures, 'перегорит', 'перегорят', 'перегорят');

		genAssertZ1000(probabilitySum * 100, 'Кривой ответ');
		NAtask.setTask({
			text: (device === 1 ? `В магазине установлены платёжные автоматы, всего ${chislitlx(numberOfDevices, 'автомат', '$')}. Вероятность неисправности каждого из них равна $${failureProbability.ts()}$. Неисправности независимы. Найдите вероятность того, что ${chislit(requiredFailures, 'неисправен', 'неисправны', 'неисправны')} ${requiredFailures === numberOfDevices ? 'все автоматы' : 'хотя бы ' + chislitlx(requiredFailures, 'автомат', '$')}.` : `Помещение освещается ${lampDescriptions[numberOfDevices - 2]} лампами. ` +
				  `Вероятность перегорания каждой лампы в течение года равна $${failureProbability.ts()}$. ` +
				  `Лампы перегорают независимо друг от друга. Найдите вероятность того, ` +
				  `что в течение года ${taskDescription} ${verb}.`),
			answers: probabilitySum,
			preference: [preference1, preference2],
		});
	}, 2000);
})();
// E0F8F7, 874308, BBED73, 2373BE, C563B8, 464824, 1FD521, CCAED0, 4FCB96, 15329D, 27E3EC
// 1C114B, CF6990
// A1E946, 0BD12E, 9E91A8, BDA2C1, 94BFCA, 33A9CE, 40BF93, 18D0E9, 7C7630

