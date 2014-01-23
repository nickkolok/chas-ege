(function(){

var yagoda=sklonlxkand(['клубника','малина','ежевика','брусника','голубика','гречка',].iz())
var cena=sl(20,200);
var kg=sl(1,4);
var gr=sl(50,950,50);
var stoim=cena*(kg+gr/1000);
var d=[50,100,500].iz();
var summa=okrugldo(stoim+d-0.01,d);

window.vopr.txt='Летом килограмм '+yagoda.re+' стоит '+cena.rub()+'. '+
	om.imenaj.ie.iz()+' купила '+kg+' кг '+gr+' г '+yagoda.re+
	'. Сколько рублей сдачи она должна получить с '+summa.rub()+'?';
	
window.vopr.ver=[(summa-stoim).ts()];

})();
//Обзад 26636
