(function() {
	retryWhileError(function() {
		'use strict';
		let key = '27494';
		let preference1 = ['maximum_points_on_the_segment', 'minimum_points_on_the_segment', 'extreme_points_on_the_segment'];
		let preference2 = ['number','largest', 'smallest'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

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
				main: 'integer_points',
				conditions: [preference1[rand1]],
				variants: [preference2[rand2]],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:3, max:10}, 
			numberOfExtremes: {min: 1, max:10}, 
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.1
			},
			preference: [preference1, preference2],
		});
	}, 20000);
})();
//27494 7801 7807 8037 8045 509990 520652 520693 7817 7823 7841 7849 7855 7865 
//7877 7879 7881 7897 7907 7909 7919 7921 7939 7943 7947a 7949 7967 7969 7975 8001 
//8005 8009 8015 8025 8027 8031 8035 8041 27495 7803 7809 8049 500910 7821 7825 7829 
//7833 7835 7839 7843 7847 7851 7859 7861 7869 7873 7875 7885 7891 7893 7895 7899 7901 
//7911 7913 7915 7925 7929 7935 7941 7945 7951 7955 7959 7971 7977 7979 7985 7987 7991 
//7997 7999 8013 8017 8029
