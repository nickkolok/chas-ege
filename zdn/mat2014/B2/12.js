(function(){

var vzr=sl(100,1000,10);
var pro=sl(20,90,5);
var kolvodet=sl(5,30);
var kolvovzr=sl(1,10);
var nazvdet=sklonlxkand(['школьник','ребёнок','пионер','учащийся',].iz());
var nazvvzr=sklonlxkand(['взрослый','педагог','учитель','преподаватель','вожатый','родитель',].iz());
var bilet=['железнодорожный билет','билет в театр','билет на поезд','билет на корабль'].iz();

window.vopr.txt=bilet.toZagl()+' для '+nazvvzr.re+' стоит '+chislitlx(vzr,'рубль')+
	'. Цена билета для '+nazvdet.re+' составляет '+pro+'% от стоимости билета для '+
	nazvvzr.re+'. Группа состоит из '+chislitlx(kolvodet,nazvdet.ie,'r')+
	' и '+chislitlx(kolvovzr,nazvvzr.ie,'r')+'. Сколько рублей стоят билеты на всю группу?';
window.vopr.ver=[((kolvovzr+kolvodet*pro/100)*vzr).ts()];

})();
//Обзад 26628
