(function(){
var installing_coast = sl(1500, 3000);
var water_coast_before = sl(800, 1100);
var water_coast_after = sl(350, 700);

NAtask.setTask({
	text : 'Установка двух счётчиков воды (холодной и горячей) стоит ' + installing_coast + ' рублей. ' +
	                  'До установки счётчиков за воду платили ' + water_coast_before + ' рублей ежемесячно. ' +
	                  'После установки счётчиков ежемесячная оплата воды стала составлять ' + water_coast_after +  ' рублей. ' +
	                  'Через какое наименьшее количество месяцев экономия по оплате воды превысит затраты ' +
	                  'на установку счётчиков, если тарифы на воду не изменятся?',
	answers : (installing_coast / (water_coast_before - water_coast_after)).ceil(),
});
})();
//Обзад 323609
// Sergey Naumov aka DrMGC
