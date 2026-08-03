(function() {
	retryWhileError(function() {
		'use strict';
		
		let ch = sl(2, 10);
		
		NAtask.setEvaluationTask({
			expr: 'sqrt((' +  '1/'+ ch * ch + '*' + ['y^' + sl(2, 10, 2), 'x^' + sl(2, 10, 2)].shuffle().join('') + '))',
			variables: {x: sl(2, 9),y: sl(2, 9)},
			rulesBeforePrinting: [{ l: 'n1*n2', r: 'n1 n2' },],
			authors: ['Алендарь Сергей'],
		});
	}, 1000);
})();
//412189
