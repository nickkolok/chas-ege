(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509661';
		
		// Генерируем радиус и высоту так, чтобы объём был целым числом при делении на 3
		let R = sl(3, 15);
		let h = sl(3, 20);
		
		// Если R^2 * h не делится на 3, делаем h кратным 3
		if ((R * R * h) % 3 !== 0) {
			h = sl(1, 6) * 3; // 3, 6, 9, 12, 15, 18
		}
		
		let V_pi = (R * R * h) / 3;

		NAtask.setTask({
			text: `Объём конуса равен ${V_pi}π, а его высота равна ${h}. Найдите радиус основания конуса.`,
			answers: [R],
			authors: ['Селена'],
		});
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509661
