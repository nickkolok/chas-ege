//РАБОТАЕТ
//58. Задание 4 № 320210
//Вероятность того, что батарейка бракованная, равна 0,06. Покупатель в
//магазине выбирает случайную упаковку, в которой две таких батарейки.
//Найдите вероятность того, что обе батарейки окажутся исправными.

(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		let predmet = sklonlxkand(['батарейка', 'сережка', 'насадка', 'шайба', 'лампочка'].iz());
		let mestoOptions = (predmet.ie === 'батарейка' || predmet.ie === 'лампочка') ? ['магазине', 'супермаркете',
			'торговом центре', 'киоске'
		] : ['магазине', 'торговом центре'];
		let mesto = mestoOptions.iz();

		let k = [2, 3].iz();
		let kolvo = ['две', 'три'][k - 2];
		let nayti = ['исправными', 'неисправными'].iz();
		let verbrak = sluchch(1, 30) / 100;
		let mest = (kolvo === 'две') ? 'обе' : 'все';

		let verispr = 1 - verbrak;
		let answers = (nayti === 'исправными') ? Math.pow(verispr, k) : Math.pow(verbrak, k);
		genAssertZ1000(answers);

		NAtask.setTask({
			text: `Вероятность того, что ${predmet.ie} бракованная, равна ${verbrak}. Покупатель в ${mesto} выбирает случайную упаковку, в которой ${kolvo} таких ${predmet.im}. Найдите вероятность того, что ${mest} ${predmet.im} окажутся ${nayti}.`,
			answers,
		});
	}, 100);
})();
