(function() {
	'use strict';
	
	chas2.task.setTask({
		text: '$\\sin(a+b) =$<br/>',
		answers: [
			 '$ \\sin{a} \\cos{b} + \\cos{a} \\sin{b} $',
			 '$ \\cos{a} \\sin{b} + \\sin{a} \\cos{b} $',
			],
			wrongAnswers: [
			'$ \\sin{a} \\cos{b} - \\cos{a} \\sin{b} $',
			'$ \\sin{a} \\sin{b} + \\cos{a} \\cos{b} $',
			'$ \\sin{a} \\cos{b} - \\cos{a} \\sin{b} $',
			'$ \\sin{a} \\sin{b} - \\cos{a} \\cos{b} $',
			'$ \\sin{b} \\cos{a} + \\cos{a} \\sin{b} $',
		],
		});
		AtoB();
})();

