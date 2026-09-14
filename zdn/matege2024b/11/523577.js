(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let variants = [
			{ k1: 2, k2: 2, ans: 2 },
			{ k1: 2, k2: 3, ans: 4.5 },
			{ k1: 2, k2: 4, ans: 8 },
			{ k1: 2.5, k2: 2, ans: 1.6 },
			{ k1: 2.5, k2: 5, ans: 10 },
			{ k1: 3, k2: 3, ans: 3 },
			{ k1: 4, k2: 2, ans: 1 },
			{ k1: 4, k2: 4, ans: 4 },
			{ k1: 5, k2: 5, ans: 5 },
			{ k1: 8, k2: 4, ans: 2 }
		];
		let v = variants.iz();
		let k1 = v.k1;
		let k2 = v.k2;
		let ans = v.ans;

		NAtask.setTask({
			text: 'Даны две коробки, имеющие форму правильной четырёхугольной призмы, стоящей на основании. Первая коробка в ' + k1 + ' раза выше второй, а вторая в ' + k2 + ' раза шире первой. Во сколько раз объём второй коробки больше объёма первой?',
			answers: ans,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=523577
