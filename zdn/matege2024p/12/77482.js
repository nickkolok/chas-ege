(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(0, 97);
		let sign = ['+', '-'];
		NAtask.setMinimaxFunctionTask({
			expr: [' ', '-'].iz() + '(' + ['x', [a, a + 2].iz()].shuffle().join('-') + ')^2*e^(' + ['x', a].shuffle().join('+') + ')',
			leftEnd: (a - sl(0.5, 3, 0.5)) + '',
			rightEnd: (a + sl(0.5, 3, 0.5)) + '',
			primaryStep: 0.01,
			secondaryStep: 0.0001,
<<<<<<< HEAD
			forbiddenAnswers: [0,'-0'],
=======
>>>>>>> d8d23216370783cbcd499e38b1c979b38ee90e71
			authors: ['Алендарь Сергей'],
		});
	}, 10000);
})();

//77482
//77483
