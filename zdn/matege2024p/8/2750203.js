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
				stepForX: 4,
				stepForY: 0.1,
			},
			questionsF: {
				main: 'point',
				conditions: ['extreme_point_on_the_segment'],
				variants: ['empty',],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:2, max:10}, 
			numberOfExtremes: {min: 0, max:10}, 
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.09
			},
		});
	}, 10000);
})();

/*27502 6417 9045 9049 522116 522142 8801 8803 8805 8807 8809 8811 8813 8815 
8817 8819 8821 8823 8825 8827 8829 8831 8833 8835 8837 8839 8841 8843 8845 
8847 8849 8851 8853 8855 8857 8859 8861 8863 8865 8867 8869 8871 8873 8875 
8877 8879 8881 8883 8885 8887 8889 8891 8893 8895 8897 8899 8901 8903 8905 
8907 8909 8911 8913 8915 8917 8919 8921 8923 8925 8927 8929 8931 8933 8935 
8937 8939 8941 8943 8945 8947 8949 8951 8953 8955 8957 8959 8961 8963 8965 
8967 8969 8971 8973 8975 8977 8979 8981 8983 8985 8987 8989 8991 8993 8995 
8997 8999 9001 9003 9005 9007 9009 9011 9013 9015 9017 9019 9021 9023 9025 
9027 9029 9031 9033 9035 9037 9039 9041 9043 9047
*/
