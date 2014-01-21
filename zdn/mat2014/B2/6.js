(function(){

var t=sluchch(0,om.meltov.ie.length-1);
var a=sluchch(20,200,10);
var b=sluchch(a*2+10,2000,5);
var c=sluchch(3,40);

window.vopr.txt='Магазин закупает '+om.meltov.im[t]+' по оптовой цене '+a+
	' рублей и продаёт с наценкой '+c+'%. '+
	'Какое наибольшее число '+om.meltov.rm[t]+' можно купить за '+b+' рублей?';

window.vopr.ver=[''+(b/(a*(1+0.01*c))).floor()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
//Обзад 26621

