(function() {
	retryWhileError(function() {
		'use strict';

		let a = sl(3,29,2).pm();
		let b = [6,8,12].iz();
		genAssert(a.nod(b) == 1, 'Дробь должна быть несократима');

		chas2.task.setEvaluationTask({
			expr: '' +
				('' + sl(2,100).pm()).esli(sl(3)) +
				'sqrt(' + [2,3].iz() + ') ' +
				[
					'sin(' + a.pm() + 'pi/' + b + ')',
					'cos(' + a.pm() + 'pi/' + b + ')',
				].shuffle().join(''),
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},10000);
})();
//245169
