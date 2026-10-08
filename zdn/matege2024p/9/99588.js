(function () {
	'use strict';
	retryWhileError(function () {
		/* Из двух городов, расстояние между которыми равно 560 км, навстречу друг другу одновременно выехали два автомобиля. Через сколько часов автомобили встретятся, если их скорости равны 65 км/ч и 75 км/ч? */

		let the_humanSettlementDestination = sklonlxkand(decor.humanSettlementDestination.iz()); // ["пункт","город","село","деревня"]
		let the_vehicleRacingOnRoad = sklonlxkand(decor.vehicleRacingOnRoad.iz()); // ["автобус","маршрутка","трактор","автомобиль","мотоцикл","велосипед","электросамокат","гироскутер","мотоциклист","велосипедист","машина","гонщик","грузовик","автомобилист"]

		let speeds = om.adequateSpeed.vehicle[the_vehicleRacingOnRoad.ie];
		let speed1 = sl(speeds[0], speeds[1]);
		let speed2 = slKrome(speed1, speeds[0], speeds[1]);
		let distance = sl(200, 560);

		let answer = distance / (speed1 + speed2);
		genAssertZ1000(answer / 10, 'Ответ не должен быть слишком уж дробным');

		NAtask.setTask({
			text: 'Из двух ' + the_humanSettlementDestination.rm + ', ' +
				'расстояние между которыми равно ' + distance + ' км, ' +
				'навстречу друг другу одновременно выехали ' + ['два', 'две'][the_vehicleRacingOnRoad.rod] + ' ' + the_vehicleRacingOnRoad.re + '. ' +
				'Через сколько часов ' + the_vehicleRacingOnRoad.im + ' встретятся, ' +
				'если их скорости равны ' + speed1 + ' км/ч и ' + speed2 + ' км/ч?',
			answers: answer,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard( /*true*/);
	}, 2000);
})();
// РешуЕГЭ: 
// 99588 112399 112457 548509 548528 112401 112403 112405 112407 112409 112411 112413 112415 112417 112419 112421 112423 112425 112427 112429 112431 112433 112435 112437 112439 112441 112443 112445 112447 112449 112451 112453 112455
