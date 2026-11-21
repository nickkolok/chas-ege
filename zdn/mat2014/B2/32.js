(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	const goods = sklonlxkand(['тетрадь', 'шуруп', 'карандаш', 'ручка'].iz());
	const cost = sl(5, 25);
	const quantity = sl(20, 70);
	const threshold = sl(30, 50, 10);
	const discount = sl(5, 12);
	const client = ['покупатель', 'школьник', 'ученик'].iz();
	const shop = ['киоск', 'ларёк', 'магазин'].iz();
	const payable = cost * quantity * (quantity > threshold ? 100 - discount : 100) / 100;
	NAtask.setTask({
		text: goods.ie.toZagl() + ' стоит ' + chislitlx(cost, 'рубль') + '. Сколько рублей заплатит ' +
			client + ' за ' + chislitlx(quantity, goods) + ', если при покупке больше ' + chislitlx(threshold, goods) +
			' ' + shop + ' делает скидку ' + discount + '% от стоимости всей покупки?',
		answers: payable,
	});
	NAtask.modifiers.allDecimalsToStandard();
})();
// Обзад 77343
// Павел Lopaste
