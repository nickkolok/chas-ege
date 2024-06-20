(function(){
	'use strict';

	var a = slKrome(isPolnKvadr,10,99),
		b,
		c = ['+','-'].shuffle();
	do{
		b = slKrome(isPolnKvadr,10,99);
	}while(b == a);


	chas2.task.setTask({
		text: 'Найдите значение выражения $$(\\sqrt{'+a+'}'+c[0]+'\\sqrt{'+b+'})(\\sqrt{'+a+'}'+c[1]+'\\sqrt{'+b+'})$$',
		answers: [''+(a-b),
			],
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 0,
			'tri': 0,
		},
	});

})();
