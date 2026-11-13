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
				main: 'integer_points',
				conditions: ['minimum_points_on_the_segment'],
				variants: ['number'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:2, max:10}, 
			numberOfExtremes: {min: 0, max:10}, 
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.09
			},
		});
	}, 10000);
})();
/* 2750201 */
