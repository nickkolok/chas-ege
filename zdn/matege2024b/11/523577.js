(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let k2, k1, ans;
		do {
			k2 = sl(2, 6); // во сколько раз вторая коробка шире первой
			k1 = sl(15, 60) / 10; // во сколько раз первая коробка выше второй (от 1.5 до 6.0)
			ans = (k2 * k2) / k1;
		} while (Math.round(ans * 10) !== ans * 10 || ans > 20);

		NAtask.setTask({
			text: 'Даны две коробки, имеющие форму правильной четырёхугольной призмы, стоящей на основании. Первая коробка в ' + k1 + ' ' + sklon(k1, ['раз', 'раза', 'раз']) + ' выше второй, а вторая в ' + k2 + ' ' + sklon(k2, ['раз', 'раза', 'раз']) + ' шире первой. Во сколько раз объём второй коробки больше объёма первой?',
			answers: ans,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=523577
