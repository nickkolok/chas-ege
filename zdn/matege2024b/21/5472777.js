(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let remainder = sl(4, 100);
		let denFrac = sl(2, 5);
		let frac = (1).texfrac(denFrac);

		let initial = (denFrac ** 3 * remainder) / ((denFrac - 1) ** 3);

		genAssertAlmostInteger(initial, 'Начальное количество тетрадей должно быть целым');
		genAssert(initial > 0, 'Начальное количество тетрадей должно быть положительным');

		NAtask.setTask({
			text: 'На столе лежали тетради для трёх учеников. ' +
				'Сначала пришёл первый, забрал $' + frac + '$ всех тетрадей и ушёл. ' +
				'Следом пришёл второй и, не зная о том, что часть тетрадей уже забрали, ' +
				'взял $' + frac + '$ лежавших на столе тетрадей, после чего ушёл. ' +
				'Третий ученик, не зная о том, что двое уже забрали тетради, взял $' + frac + '$ и ушёл. ' +
				'После ухода третьего ученика на столе осталось ' +
				chislitlx(remainder, 'тетрадь', 'v$') + '. ' +
				'Сколько тетрадей было на столе первоначально?',
			answers: initial,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();

//5472777
//Открытый банк заданий 538209
//zer00player

