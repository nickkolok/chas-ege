(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506874';
		
		let text = 'Приведите пример трёхзначного натурального числа, кратного 4, сумма цифр которого равна их произведению. В ответе укажите ровно одно такое число.';
			
		NAtask.setTask({
			text: text,
			answers: [132, 312],
			preference: ['general'],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506874
//zer00player
