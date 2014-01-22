(function(){

var rasst=sl(2000,10000,100);
var cena=sl(15,35);
var toplivo=sklonlxkand(om.toplivo.iz())
var edizm=['км','вёрст','миль'].iz();
var rashod=sl(5,15);

window.vopr.txt=[
		'Таксист за месяц проехал '+rasst+' '+edizm+'. ',
		'1 литр '+toplivo.re+' стоит '+chislitlx(cena,'рубль')+'. ',
		'Средний расход '+toplivo.re+' на 100 '+edizm+' составляет '+chislitlx(rashod,'литр')+'. ',
	].shuffle().soed()+
	'Сколько рублей потратил таксист на '+toplivo.ve+' за этот месяц?';
	
window.vopr.ver=[(rasst/100*rashod*cena).ts()];

})();
//Обзад 26632
