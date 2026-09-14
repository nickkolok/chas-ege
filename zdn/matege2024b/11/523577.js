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

		let raz = function(n) {
			if (n % 1 !== 0) return 'раза'; // для дробных чисел (1.5 раза, 2.5 раза)
			let m = Math.floor(n);
			let r10 = m % 10;
			let r100 = m % 100;
			if (r100 >= 11 && r100 <= 14) return 'раз';
			if (r10 === 1) return 'раз';
			if (r10 >= 2 && r10 <= 4) return 'раза';
			return 'раз';
		};

		let text = 'Даны две коробки, имеющие форму правильной четырёхугольной призмы, стоящей на основании. Первая коробка в {k1} {r1} выше второй, а вторая в {k2} {r2} шире первой. Во сколько раз объём второй коробки больше объёма первой?';
		text = text.replace('{k1}', k1).replace('{r1}', raz(k1)).replace('{k2}', k2).replace('{r2}', raz(k2));

		NAtask.setTask({
			text: text,
			answers: ans,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=523577
