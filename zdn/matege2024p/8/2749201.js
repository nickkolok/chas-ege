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
				conditions: ['value_on_the_segment_with_ends'],
				variants: ['smallest_value'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 0,
			numberOfRoots: {min:1, max:3}, 
			numberOfExtremes: {min: 2, max:10}, 
		});
	}, 1000);
})();
/*27492: 6403 6405 7735 7787 7789 7795 504233 505442 639746 641154 654831 656621 6411 6425 7559 7561 7581 7587 7591 7593 7595 7601 7603 7605 7607 7613 7615 7617 7621 7623 7625 7629 7633 7635 7637 7639 7647 7651 7653 7655 7661 7667 7671 7675 7677 7681 7683 7685 7693 7701 7703 7705 7707 7709 7713 7721 7723 7729 7741 7749 7753 7755 7761 7763 7765 7769 7771 7775 7777*/
