(function() {
	retryWhileError(function() {
		'use strict';
		
		let ch = sl(2, 10);
		
		NAtask.setEvaluationTask({
			expr: 'sqrt((' +  '1/'+ ch * ch + '*' + ['y^' + sl(2, 10, 2), 'x^' + sl(2, 10, 2)].shuffle().join('') + '))',
			variables: {x: sl(2, 9),y: sl(2, 9)},
<<<<<<< HEAD
			rulesBeforePrinting: [{ l: 'n1*n2', r: 'n1 n2' },],
=======
>>>>>>> c00463e5e7e60443ef72f1c02b8e1742b8ef8c6a
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412189
