//44. Задание 4 № 320195
//Вероятность того, что новый DVD-проигрыватель в течение года поступит в гарантийный ремонт, равна 0,045.
//В некотором городе из 1000 проданных DVD-проигрывателей в течение года в гарантийную мастерскую поступила 51 штука.
//На сколько отличается частота события «гарантийный ремонт» от его вероятности в этом городе?

(function(){'use strict';
NAinfo.requireApiVersion(0, 0);
var predm = sklonlxkand(['DVD-проигрыватель','ноутбук','телевизор','монитор','холодильник','пылесос','блендер','принтер','сканер','шуруповерт','насос'].iz());
var period = sklonlxkand(['год','месяц'].iz());

do{
	var ver = sluchch(0.013,0.089, 0.001);
	var kolvo = sluchch(40,500);
	var prodano = sluchch(900,2000);
	var answers = kolvo/prodano-ver;
} while ((answers*1000)%1 !== 0);

NAtask.setTask({
	text: 'Вероятность того, что новый '+predm.ie+' в течение '+period.re+' поступит '+
		'в гарантийный ремонт, равна '+ver.ts()+'. В некотором городе из '+prodano+' проданных '+predm.rm+' '+
		'в течение '+period.re+' в гарантийную мастерскую поступило '+chislitlx(kolvo,'штука')+'. На сколько отличается частота '+
		'события «гарантийный ремонт» от его вероятности в этом городе?',
	answers: Math.abs(answers),
});
})();