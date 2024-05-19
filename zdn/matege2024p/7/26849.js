(function() {
	retryWhileError(function() {
		'use strict';
		let a =sl(2,9);
		let b =sl1()?a.pow(sl(2,5)):'1/'+a.pow(sl(2,5));
		let c =sl1()?a.pow(sl(2,5)):'1/'+a.pow(sl(2,5));
		
		genAssert(b!=c);
												
		NAtask.setEvaluationTask({
			expr: ['varlog(1/'+a+','+b+')','varlog('+a+','+c+')',['-','+'].iz()].shuffle().slag().plusminus(),
			//forbiddenAnswers: [0],
			authors: ['Суматохина Александра'],
		});
	}, 10000);
})();
// 26849 68583 68595 641997 68555 68557 68559 68561 68563 68565 68567 68569 68571 68573 68575 68577 68579 68581 68585 68587 68589 68591 68593
