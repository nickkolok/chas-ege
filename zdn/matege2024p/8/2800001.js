(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'function',
			boundariesOfGraph: {
				minX: sl(-11,0),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: sl(6,8),
				stepForY: 0.3,
			},
			questionsF: {
				main: 'point',
				conditions: ['derivative_is_zero_on_the_segment'],
				variants: ['empty'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 2,
			numberOfRoots: {min:0, max:10}, 
			numberOfExtremes: {min: 2, max:10}, 
			extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.1
			},
		});
	}, 10000);
})();
//28 по Ширяевой
