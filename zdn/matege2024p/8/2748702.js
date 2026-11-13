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
				stepForX: sl(3,4),
				stepForY: 0.3,
			},
			questionsF: {
				main: 'integer_points',
				conditions: ['derivative_is_positive'],
				variants: ['number',],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 2,
			numberOfRoots: {min:2, max:10}, 
			numberOfExtremes: {min: 2, max:10}, 
			extremumsIsInteger: {
				int: 'no',
				tolerance: 0.2
			},
			/*rootsIsInteger: {
				int: 'yes',
				tolerance: 0.2
			},*/
		});
	}, 10000);
})();
/*  27487: 6867 7089 559401 6869 6877 6879 6883 6885 6887 6889 6891 6893 6895 6901 6905 6911 6913 6915 6917 6921 6923 6925 6929 6935 6941 6945 6947 6951 6953 6961 6965 6971 6975 6979 6981 6985 6987 6997 6999 7001 7007 7009 7013 7015 7023 7027 7033 7035 7045 7051 7053 7055 7057 7065 7071 7075 7077 7079 7083 7085 7087  */
