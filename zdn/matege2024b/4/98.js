(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let price = sl(100, 500, 10);
		let rideTime = sl(7, 30);
		let minute = sl(3, rideTime - 2);
		let extraPrice = sl(3, 50);
		let cost = price + extraPrice * (rideTime - minute);
		let name = ['Эх, прокачу!', 'Тачка', 'Соник', 'Флеш', 'Стрела', 'Экспресс', 'А-Поезд', 'Ртуть', 'Магелланов путь'].iz();

		NAtask.setTask({
			text:
				'В фирме «' + name + '» стоимость поездки на такси длительность меньше ' + chislitlx(minute, 'минута', 'r$') +
				' составляет $' + price + '$ рублей. ' +
				'Если поездка длится ' + chislitlx(minute, 'минута', 'v$') + ' или более, ' +
				'то её стоимость (в рублях) рассчитывается по формуле $C =' + price + '+ ' + extraPrice + ' \\cdot (t - ' + minute + ')$, где $t$ – длительность поездки, ' +
				'выраженная в минутах ($t>' + minute + '$). Пользуясь этой формулой, ' +
				'рассчитайте стоимость $' + rideTime + '$-минутной поездки.',
			answers: cost,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://oge.sdamgia.ru/test?likes=98
//zer00player
