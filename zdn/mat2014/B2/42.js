(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	var komis = sluchch(2, 10);
	var rubl = sluchch(200, 500, 10);
	var kratn = [5, 10, 50].iz();
	var imena = sklonlxkand(['Надя', 'Валера', 'Дима', 'Игорь', 'Галя', 'Иван', 'Гена', 'Григорий', 'Пётр', 'Роман'].iz());
	var sche = ['qiwi', 'брата', 'мобильного телефона', 'webmoney'].iz();

	NAtask.setTask({

	        text: 'При оплате услуг через платежный терминал взимается комиссия ' + chislitlx(komis, 'процент') + '. ' +
		    'Терминал принимает суммы, кратные ' + chislitlx(kratn, 'рубль') + '. ' +
		    ' ' + imena.ie + ' хочет положить на счет ' + sche + ' не меньше ' + chislitlx(rubl, 'рубль') + '. ' +
		    'Какую минимальную сумму надо положить в приемное устройство данного терминала? ',

		answers: ((rubl / (1 - komis / 100)) / kratn).ceil() * kratn,
	});
})();
// Обзад 77352
// WaziX

