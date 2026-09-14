(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 6);
		let m = sl(1, 15);
		let k = 4 * m;
		let V = a * a * m;

		NAtask.setTask({
			text: 'Сторона основания правильной треугольной пирамиды равна $' + a + '$, а высота пирамиды равна $' + k + '\\sqrt{3}$. Найдите объём этой пирамиды.',
			answers: V,
		});
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=27087
