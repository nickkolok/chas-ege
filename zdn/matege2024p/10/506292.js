let basePrice = sluchch(1000, 5000, 100);
let difference = sluchch(200, 900, 100);
let measurement = sluchch(4, 15);
let slOwner = sluchch(0, 4);
let slObject = sluchch(0, 5);
let slWorker = sluchch(0, 3);
let measurements = ' глубиной ';

let progression = new ArithmeticProgression(basePrice, difference);

if (slObject > 0) {
	measurements = sl1() === 0 ? ' шириной ' : ' длиной ';
}

let Worker = [' рабочий', ' трудящийся', 'работник', 'сотрудник'];
let Owner = ['хозяин', 'фермер', 'землевладелец', 'собственник', 'владелец'];
let Object = ['колодец', 'скважину', 'яму', 'шахту', 'траншею', 'канаву'];

NAtask.setTask({
	text: Owner[slOwner].toZagl() + ' договорился с ' + sklonlxkand(Worker[slWorker]).tm + ', что они выкопают ему ' +
		Object[slObject] +
		' на следующих условиях: за первый метр он заплатит им ' +
		chislitlx(basePrice, 'рубль') +
		', а за каждый следующий метр  — на ' + chislitlx(difference, 'рубль') +
		'  больше, чем за предыдущий. Сколько рублей ' + Owner[slOwner] + ' должен будет ' + 
		['заплатить ', 'выплатить ', 'отдать '].iz() + sklonlxkand(Worker[slWorker]).dm +
		', если они ' + ['выкопают ', 'откопают ', 'сделают '].iz() + Object[slObject] + measurements +
		chislitlx(measurement, 'метр') + ' ?',
	answers: progression.sum(measurement),
});

//506292
