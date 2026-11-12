(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			definedOnInterval: false,
			type: 'derivative',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 0.3,
			},
			questionsF: {
				main: 'marked_points',
				conditions: ['function_is_increasing'],
				variants: ['number'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
				font: "16px liberation_sans",
				markedPoints:{
					type: 'symbol',
					step: 2,
					fontMarkedPoints: "14px liberation_sans",
					numberOfPoints: {min:4, max:4}
				}
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:0, max:10}, 
			numberOfExtremes: {min: 0, max:10}, 
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.2
			},
		});
	}, 10000);
})();
//31754102
