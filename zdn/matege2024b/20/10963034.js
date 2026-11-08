(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let walkerKeys = Object.keys(om.adequateSpeed.walkingRoute);
		let walk = walkerKeys.iz();
		let walkInterval = om.adequateSpeed.walkingRoute[walk];
		let walker = sklonlxkand(walk);
		let speed1 = sl(walkInterval[0], walkInterval[1], 1);
		let speed2 = slKrome([speed1], walkInterval[0], walkInterval[1], 1);

		genAssert(speed2 > speed1, 'Второй человек должен быть быстрее первого');

		let distance = sl(20, 90) / 10;

		let answer = (2 * speed1 * distance) / (speed1 + speed2);

		genAssert(answer < distance, "Встреча должна быть до опушки");

		genAssert((answer * 100).isAlmostInteger(), "Расстояние должно иметь 2 или меньше знаков после запятой");

		NAtask.setTask({
			text: 'Два ' + walker.re + ' одновременно отправляются из одного дома на прогулку до опушки леса, ' +
				'находящейся в $' + distance + '$ км от дома. Один идёт со скоростью $' + speed1 + '$ км/ч, ' +
				'а другой — со скоростью $' + speed2 + '$ км/ч. Дойдя до опушки, второй с той же скоростью ' +
				'возвращается обратно. На каком расстоянии от дома произойдёт их встреча? Ответ дайте в километрах.',
			answers: answer,
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();

//10963034
//Открытый банк заданий A7485A
//zer00player

