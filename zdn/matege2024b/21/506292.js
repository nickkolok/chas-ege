(function() {
	let basePrice = sluchch(1000, 5000, 100);
	let difference = sluchch(200, 900, 100);
	let measurement = sluchch(4, 15);
	let slWell = sluchch(0, 5);
	let measurements = ' глубиной ';

	let progression = new ArithmeticProgression(basePrice, difference);

	if (slWell > 0) {
		measurements = [' шириной ', ' длиной '].iz();
	}

	let Worker = ['рабочий', 'землекоп', 'работник', 'сотрудник'].iz();
	let Owner = ['хозяин', 'фермер', 'землевладелец', 'собственник', 'владелец', 'лесник', 'дачник', 'огородник'].iz();
	let Well = ['колодец', 'скважина', 'яма', 'шахта', 'траншея', 'канава'];
	let sklonWorker = sklonlxkand(Worker);
	let sklonWell = sklonlxkand(Well[slWell]);

	NAtask.setTask({
		text: Owner.toZagl() + ' ' + ['договорился', 'условился'].iz() + ' с ' + sklonWorker.tm + ', что они ' + 
			['выкопают', 'откопают', 'сделают'].iz() + ' ему ' + sklonWell.ve +
			' на следующих условиях: за первый метр он заплатит им ' + chislitlx(basePrice, 'рубль') +
			', а за каждый ' + ['следующий', 'последующий'].iz() + ' метр  — на ' + chislitlx(difference, 'рубль') +
			'  больше, чем за предыдущий. Сколько рублей ' + Owner + ' должен будет ' + 
			['заплатить', 'выплатить', 'отдать'].iz() + ' ' + sklonWorker.dm +
			', если они ' + ['выкопают', 'откопают', 'сделают'].iz() + ' ' + sklonWell.ve + measurements +
			chislitlx(measurement, 'метр') + ' ?',
		answers: progression.sum(measurement),
	});
})();

//506292
