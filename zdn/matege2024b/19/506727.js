(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506727';
		let combinations = [
			[4, 15, 0, [123, 543, 963]],
			[4, 15, 1, [243, 423, 603]],
			[8, 5, 0, [642, 963]],
			[15, 19, 0, [579, 864]],
			[16, 6, 1, [195, 243, 867, 915]],
			[5, 19, 0, [666, 951]],
			[7, 18, 2, [759, 888]],
			[11, 12, 2, [537, 666, 795]],
			[12, 13, 0, [369, 735]],
			[13, 14, 1, [189, 459, 729]]
		];
		
		let comb = combinations.iz();
		let A = comb[0];
		let B = comb[1];
		let rel_idx = comb[2];
		let nums = comb[3];
		
		let relations = [
			'средняя цифра которого является средним арифметическим крайних цифр',
			'первая справа цифра которого является средним арифметическим двух других цифр',
			'первая слева цифра которого является средним арифметическим двух других цифр'
		];
		
		let text = 'Приведите пример трёхзначного натурального числа, которое при делении на $' + A + '$ и на $' + B + '$ ' +
			'даёт равные ненулевые остатки и ' + relations[rel_idx] + '. В ответе укажите ровно одно такое число.';
			
		NAtask.setTask({
			text: text,
			answers: nums,
			preference: ['general'],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506792
//https://mathb-ege.sdamgia.ru/test?likes=506752
//https://mathb-ege.sdamgia.ru/test?likes=506727
//https://mathb-ege.sdamgia.ru/test?likes=506814
//zer00player
