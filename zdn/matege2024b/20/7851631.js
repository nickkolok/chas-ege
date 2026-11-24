(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let nameOfPerson = sklonlxkand(om.maleNames.iz());
		let time = sl(3, 30);
		let firstPainter = sl(1.1, 2.5, 0.1);
		let secondPainter = slKrome([firstPainter], 1.1, 2.5, 0.1);
		let totalSpeedFactor = 1 + firstPainter + secondPainter;

		let totalTime = time / totalSpeedFactor;

		genAssert((totalTime * 10).isAlmostInteger(), "Время должно иметь не более одного знака после запятой");

		NAtask.setTask({
			text: 'Поручение на окрашивание деталей маляр ' + nameOfPerson.ie + ' мог выполнить за ' + chislitlx(time, 'час', 'r$') + '. ' +
				'Однако к нему на помощь были направлены ещё два маляра. Скорость работы первого в $' + firstPainter + '$ раза, ' +
				'а второго в $' + secondPainter + '$ больше, чем у ' + nameOfPerson.re + '. За какое время они втроём выполнят окрашивание деталей, ' +
				'порученных ' + nameOfPerson.te + '? Ответ выразите в часах.',
			answers: totalTime,
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();

//7851631
//Открытый банк заданий 77CE6F
//zer00player

