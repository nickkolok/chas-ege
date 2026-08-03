(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let vehicleKeys = Object.keys(om.adequateSpeed.vehicle);
		let drive = vehicleKeys.iz();
		let speedInterval = om.adequateSpeed.vehicle[drive];
		let speed1 = sl(speedInterval[0], speedInterval[1], 1);
		let speed2 = slKrome([speed1], speedInterval[0], speedInterval[1], 1);
		let driver = sklonlxkand(drive);

		let time = sl(2, 12);
		let distance = (speed1 + speed2) * time;

		NAtask.setTask({
			text: 'Из двух городов, расстояние между которыми равно ' +
				chislitlx(distance, 'километр', 'v$') +
				', навстречу друг другу одновременно выехали ' + 'дв' + ['а', 'е'][driver.rod] + ' ' + driver.re + '. ' +
				'Через сколько часов ' + driver.im + ' встретятся, если их скорости равны $' +
				speed1 + '$ км/ч и $' + speed2 + '$ км/ч?',
			answers: time,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();

//10576387
//Открытый банк заданий 54FD72
//zer00player
//https://ege.sdamgia.ru/problem?id=112429


