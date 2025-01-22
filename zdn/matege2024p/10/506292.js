let basePrice = sluchch(1000, 5000, 100);
let difference = sluchch(200, 900, 100);
let measurement = sluchch(4, 15);
let slOwner = sluchch(0, 4);
let slWell = sluchch(0, 5);
let slWorker = sluchch(0, 3);
let measurements = ' глубиной ';

let progression = new ArithmeticProgression(basePrice, difference);

if (slWell > 0) {
	measurements = [' шириной ', ' длиной '].iz();
}

let Worker = ['рабочий', 'землекоп', 'работник', 'сотрудник'];
let Owner = ['хозяин', 'фермер', 'землевладелец', 'собственник', 'владелец'];
let Well = ['колодец', 'скважину', 'яму', 'шахту', 'траншею', 'канаву'];
let sklonWorker = sklonlxkand(Worker[slWorker]);

NAtask.setTask({
	text: Owner[slOwner].toZagl() + [' договорился', ' условился'] + ' с ' + sklonWorker.tm + ', что они ' + 
		['выкопают', 'откопают', 'сделают'].iz() + ' ему ' + Well[slWell] +
		' на следующих условиях: за первый метр он заплатит им ' +
		chislitlx(basePrice, 'рубль') +
		', а за каждый ' + ['следующий', 'последующий'].iz() + ' метр  — на ' + chislitlx(difference, 'рубль') +
		'  больше, чем за предыдущий. Сколько рублей ' + Owner[slOwner] + ' должен будет ' + 
		['заплатить ', 'выплатить ', 'отдать '].iz() + sklonWorker.dm +
		', если они ' + ['выкопают ', 'откопают ', 'сделают '].iz() + Well[slWell] + measurements +
		chislitlx(measurement, 'метр') + ' ?',
	answers: progression.sum(measurement),
});

//506292
