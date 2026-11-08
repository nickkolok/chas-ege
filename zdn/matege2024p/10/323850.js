(function() { 'use strict'; retryWhileError(function() {
	/* Дорога между пунктами А и В состоит из подъёма и спуска, а её длина равна 22 км. Путь из А в В занял у туриста 8 часов, из которых 3 часа ушло на спуск. Найдите скорость туриста на спуске, если она больше скорости на подъёме на 2 км/ч. Ответ дайте в км/ч. */

	let S=sl(5, 30, 0.01);
	let T=sl(180, 600, 1);
	let t=sl(45, T/3, 1);
	let v=sl(1, 4, 0.01);
	let answ=60*(S+v*(T-t)/60)/T;
	genAssert(answ-v>0.001,'разница скоростей отрицательная');
	genAssert(answ<7,'скорость слишком большая');
	genAssertZ1000(answ,'ответ слишком дробный');

	let the_humanSettlementDestination = sklonlxkand(decor.humanSettlementDestination.iz());
	let the_pedestrianOnRoad = sklonlxkand(decor.pedestrianOnRoad.iz());
	let the_orderToFind = decor.orderToFind.iz();

	NAtask.setTask({
		text:
			'Дорога между ' + the_humanSettlementDestination.tm +' A и B состоит из подъёма и спуска, '+
			'а её длина равна ' + S + ' км. '+
			'Путь из A в B занял у ' + the_pedestrianOnRoad.re +' ' + T.toChMin() + ', '+
			'из которых ' + t.toChMin() + ' ушло на спуск. ',
		questions: [{
				text: the_orderToFind.toZagl() +' скорость ' + the_pedestrianOnRoad.re +' на спуске, '+
					'если она больше скорости на подъёме на ' + v + ' км/ч. '+
					'Ответ дайте в км/ч.',
				answer: answ,
				analys: '$\\dfrac{S+v(T-t)}{T}$'
			}, {
				text: the_orderToFind.toZagl() +' скорость ' + the_pedestrianOnRoad.re +' на подъёме, '+
					'если она меньше скорости на спуске на ' + v + ' км/ч. '+
					'Ответ дайте в км/ч.',
				answer: answ-v,
				analys: '$\\dfrac{S-vt}{T}$'
			}
		],
		authors: ['Aisse-258'],
	});
	NAtask.modifiers.allDecimalsToStandard();
	NAtask.modifiers.variativeABC([],{preserve:['S','T']});
}, 20000);})();
/*Решу ЕГЭ 323850: 503125 323897 323899 323901 323903 323905 323907 323909 323911 323935
			323913 323915 323917 323919 323921 323923 323925 323927 323929 323931 323933*/

