//45. Задание 4 № 320196
//При изготовлении подшипников диаметром 67 мм вероятность того, что диаметр
//будет отличаться от заданного не больше, чем на 0,01 мм, равна 0,965.
//Найдите вероятность того, что случайный подшипник будет иметь диаметр
//меньше чем 66,99 мм или больше чем 67,01 мм.

(function(){'use strict';
NAinfo.requireApiVersion(0, 0);
var predm = sklonlxkand(['подшипник','болт','винт','гвоздь','шайба','гайка'].iz());
var diametr = sklonlxkand(['диаметр','радиус'].iz());
var bolee_menee = [['больше','меньше'],['более','менее']].iz();
var diam = sluchch(10,78);
var otl = sluchch(0.005,0.015,0.001);
var minotl = diam-otl;
var maxotl = diam+otl;
var ver = (sluchch(960,989))/1000;
NAtask.setTask({
	text: 'При изготовлении '+predm.rm+' '+diametr.te+' '+diam+' мм вероятность того, что '+diametr.ie+' '+
		'будет отличаться от заданного не '+bolee_menee[0]+', чем на '+otl.ts()+' мм, равна '+ver.ts()+'. '+
		'Найдите вероятность того, что '+lx['случайный'].i[predm.rod]+' '+predm.ie+' будет иметь '+diametr.ie+' '+
		bolee_menee[1]+' чем '+minotl.ts()+' мм или '+bolee_menee[0]+' чем '+maxotl.ts()+' мм.',
	answers: (1-ver),
});
})();
