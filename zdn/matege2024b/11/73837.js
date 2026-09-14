(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 12);
		let b = sl(2, 12);
		let h = sl(2, 12);
		let V = (a * b * h) / 3;
		
		while (!Number.isInteger(V) || V < 10) {
			a = sl(2, 12);
			b = sl(2, 12);
			h = sl(2, 12);
			V = (a * b * h) / 3;
		}

		NAtask.setTask({
			text: 'Основанием четырёхугольной пирамиды является прямоугольник со сторонами $' + a + '$ и $' + b + '$. Найдите высоту этой пирамиды, если её объём равен $' + V + '$.',
			answers: h,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=73837
