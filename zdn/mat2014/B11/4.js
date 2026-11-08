(function(){
	'use strict';

	var a = sluchch(1,37),
		b = slKrome(isPolnKvadr,2,99),
		c,
		x;
	do{
		c = a.pow(sl(0,2))*2 .pow(sl1())*5 .pow(sl1()).pm();
	}while(c == 1);

	x = (a * a * b / c).toFixedLess(5);

	chas2.task.setTask({
		text: ('Найдите значение выражения $$\\frac{\\left ({'+a+
	'\\sqrt{'+b+'}}\\right )^{2}}{'+c+'}$$').plusminus(),
		answers: x,
	});
})();
