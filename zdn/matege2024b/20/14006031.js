(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let pass = om.rusbukv.iz(2);

		let walkerKeys = Object.keys(om.adequateSpeed.walkingRoute);
		let walkerKey = walkerKeys.iz();
		let walker = sklonlxkand(walkerKey);
		let speedRange = om.adequateSpeed.walkingRoute[walkerKey];
		let uphillSpeed = sl(speedRange[0], speedRange[1], 1);

		let totalHours = sl(7, 16);
		let downhillHours = sl(3, totalHours - 2);
		let uphillHours = totalHours - downhillHours;

		genAssert(uphillHours >= 2, "Время на подъём должно быть хотя бы 2 часа");

		let moreSpeed = sl(1, 4);
		let downhillSpeed = uphillSpeed + moreSpeed;

		let totalDistance = uphillSpeed * uphillHours + downhillSpeed * downhillHours;

		NAtask.setTask({
			text: 'Дорога между пунктами ' + pass[0] + ' и ' + pass[1] +
				' состоит из подъёма и спуска, а её длина равна $' + totalDistance + '$ км. ' +
				'Путь из ' + pass[0] + ' в ' + pass[1] + ' занял у ' +
				walker.re + ' ' + chislitlx(totalHours, 'час', 'v$') +
				', из них ' + chislitlx(downhillHours, 'час', 'v$') + ' ушло на спуск. ' +
				'Найдите скорость ' + walker.re + ' на спуске, если она больше скорости на подъёме на $' + moreSpeed + '$ км/ч. ' +
				'Ответ дайте в км/ч.',
			answers: downhillSpeed,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
//zer00player
//14006031
//Открытый банк заданий 54FD72
