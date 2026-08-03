(function() {
	'use strict';
	chas2.task.setTask({
		text: '$2 \\sin{\\frac{a-b}{2}}\\cdot\\cos{\\frac{a+b}{2}} =$<br/>',
		answers: [
			'$ \\sin{a}-\\sin{b}  $',
		],
		wrongAnswers: [
			'$ \\sin{2a} $',
			'$ \\cos{2a} $',
			'$ \\sin{a}+\\sin{b} $',
			'$ \\cos{a}-\\cos{b} $',
			'$ \\cos{a}+\\cos{b} $',
		],
	});
	AtoB();

})();
//Любовь Ерышова
