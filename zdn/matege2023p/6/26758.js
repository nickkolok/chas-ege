(function() {
	retryWhileError(function() {
		'use strict';

		let a1 = sl(1,15).pm();
		let b1 = [3,4,6].iz();
		genAssertIrreducible(a1, b1);

		let a2 = sl(1,15).pm();
		let b2 = [3,4,6].iz();
		genAssertIrreducible(a2, b2);

		NAtask.setEvaluationTask({
			expr: '' +
				('' + sl(2,100).pm()).esli(sl(3)) +
				'sqrt(' + [2,3].iz() + ') ' +
				[
					['sin','cos','tg','ctg'].iz() + '(' + a1.pm() + 'pi/' + b1 + ')',
					['sin','cos','tg','ctg'].iz() + '(' + a2.pm() + 'pi/' + b2 + ')',
				].join(''),
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},1000);
})();
//26758 26759
