(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'derivative',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 0.1,
			},
			questionsF: {
				main: 'point',
				conditions: ['value_on_the_segment'],
				variants: ['smallest_value', 'largest_value'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 0,
			numberOfRoots: {min:2, max:10}, 
			numberOfExtremes: {min: 2, max:10}, 
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.09
			},
		});
	}, 1000);
})();
/* 27491: 6413 6415 27493 508383 509395 513421 513440 548259 561723 561764 628360 628478 638997 639105 639669 7551 7553 7555 7563 7565 7567 7569 7571 7573 7575 7577 7579 7583 7585 7589 7597 7599 7609 7611 7619 7627 7631 7641 7643 7645 7649 7657 7659 7663 7665 7669 7673 7679 7687 7689 7691 7695 7697 7699 7711 7715 7717 7719 7725 7727 7731 7733 7737 7739 7743 7745 7747 7751 7757 7759 7767 7773 7779 7781 7783 7785 7791 7793 7797 7799*/
