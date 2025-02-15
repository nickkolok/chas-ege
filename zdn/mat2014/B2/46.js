(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(3, 7);
	var money = [
		['гривна', 2.80, 'гривны', 20, 21, 22, 23, 24],
		['йена', 0.66, 'йены', 350, 390, 400, 420, 450],
		['доллар', 75.60, 'доллары', 2, 3, 4, 5, 6],
		['вона', 0.06, 'воны', 2500, 2600, 2700, 2800, 2850],
		['юань', 11.50, 'юани', 10, 11, 12, 13, 14],
		].iz();
	var rub = money[1] % 1;
	var vesproducta = sluchch(1, 5); // вес купленного товара
	var product = [
		['помидоров'],
		['капусты'],
		['яблок'],
		['слив'],
		].iz();
	var otwet = money[1] * money[a] * vesproducta;
	     
		NAtask.setTask({
		text: 'В обменном пункте 1 ' + money[0] + ' стоит ' + chislitlx(money[1].floor(), 'рубль').esli(money[1].floor() >
				                    0) + '  ' + chislitlx((money[1] * 100) % 100, 'копейка') + '.' +
				            ' Отдыхающие обменяли рубли на ' + money[2] + ' и купили ' + vesproducta + ' кг ' + product + ' по цене  ' +
				            chislitlx(money[a], money[0]) + ' за 1 кг. ' +
				            'Во сколько рублей обошлась им эта покупка? Ответ округлите до целого числа. ',
		answers: otwet.round(),
		});
})();

