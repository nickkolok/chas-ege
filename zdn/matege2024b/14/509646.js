(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let preference = ['decimal', 'fractionInDenominator'];
	let variant = getSelectedPreferenceFromList('509646', preference);
	if (variant) {
		retryWhileError(function () {
			let numerator = sl(1, 99) / 10;
			let divisor = sl(2, 30);
			NAtask.setEvaluationTask({expr: numerator + '/(1+1/' + divisor + ')', preference});
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
			expr: [ '(' + ['(' + a / div.iz() + ')', '(' + b / div.iz() + ')'].shuffle().join(['+','-'].iz()) + ')', 
				'(' + c / div.iz()  + ')'].shuffle().join('/'),
			authors: ['Алендарь Сергей'],
			preference,
		});
	}, 100000);
})();
//509646
// F383F2, 9EB20C, E94609, 637BBC, 57402E, 7676D3, C44ADA, C656CA, 98EC6B, 4A39D1, 4D4954, B5EDA5, E3ADA3, F74DCF, 12BEC3, 04609B, 45CEEC, 28E160, 834330, C10C86, F5CDF1, 5BF6F2, 225802, E5BF73, BD12B5, A339B2, 3738BA, 6D9814, 793A2E, 810250, 0FB1AE, 7DACA4, EEE6C2, 6B2D93, C2256C, E8070C, 85F707, 363D72, AC0825, 330BCB, F909B9, 212EBE, 5587BE, 643FB6, F631D3, EF32D1, 8B35D0, 251FAD, 1F9FC8, 4B14E9, 0ED461, 555C6A, 5FB639, FF0042, E7104E, E7D12E, 47338E, 608A1A, F2CBD3, D3F95A, 4F02AD, CA16AE, 8F8C96, 8B2FE9, 50FD69, 149B46, 210647, 51AA05, 5003B6, 8BFC55, 7BEAA4, 6C60E0, C5F16E, 62FB8D
