(function() {
	retryWhileError(function() {
		'use strict';
		let key = '40131';
		let preference = ['tangent_to_graph_equation', 'tangent_to_graph_abscissa'];
		let rand = getSelectedPreferenceFromList(key, preference);

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'derivative',
			boundariesOfGraph: {
				minX: sl(-5,-0),
				maxX: sl(2,5),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 1,
			},
			questionsF: {
				main: 'point',
				conditions: [preference[rand]],
				variants: ['abscissa',],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:0, max:10}, 
			numberOfExtremes: {min: 0, max:1},
			preference: preference, 
		});
	}, 10000);
})();

//40131 514459 515184 515185 515186 515187 515188 515189 515190 515191 530666

