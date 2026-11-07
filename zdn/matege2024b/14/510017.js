(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '510017';
	let preference = ['sumThenMultiply', 'multiplyThenSum'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let aTenths = sl(11, 99);
	let a = aTenths / 10;
	let b = slKrome(aTenths, 11, 99) / 10;
	let c = sl(11, 99) / 10;
	let operation = ['+', '-'].iz();
	let expr = variant === 0 ? ['(' + a + operation + b + ')', c].shuffle().join('*') : a + '*' + b + operation + c;
	NAtask.setEvaluationTask({expr, authors: ['Алендарь Сергей'], preference});
})();
// 35EC4C, D31CFB, ED14F1, F79D24, 146AF9, 46ACB8, 7537A6, 33A66B, 1CB38B, F7CAFE, 457099, 7752E6, BBBD66, F93B42, B08A4F, C26A0E, 10B6BB, 5BDE22, A90DDE, 9466DD, 3AF8A3, 8936CC, 567B9E, 5074E7, CC4A84, FA60F3, F63DD7, 6330EF, BEA53D, 3B2FF3, 4AA6A5, 1EF2FB, 3DBD07, B394B7, D2314D, 8AED53, C29300, 84CDDD, 06AC9C, 2B42EF, 5E53B2, 12B13F
