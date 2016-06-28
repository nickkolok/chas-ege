(function(){
	'use strict';

	var a = slKrome([90, 180, 270], 1, 359),
		at = '{' + a.ts() + '^\\circ}',
		b = sluchch(0.1, 400, 0.1).pm(),
		c = 2 .pow(sl(-2, 4)) * 5 .pow(sl(-2, 4)) .pm(),
		f = [
				['\\sin','\\cos'],
				['\\mathrm{tg~}', '\\cos^2'],
				['\\sin^2', '\\mathrm{ctg~}']
		].iz().shuffle(),

		vyr1 = f[0] + at+'\\cdot' + f[1] + at,
		vyr2 = '\\sin' + (2 * a).ts() + '^\\circ',

		y,
		answer;
	if(sl1()){
		y = '\\frac{' + b.ts() + '~' + vyr1 +
			'}{' + c.ts() + '~' + vyr2 + '}';
		answer = [(b / (2 * c)).ts()];
	}else{
		y = '\\frac{' + b.ts() + '~' + vyr2 + '}{' +
			c.ts() + '~' + vyr1 + '}';
		answer = [(b * 2 / c).ts()];
	}

	chas2.task.setTask({
		text: ('Найдите значение выражения $$'+y+'$$').plusminus().ts(),
		answers: answer,
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 0,
			'tri': 1,
		},
	});

})();
//Обзад 26755
//Николай Авдеев
