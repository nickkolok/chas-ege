(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'function',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: sl(4,8),
				stepForY: 0.3,
			},
			questionsF: {
				main: 'point',
				conditions: ['solution_equation'],
				variants: ['empty'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 4,
			numberOfRoots: {min:2, max:10}, 
			numberOfExtremes: {min: 1, max:1}, 
			extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.1
			},
		});
	}, 10000);
})();
//562751 629170
