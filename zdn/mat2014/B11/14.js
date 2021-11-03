(function(){
	'use strict';

	var num1, num2, num3, degree, num;
	do {
		num1 = sluchch(2, 15);
		num2 = sluchch(15, 40);
		num3 = sluchch(2, 6);
		degree = sluchch(2, 4);
		num = num1.pow(1 / degree) * num2.pow(1 / degree) / num3.pow(1 / degree);
	} while (!num.isZ());
	if (degree == 2)
		degree = '';

	chas2.task.setTask({
		text: 'Найдите значение выражения $$\\frac{\\sqrt ['+degree+']{'+num1+'}\\cdot \\sqrt ['+degree+']{'+num2+
	'}}{\\sqrt ['+degree+']{'+num3+'}}$$',
		answers: [num,
		],
	});

})();
//Обзад 26746
//Lincor
