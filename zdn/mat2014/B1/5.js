(function(){'use strict';

var t1=sluchch(0,om.uchrezhd.ie.length-1);
var t2=sluchch(0,om.sroki.re.length-1);
var a=sluchch(200,1100,100);
var b=sluchch(2,19);
var c=slKrome(a,200,1100,100);

window.vopr.txt='В пачке '+a+' листов формата '+['A','B'].iz()+sluchch(3,5)+
	'. За '+om.sroki.ve[t2]+' в '+om.uchrezhd.pe[t1]+' расходуется '+c+' листов. '+
	'Какое наименьшее количество пачек бумаги нужно купить в '+om.uchrezhd.ve[t1]+' на '+b+' '+
	chislit(b,om.sroki.ve[t2],om.sroki.re[t2],om.sroki.rm[t2])+'?';
window.vopr.ver=[''+(b*c/a).ceil()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
