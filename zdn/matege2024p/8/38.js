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
				stepForX: sl(6,8),
				stepForY: 0.1,
			},
			questionsF: {
				main: 'point',
				conditions: ['maximum_point', 'minimum_point','extreme_point'],
				variants: ['empty'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:1, max:1}, 
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.09
			},
		});
	}, 10000);
})();
/*38 по Ширяевой*/
