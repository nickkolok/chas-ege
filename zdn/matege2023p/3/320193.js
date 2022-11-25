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
		let colors = sklonlxkand(['темно-бордовый', 'темно-красный', 'лососевый', 'томатный', 'коралловый',
			'оранжево-красный',
			'шоколадный', 'песочно-коричневый', 'темно-оранжевый', 'оранжевый', 'золотарниковый', 'оливковый',
			'желтый', 'зелёно-желтый', 'зеленый', 'лаймовый', 'бирюзовый', 'темно-бирюзовый',
			'сине-фиолетовый'
		]).iz(4);
		let numberOfTransprt = sl(10, 100);
		let number = numberOfTransprt.nod(slKrome([numberOfTransprt,1], 1, numberOfTransprt - 1));
		let dop = 0;
		if (sl1()) {
			number = numberOfTransprt - number;
			dop = 1;
		}
		genAssertZ1000(number / numberOfTransprt, "Кривая вероятность");
		NAtask.setTask({
			text: 'В фирме такси в наличии ' + numberOfTransprt + ' ' + transport[0].rm.replace('Конёк', 'Коньков').replace(
					'ковёр', 'ковров') +
				';' +
				' ' + number + ' из них ' + colors[0].ve + ' цвета с ' + colors[1].tm + ' ' + difference + ', ' +
				'остальные — ' + colors[2].ve + ' цвета с ' + colors[3].tm + ' ' + difference + '. Найдите вероятность того, ' +
				'что на случайный вызов ' + move + ' ' + transport[0].ie + ' ' + colors[0 + dop].ve + ' цвета с ' + colors[1 +
					dop].tm +
				' ' + difference + '.',
			answers: (number / numberOfTransprt).ts(),
		});

	});
})();
// 320193 525368
//SugarHedgehog
