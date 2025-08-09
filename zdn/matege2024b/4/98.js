(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let price = sl(100, 500, 10);
		let minute = sl(7, 30);
		let cost = price + 11 * (minute - 5);
		let name = ['Эх,прокачу!', 'Фарсаж', 'Соник', 'Флеш', 'Стрела', 'Экспресс', 'А-Поезд', 'Ртуть', 'Магелланов путь'].iz();

		NAtask.setTask({
			text:
				'В фирме «' + name + '» стоимость поездки на такси длительность меньше $5$ минут' +
				' составляет $' + price + '$ рублей. ' +
				'Если поездка длится $5$ минут или более, ' +
				'то её стоимость(в рублях) рассчитывается по формуле $C =' + price + '+11*(t - 5)$, где $t$ – длительность поездки, ' +
				'выраженная в минутах ($t>5$). Пользуясь этой формулой, ' +
				'рассчитайте стоимость $' + minute + '$-минутной поездки.',
			answers: cost,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://oge.sdamgia.ru/test?likes=98
//zer00player
