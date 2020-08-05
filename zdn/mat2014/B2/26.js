(function() {
	'use strict';

	var clothes = sklonlxkand(['футболка', 'майка', 'толстовка', 'куртка', 'рубашка'].iz());
	var oldprice, newprice, answer;
	do {
		oldprice = sluchch(600, 1000);
		newprice = sluchch(400, oldprice - 100);
		answer = 100 - newprice / oldprice / 100;
	} while (answer % 1 !== 0)
	window.vopr.txt = clothes.ie.toZagl() + " стоила " + chislitlx(oldprice, "рубль") + ". " +
		"После снижения цены она стала стоить " + chislitlx(newprice, "рубль") + ". " +
		"На сколько процентов была снижена цена на " + clothes.ve + "?";

	window.vopr.ver = [answer];
})();

//Обзад 26630
//Lincor
//Fixed by Aisse-258
