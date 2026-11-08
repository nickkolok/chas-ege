(function() {
	retryWhileError(function() {
		'use strict';

		let func1 = ['sindeg','cosdeg','tgdeg','ctgdeg'].iz();
		let func2 = ['sindeg','cosdeg','tgdeg','ctgdeg'].iz();

		let angle1 = sl(15,720,15).pm();
		let angle2 = sl(15,720,15).pm();
		//Усложнённый вариант!
		//let angle1 = sl(30,180,15).pm();
		//let angle2 = sl(30,180,15).pm();
		genAssert(func1 !== func2 || angle1 !== angle2, 'Множители должны различаться');

		NAtask.setEvaluationTask({
			expr: '' + sl(3,50).pm() + '' + func1 + '(' + angle1 + ')  ' + func2 + '(' + angle2 + ')' + (['+','-'].iz() + sl(1,1000)).esli(sl1()),
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},1000);
})();
