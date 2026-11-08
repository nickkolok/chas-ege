(function() {
	'use strict';

	var a=sluchch(1,20);
	var b=sluchch(1,20);
	var c=sluchch(1,20);

	chas2.task.setTask({
		text: ('Найдите значение выражения $${\\frac{\\sqrt{'+(a*b*0.1).ts()+'}\\cdot\\sqrt{'+(a*c*0.1).ts()+'}}{\\sqrt{'+(c*b*0.01).ts()+'}}}$$').plusminus(),
		answers: a,
	});
})();
