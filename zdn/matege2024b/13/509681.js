(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		// Отношение радиусов k и меньший радиус rSmall подобраны так,
		// чтобы больший радиус не превосходил 14 — как в прототипах ФИПИ.
		let k = sl(2, 7);
		let rSmall = sl(1, Math.floor(14 / k));
		let rBig = k * rSmall;

		let isVolume = ['volume', 'surface'].iz() === 'volume';

		let objectIm = isVolume ? 'объём' : 'площадь поверхности';
		let objectRod = isVolume ? 'объёма' : 'площади поверхности';
		let stepen = isVolume ? 3 : 2;

		let answer = Math.pow(k, stepen);

		let kto = ['меньшего', 'другого'].iz();

		NAtask.setTask({
			text: 'Даны два шара с радиусами ' + rBig + ' и ' + rSmall + '. Во сколько раз ' + objectIm + ' большего шара больше ' + objectRod + ' ' + kto + '?',
			answers: answer,
			analys: 'Радиус большего шара равен $' + rBig + '$, радиус меньшего — $' + rSmall + '$. ' + (isVolume ? 'Объёмы шаров относятся как кубы отношений радиусов: $' + k + '^3 = ' + answer + '$.' : 'Площади поверхностей шаров относятся как квадраты отношений радиусов: $' + k + '^2 = ' + answer + '$.'),
			authors: ['Надежда'],
		});
	}, 1000);
})();
