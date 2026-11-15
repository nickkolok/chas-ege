(function() {
	retryWhileError(function() {
		'use strict';

		let wholeNum0 = sl(1, 20);
		let num0 = sl(10, 99);
		let den0 = sl(3, 9);
		let wholeNum1 = sl(1, 20);
		let num1 = sl(1, 99);
		let den1 = sl(3, 100);
		let wholeNum2 = sl(1, 20);
		let num2 = sl(1, 99);
		let den2 = sl(3, 100);
		let div = [10, 100];
		
		genAssertIrreducible(num0, den0, 'Первая дробь должна быть несократима');
		genAssertIrreducible(num1, den1, 'Вторая дробь должна быть несократима');
		genAssertIrreducible(num2, den2, 'Третья дробь должна быть несократима');

		NAtask.setEvaluationTask({
			expr: [[['mixed(' + wholeNum0 + ',' + num0 + ',' + den0 + ')', num0 + '/' + den0].iz(),
				['mixed(' + wholeNum1 + ',' + num1 + ',' + den1 + ')', num1 + '/' + den1,
				[sl(1, 999) / div.iz(), wholeNum1].iz()].iz()].shuffle().join(['+', '-'].iz()),
				['mixed(' + wholeNum2 + ',' + num2 + ',' + den2 + ')', num2 + '/' + den2].iz()].shuffle().join(['+', '-'].iz()),
			authors: ['Алендарь Сергей'],
		});
	}, 100000);
})();
//506120
