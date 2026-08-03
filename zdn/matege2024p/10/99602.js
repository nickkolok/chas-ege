(function () {
	'use strict'; retryWhileError(function () {
		/* Расстояние между пристанями A и B равно 135 км. Из A в B по течению реки отправился плот, а через 2 часа вслед за ним отправилась яхта, которая, прибыв в пункт B, тотчас повернула обратно и возвратилась в A. К этому времени плот прошел 80 км. Найдите скорость яхты в неподвижной воде, если скорость течения реки равна 4 км/ч. Ответ дайте в км/ч. */

		let distanceBetweenPoints = sl(50, 200);
		let speedRiver = sl(1, 10);
		let speedTransport = sl(20, 80);
		let timeAfter = sl(1, 5);

		let distanceRaft = speedRiver * (2 * distanceBetweenPoints * speedTransport / (speedTransport.pow(2) - speedRiver.pow(2)) + timeAfter);
		genAssert(distanceRaft < distanceBetweenPoints, 'Плот не может проплыть дальше пункта B');
		genAssertZ1000(distanceRaft / 10, 'Расстояние, которое прошёл плот, слишком дробное');

		let the_berthForFloatingVehicle = sklonlxkand(decor.berthForFloatingVehicle.iz()); // ["пристань","причал"]
		let the_humanSettlementDestination = sklonlxkand(decor.humanSettlementDestination.iz()); // ["пункт","город","село","деревня"]
		let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]
		let the_activeFloatingVehicle = sklonlxkand(decor.activeFloatingVehicle.iz()); // ["пароход","теплоход","каяк","корабль","паром","катер","лодка","байдарка","баржа","яхта","моторная лодка"]

		NAtask.setTask({
			text:
				'Расстояние между ' + the_berthForFloatingVehicle.tm + ' ' + ['A', 'B'].shuffleJoin(' и ') + ' равно ' + distanceBetweenPoints + 
				' км. Из A в B по течению реки отправился плот, ' +
				'а через ' + chislitlx(timeAfter, 'час') + ' ' + ['вслед', 'вдогонку', 'следом'].iz() + ' за ним ' + selectVerbGender('отправился', the_activeFloatingVehicle.ie) + ' ' + the_activeFloatingVehicle.ie +
				', котор' + ['ый', 'ая', 'ое'][the_activeFloatingVehicle.rod] + ', прибыв в ' + the_humanSettlementDestination.ve +
				' B, тотчас ' + selectVerbGender('повернул', the_activeFloatingVehicle.ie) +
				' обратно и ' + selectVerbGender('возвратился', the_activeFloatingVehicle.ie) +' в A. К этому времени плот прошёл ' + distanceRaft + ' км. ' + the_orderToFind.toZagl() + ' скорость ' +the_activeFloatingVehicle.re + ' в неподвижной воде, ' +
				'если скорость течения реки равна ' + speedRiver + ' км/ч. ' +
				'Ответ дайте в км/ч.',
			answers: speedTransport,
			authors: ['Суматохина Александра'],
		});
		NAtask.modifiers.allDecimalsToStandard();
		NAtask.modifiers.variativeABC();
	}, 2000);
})();
// РешуЕГЭ: 
// 99602: 115023 115027 562755 635961 114975 114977 114979 114981 114983 114985 114987 114989 114991 114993 114995 114997 114999 115001 115003 115005 115007 115009 115011 115013 115015 115017 115019 115021 115025 635858
