(function(){'use strict';

chas2.task.setTask({
	text: '$\\cos(a+b) =$<br/>',
	answers: [
		'$ \\cos{a} \\cos{b} - \\sin{a} \\sin{b} $',
		'$ \\cos{b} \\cos{a} - \\sin{b} \\sin{a} $',
		'$ \\cos{a} \\cos{b} - \\sin{b} \\sin{a} $',
	],
	wrongAnswers: [
		'$ \\sin{a} \\cos{b} - \\cos{a} \\sin{b} $',
		'$ \\sin{a} \\sin{b} + \\cos{a} \\cos{b} $',
		'$ \\sin{a} \\sin{b} - \\cos{a} \\cos{b} $',
		'$ \\cos{a} \\sin{b} - \\sin{a} \\cos{b} $',
	],
});
AtoB();

})();
//Любовь Ерышова
