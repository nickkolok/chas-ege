(function() {
	retryWhileError(function() {
		'use strict';
		let key = '501188';
		let preference = ['maximum_point', 'minimum_point'];
		let rand = getSelectedPreferenceFromList(key, preference);

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
				conditions: [preference[rand]],
				variants: ['empty'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:2, max:2}, 
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.09
			},
			preference: preference,
		});
	}, 10000);
})();
//501188: 526007 525111
