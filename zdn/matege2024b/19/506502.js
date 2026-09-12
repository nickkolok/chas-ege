(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506502';
		
		let intervals = [
			[24, 29, [1272, 2172, 2712, 7212]],
			[42, 49, [1344, 3144]],
			[18, 25, [1416, 1164, 4116, 2232]],
			[40, 43, [1176, 7116, 1716]],
			[54, 61, [2352, 3252, 5232, 2532]],
			[16, 19, [3312, 1332, 3132]],
			[30, 37, [1332, 3132, 3312]]
		];
		
		let interval = intervals.iz();
		let P_min = interval[0];
		let P_max = interval[1];
		let nums = interval[2];
		
		let text = 'Приведите пример четырёхзначного числа, кратного 12, произведение цифр которого больше ' + P_min + ', но меньше ' + P_max + '. В ответе укажите ровно одно такое число.';
			
		NAtask.setTask({
			text: text,
			answers: nums,
			preference: ['general'],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506502
//zer00player
