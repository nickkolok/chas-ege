(function() {
	let moreless = sl1();
	let procent = sluchch(0.5, 0.95, 0.01);
	if(moreless){
	procent = 2-procent;} //2-proent == 1 - sluchch(0.05, 0.5, 0.01) + moreless
	let products = [
		[' телефон', sluchch(2000, 40000, 500)],
		[' телевизор', sluchch(10000, 90000, 500)],
		[' миксер', sluchch(1500, 8000, 100)],
		[' фен', sluchch(1000, 20000, 100)],
		[' утюг', sluchch(1500, 10000, 100)],
		[' пылесос', sluchch(3000, 25000, 500)],
		[' холодильник', sluchch(15000, 80000, 100)],
		[' чайник', sluchch(1000, 6000, 100)],
		[' планшет', sluchch(3000, 30000, 500)],
		[' обогреватель', sluchch(2000, 20000, 500)],
		[' кондиционер', sluchch(10000, 50000, 500)],
		[' ноутбук', sluchch(20000, 100000, 500)],
		[' компьютер', sluchch(25000, 150000, 500)]
	];
	let sluchProductNumber = sluchch(0, products.length - 1);
	let productName = products[sluchProductNumber][0];
	let firstPrice = products[sluchProductNumber][1];
	let secondPrice = firstPrice * procent;
	let answer = Math.abs(1 - procent) * 100;
	let slTime1 = sluchch(0, 11);
	let slTime2 = (slTime1 + sluchch(1, 6)) % 12;
	let mounth = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
	let sklonMounthTime1 = sklonlxkand(mounth[slTime1]);
	let sklonMounthTime2 = sklonlxkand(mounth[slTime2]);
	let difference = ['снизилась', 'увеличилась'];
	NAtask.setTask({
		text: 'Поступивший в продажу в ' + sklonMounthTime1.pe + productName + ' стоил ' + firstPrice +
			' рублей. В ' + sklonMounthTime2.pe + ' он стал стоить ' + secondPrice.ts() +
			' рублей. На сколько процентов ' + difference[moreless] + ' цена ' + sklonlxkand(productName).re +
			' в период с ' + sklonMounthTime1.re + ' по ' + sklonMounthTime2.ie + '?',
		answers: answer,
	});
})();
//530340

