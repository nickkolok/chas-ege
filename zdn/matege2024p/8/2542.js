(function() {
	retryWhileError(function() {
		'use strict';
		let key = '2542';
		let preference = ['sum', 'production', 'number'];
		let rand = getSelectedPreferenceFromList(key, preference);

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'function',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 0.3,
			},
			questionsF: {
				main: 'integer_points',
				conditions: ['solutions_equation_on_the_segment'],
				variants: [preference[rand]],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 2,
			numberOfRoots: {min:0, max:10}, 
			numberOfExtremes: {min: 3, max:10}, 
			extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.09
			},
			preference: preference,
		});
	}, 10000);
})();

//2542
//https://self-edu.ru
