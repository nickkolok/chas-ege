(function() {
	retryWhileError(function() {
		'use strict';

		let base = sl(2,10);

		chas2.task.setEvaluationTask({
			expr: 'divideColon(' + [
				'(' + base.pow(sl(1,2)) + '^' + sl(2,20) + ')' + '^' + sl(2,20),
				base.pow(sl(1,2)) + '^' + sl(2,100),
			].shuffle().join() + ')',
			forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},1000);
})();
