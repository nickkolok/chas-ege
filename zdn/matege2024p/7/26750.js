(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 20);
		let b = sl(2, 100).pm();
		let c = slKrome(a, 2, 20);
		let f = a * c;
		let e = -sl(2, 10)*b/b.abs();
		let d = (a+b.pow(2)*c)*e/(2*b);
													
		genAssert((d*100).isZ(), 'Такой себе множитель');
		genAssert(!f.isPolnKvadr(), 'Корень извлекается');
		genAssert(!a.isPolnKvadr(), 'Корень извлекается');
		genAssert(!c.isPolnKvadr(), 'Корень извлекается');
		NAtask.setEvaluationTask({
			expr: ('(' + ['sqrt(' + a + ')', b + 'sqrt(' + c + ')'].shuffle().slag() + ')^2/(' + [d, e + 'sqrt(' + f + ')']
				.shuffle().slag() + ')').plusminus(),
			//forbiddenAnswers: [0],
			authors: ['Суматохина Александра'],
		});
	}, 10000);
})();
//26750 26751 62647 541256 26929 62583 62585 62587 62589 62591 62593 62595 62597 62599 62601 62603 62607 62609 62611 62613 62615 62617 62619 62621 62623 62625 62627 62629 62631 62633 62635 62637 62639 62641 62643 62645
