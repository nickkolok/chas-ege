//B1 - 323609

(function(){
	var installing_coast = sl(1500, 3000);
	var water_coast_berfore = sl(800, 1100);
	var water_coast_after = sl(350, 700);

	window.vopr.txt = 'Установка двух счётчиков воды (холодной и горячей) стоит ' + installing_coast + ' рублей.' +
	                  'До установки счётчиков за воду платили ' + water_coast_berfore + ' рублей ежемесячно.' +
	                  'После установки счётчиков ежемесячная оплата воды стала составлять ' + water_coast_after +  ' рублей.' +
	                  'Через какое наименьшее количество месяцев экономия по оплате воды превысит затраты' +
	                  'на установку счётчиков, если тарифы на воду не изменятся?';

	window.vopr.ver = [(installing_coast / (water_coast_berfore - water_coast_after)).ceil()];

})();