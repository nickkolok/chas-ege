(function() {
	retryWhileError(function() {
		'use strict';

		NAinfo.requireApiVersion(0, 2);
		let transport = [
			[
				['метла', 'ступа', 'ковёр-самолёт'].iz(), 'прилетит', 'надписями'
			],
			[
				['автомобиль', 'печь'].iz(), 'приедет', 'надписями'
			],
			[
				['волк', 'ёж'].iz(), 'прибежит', ['ушами', 'лапами', 'глазами'].iz()
			],
			[
				['конь', 'единорог', 'Конёк-Горбунок'].iz(), 'прискачет', ['копытами', 'ушами', 'боками'].iz()
			],
			['улитка', 'приползёт', 'усами']
		].iz();

		let difference = transport.pop();
		let move = transport.pop();
		transport = sklonlxkand(transport);

		let colors = sklonlxkand(['бордовый', 'лососевый', 'томатный', 'коралловый', 'шоколадный', 'оранжевый',
			'золотарниковый', 'оливковый', 'желтый', 'зеленый', 'лаймовый', 'бирюзовый'
		]).iz(4);
		let numberOfTransprt = sl(10, 100);
		let number1 = numberOfTransprt.nod(slKrome([numberOfTransprt, 1], 1, numberOfTransprt - 1));
		let number2 = numberOfTransprt - number1;
		let answer =  number1 / numberOfTransprt;
		
		let dop=0;
		
		if(sl1()){
			answer =  number2 / numberOfTransprt;
			dop=2;
		}
		
		genAssertZ1000(answer, "Кривая вероятность");
		NAtask.setTask({
			text: 'В фирме такси в наличии ' + numberOfTransprt + ' ' + transport[0].rm.replace('Конёк', 'Коньков').replace(
				'ковёр', 'ковров') + '; ' + number1 + ' из них ' + colors[0].ve + ' цвета с ' + colors[1].tm + ' ' +
				difference + ', ' + 'остальные — ' + colors[2].ve + ' цвета с ' + colors[3].tm + ' ' + difference + '. Найдите вероятность того, ' +
				'что на случайный вызов ' + move + ' ' + transport[0].ie + ' ' + colors[0 + dop].ve + ' цвета с ' + colors[1 + dop].tm +
				' ' + difference + '.',
			answers: answer,
		});

	}, 100);
})();
// 320193 525368
//SugarHedgehog
