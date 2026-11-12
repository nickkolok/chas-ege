(function() {
	retryWhileError(function() {
		'use strict';
		let key = '317541';
		let preference = ['function_is_decreasing', 'function_is_increasing'];
		let rand = getSelectedPreferenceFromList(key, preference);

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
				conditions: [preference[rand]],
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
			preference: preference,
		});
	}, 10000);
})();
//317541 317745 513618 516292 516325 628743 628769 317747 317749 317751 317753 
//317755 317757 317759 317761 317763 317765 317767 317769 317771 317773 317775 
//317777 317779 317781 317783 317785 317787 317789 317791 317793 317795 317797 
//317799 317801 317803 317805 317807 317809 317811 317813 317815 317817 317819 
//317821 317823 317825 317827 317829 317831 317833 317835 317837 317839 317841 
//317843
