(function() {
	'use strict';

	var a=sluchch(1,20);
	var b=sluchch(1,20);
	var c=sluchch(1,20);

	var y='{\\frac{\\sqrt{'+(a*b*0.1).ts()+'}\\cdot\\sqrt{'+(a*c*0.1).ts()+'}}{\\sqrt{'+(c*b*0.01).ts()+'}}}';
	chas2.task.setTask({
		text: ('Найдите значение выражения $$'+y+'$$').plusminus(),
		answers: [''+a,
			],
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 0,
			'tri': 0,

		},
	});
})();
