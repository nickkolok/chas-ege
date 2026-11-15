(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let vehicleKeys = Object.keys(om.adequateSpeed.vehicle);
		let drive = vehicleKeys.iz();
		let speedInterval = om.adequateSpeed.vehicle[drive];
		let speed1 = sl(speedInterval[0], speedInterval[1], 1);
		let driver = sklonlxkand(drive);

		let walkingRouteKeys = Object.keys(om.adequateSpeed.walkingRoute);
		let walk = walkingRouteKeys.iz();
		let walkInterval = om.adequateSpeed.walkingRoute[walk];
		let speed2 = sl(walkInterval[0], walkInterval[1], 1);
		let walker = sklonlxkand(walk);

		genAssert(speed1 > speed2, 'скорость транспорта должна превышать скорость пешехода');

		let time = sl(2, 12);
		let distance = (speed1 + speed2) * time;
		let diff = speed1 - speed2;

		NAtask.setTask({
			text: walker.ie.toZagl() + ' и ' + driver.ie + ' одновременно отправились из посёлков, ' +
				'расстояние между которыми $' + distance + '$ км, ' +
				'навстречу друг другу. ' +
				'Они встретились через ' + chislitlx(time, 'час', 'v$') + '. ' +
				'Скорость ' + driver.re + ' на $' + diff + '$ км/ч больше скорости ' + walker.re + '. ' +
				the_orderToFind.toZagl() + ' скорость ' + walker.re + '. ' +
				'Ответ дайте в км/ч.',
			answers: speed2,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();

//87361
//Открытый банк заданий 015541
//zer00player

