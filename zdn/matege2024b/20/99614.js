(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let base = sl(2, 12);
		let ratioFirst = sl(2, 6);
		let ratioSecond = slKrome([ratioFirst], 2, 6);
		let timeFirst = base * ratioFirst;
		let timeSecond = base * ratioSecond;

		let total = (timeFirst * timeSecond) / (timeFirst + timeSecond);

		genAssert(total.isAlmostInteger(), "Время должно быть красивым, меньше 2 знаков после запятой");

		NAtask.setTask({
			text: 'Один мастер может выполнить заказ за $' + timeFirst + '$ часов, а другой — за $' + timeSecond + '$ часов. ' +
				'За сколько часов выполнят этот заказ оба мастера, работая вместе?',
			answers: total,
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();

//Открытый банк заданий 77CE6F
//https://ege.sdamgia.ru/test?likes=99614
//zer00player

