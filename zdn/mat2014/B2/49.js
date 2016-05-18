	(function() {
		NAinfo.requireApiVersion(0, 2);
		(function() {
     
			NAinfo.requireApiVersion(0, 2);
				var stoimost = sluchch(1000, 10000);
				var stoimostdo = sluchch(500, 950, 50);
				var stoimostposle = sluchch(100, 450);
				var otvet = stoimost / (stoimostdo - stoimostposle);
			NAtask.setTask({
			text: 'Установка двух счётчиков воды (холодной и горячей) стоит ' + chislitlx(stoimost, 'рубль') + '.' +
                                    ' До установки счётчиков за воду платили ' + chislitlx(stoimost, 'рубль') + '  ежемесячно. После установки' +
                                    ' счётчиков ежемесячная оплата воды стала составлять ' + chislitlx(stoimostposle, 'рубль') + ' . Через какое' +
                                    ' наименьшее количество месяцев экономия по оплате воды превысит затраты на' +
                                    ' установку счётчиков, если тарифы на воду не изменятся? ',
     
			answers: otvet.ceil(),
			});
     
			})();
     
	})();

