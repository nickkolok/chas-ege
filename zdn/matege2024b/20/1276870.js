(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let walkingRouteKeys = Object.keys(om.adequateSpeed.walkingRoute);
		let walk = walkingRouteKeys.iz();
		let walkInterval = om.adequateSpeed.walkingRoute[walk];
		let speed = sl(walkInterval[0], walkInterval[1], 1);
		let walker = sklonlxkand(walk);

		let timeSeconds = sl(5, 60);

		let distanceMeters = (speed * timeSeconds) / 3.6;

		genAssert(distanceMeters.isAlmostInteger(), "Расстояние должно быть целым числом метров");

		let exactSpeedKmh = (distanceMeters * 3.6) / timeSeconds;

		genAssert((exactSpeedKmh * 100).isAlmostInteger(), "Скорость должна иметь не более двух знаков после запятой");

		NAtask.setTask({
			text: walker.ie.toZagl() + ' пробежал дистанцию $' + distanceMeters + '$ метров за $' + timeSeconds + '$ секунд. ' +
				'Найдите среднюю скорость ' + walker.re + ' на дистанции. Ответ дайте в километрах в час.',
			answers: exactSpeedKmh,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
//1276870
//Открытый банк заданий 137BC6
//zer00player

