(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let preference = ['legacy', 'sumThenMultiply', 'multiplyThenSum'];
	let variant = getSelectedPreferenceFromList('510017', preference);
	if (variant) {
		retryWhileError(function () {
			let operand = () => [String(sl(1, 999) / 100), String(sl(1, 99) / 10), String(sl(1, 40)), '(' + sl(1, 40) + '/' + sl(2, 30) + ')'].iz();
			let a = operand();
			let b = operand();
			let c = operand();
			let sign = ['+', '-'].iz();
			let expr = variant === 1 ? ['(' + a + sign + b + ')', c].shuffle().join('*') :
				[a + '*' + b, c].shuffle().join(sign);
			NAtask.setEvaluationTask({expr, authors: ['Алендарь Сергей'], preference});
		}, 10000);
		return;
	}
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 99);
		let b = sl(1, 99);
		let c = sl(1, 99);
		let div = [10,100];

		NAtask.setEvaluationTask({
			expr: [ ['(',''].iz() + ['(' + a / div.iz() + ')', '(' + b / div.iz() + ')'].shuffle().join(['+','-'].iz()) + [')',''].iz(), 
				'(' + c / div.iz()  + ')'].shuffle().join('*'),
			authors: ['Алендарь Сергей'],
			preference,
		});
	}, 100000);
})();
//510017
// 35EC4C, D31CFB, ED14F1, F79D24, 146AF9, 46ACB8, 7537A6, 33A66B, 1CB38B, F7CAFE, 457099, 7752E6, BBBD66, F93B42, B08A4F, C26A0E, 10B6BB, 5BDE22, A90DDE, 9466DD, 3AF8A3, 8936CC, 567B9E, 5074E7, CC4A84, FA60F3, F63DD7, 6330EF, BEA53D, 3B2FF3, 4AA6A5, 1EF2FB, 3DBD07, B394B7, D2314D, 8AED53, C29300, 84CDDD, 06AC9C, 2B42EF, 5E53B2, 12B13F
