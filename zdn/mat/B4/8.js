(function() {

var cena=sl(15,25,0.5);
var rashod=sl(5,10,0.5);
var topl=lx[om.toplivo.iz()];
var trans=lx[om.mezhgortrans.iz()];
var rasst=sl(100,2000,100);
var chel=sl(2,5);
var t2=om.rusbukv.iz(2);
var bilet=sl(300,1000);

window.vopr.txt='Семья из '+chel+' человек планирует поехать из '+lx[om.naspunkt.iz()].re+' '
	+t2[0]+' в '+lx[om.naspunkt.iz()].ve+' '+t2[1]+'. Можно ехать '+trans.te+
	', а можно — на своей машине. Билет на '+trans.ve+' на одного человека стоит '+chislitlx(bilet,'рубль')+
	'. Автомобиль расходует '+chislitlx(rashod,'литр')+' '+topl.re+' на 100 километров пути, расстояние по шоссе равно '+
	rasst+' км, а цена '+topl.re+' равна '+chislitlx(cena,'рубль')+' за литр. Сколько рублей придется заплатить '+
	'за наиболее дешевую поездку на '+chel+' человек?';



window.vopr.ver=[Math.min(chel*bilet,cena*rasst*rashod/100).ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
