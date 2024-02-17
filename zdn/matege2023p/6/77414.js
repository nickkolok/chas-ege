(function() {
	retryWhileError(function() {
		'use strict';

		let func1 = ['sindeg','cosdeg'].iz();
		let func2 = ['sindeg','cosdeg'].iz();

		let angle1 = [30,45,60,90,120,135,150,180].iz().pm();
		let angle2 = [30,45,60,90,120,135,150,180].iz().pm();
		//Усложнённый вариант!
		//let angle1 = sl(30,180,15).pm();
		//let angle2 = sl(30,180,15).pm();
		genAssert(func1 !== func2 || angle1 !== angle2, 'Множители должны различаться');

		NAtask.setEvaluationTask({
			expr: '' + sl(3,50).pm() + func1 + '(' + angle1 + ')  ' + func2 + '(' + angle2 + ')',
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	},1000);
})();
