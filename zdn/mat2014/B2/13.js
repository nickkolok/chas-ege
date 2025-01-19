(function(){

var pro=sl(2,50).pm();
var tovar=sklonlxkand(['электрочайник','кофемашина','бензопила','принтер','сканер','Android-планшет',].iz());
var cena=sl(2500,5000,100);

window.vopr.text='Цена на '+tovar.ve+' была '+(pro>0?'повышена':'понижена')+' на '+pro.abs()+
	'% и составила '+chislitlx(cena*(1+pro/100),'рубль')+'. Сколько рублей стоил '+
	tovar.ie+' до '+(pro>0?'повышения':'понижения')+' цены?';

window.vopr.correctAnswers=[cena.ts()];

})();
//Обзад 26629
