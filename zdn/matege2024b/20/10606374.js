(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let planDays = sl(5, 14);

		let extraDays = sl(2, 7);
		let factDays = planDays + extraDays;

		let deviation = sl(1, 5);

		let area = (deviation * planDays * factDays) / (factDays - planDays);

		genAssert(area.isAlmostInteger(), "Площадь должна быть целым числом");

		let planNorm = area / planDays;
		let factNorm = area / factDays;
		genAssert(factNorm > 0 && planNorm > factNorm, "Фактическая норма должна быть положительной и меньше плановой");

		NAtask.setTask({
			text: 'Рабочий получил задание за $' + planDays + '$ полных дней вымостить плиткой парковочную площадку. ' +
				'Однако он выполнил задание не за $' + planDays + '$, а за $' + factDays + '$ полных дней, ' +
				'так как каждый день отклонялся от нормы на $' + deviation + '$ м$^2$. ' +
				'Чему равна площадь парковочной площадки? Ответ дайте в квадратных метрах.',
			answers: area,
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
//10606374
//Открытый банк заданий A1D726
//zer00player

