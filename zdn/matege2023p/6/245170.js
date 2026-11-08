(function() {
	retryWhileError(function() {
		'use strict';

		let a1 = sl(1,15).pm();
		let b1 = [8,12].iz();
		genAssertIrreducible(a1, b1);

		let p = ['' + sl(1,30) + 'sqrt(' + [2,3].iz() + ')', 'sqrt('+[4,9].iz()*sl(2,10).sqr() + ')'].iz() +
			'sinpow(' + a1.pm() + 'pi/' + b1 + ',2)';

		NAtask.setEvaluationTask({
			expr: ''+
				[
					p, p.replace('sin', 'cos'),
				].shuffle().join('-'),
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},1000);
})();
// 245170
