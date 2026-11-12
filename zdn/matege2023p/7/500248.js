(function() {
	retryWhileError(function() {
		'use strict';
		let key = '500248';
		let preference1 = ['derivative_is_negative', 'derivative_is_positive'];
		let preference2 = ['symbol', 'number'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			definedOnInterval: false,
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
				main: 'marked_points',
				conditions: [preference1[rand1]],
				variants: ['number'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
				font: "16px liberation_sans",
				markedPoints:{
					type: preference2[rand2],
					step: 2,
					fontMarkedPoints: "16px liberation_sans",
					numberOfPoints: {min:4, max:10}
				}
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:0, max:0}, 
			numberOfExtremes: {min: 0, max:10}, 
			extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.1
			},
			preference: [preference1, preference2],
		});
	}, 10000);
})();
//500248
//Демонстрационный вариант ФИПИ
