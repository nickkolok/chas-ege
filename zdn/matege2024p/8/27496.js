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
				stepForX: 4,
				stepForY: 0.3,
			},
			questionsF: {
				main: 'integer_points',
				conditions: ['extreme_points_on_the_segment'],
				variants: ['sum', 'production', 'number', 'smallest', 'largest'],
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
				tolerance: 0.15
			},
			/*rootsIsInteger: {
				int: 'yes',
				tolerance: 0.2
			},*/
		});
	}, 10000);
})();

/*27496 6427 8039 8047 7805 7811 7813 7815 7819 7827 7831 7837 7845 7853 7857 7863 7867 7871 7883 7887 7889 7903 7905 7917 7923 7927 7931 7933 7937 7953 7957 7961 7963 7965 7973 7981 7983 7989 7993 7995 8003 8007 8011 8019 8021 8023 8033 8043
 */
