//РАБОТАЕТ
//61. Задание 4 № 325904
//За круглый стол на 9 стульев в случайном порядке рассаживаются 7 мальчиков и 2 девочки.
//Найдите вероятность того, что обе девочки будут сидеть рядом.

(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		const people1 = ['мальчиков', 'девочек'].iz();
		const kolvomest = sluchch(5, 201);
		const kolvopeople1 = kolvomest - 2;
		let people2 = people1 === 'мальчиков' ? 'девочки' : 'мальчика';
		let mest = people1 === 'мальчиков' ? 'обе' : 'оба';

		const nayti = ['будут', 'не будут'].iz();
		const answers1 = 2 / (kolvomest - 1);
		const answ1 = answers1 * 10000; // можно умножать и на 1000, тогда ответ будет максимум до сотых
		
		genAssert(answ1 % 10 === 0, 'Ответ кратен 10');
		genAssert(answers1.mzhd(0, 1), 'Ответ вне интервала (0; 1)');

		NAtask.setTask({
			text: `За круглый стол на ${chislitlx(kolvomest, 'стул')} в случайном порядке рассаживаются ${kolvopeople1} ${people1} и 2 ${people2}. Найдите вероятность того, что ${mest} ${people2} ${nayti} сидеть рядом.`,
			answers: nayti === 'будут' ? answers1 : 1 - answers1,
		});
	}, 100);
})();
