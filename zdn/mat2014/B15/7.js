(function(){'use strict';

var a=sluchch(2,9);
var c=sluchch(-99,99);

var v1=sluchch(1);//v1=0;//Если v1, то ищем наименьшее
var v2=sluchch(1);//v2=0;//Если v2, то функция возрастающая
var t1=['наибольшее значение','наименьшее значение'];

var tg='\\mathrm{tg} x';
var t3=['-',''];

var h=[t3[v2]+(4*a)+tg,t3[1-v2]+(4*a)+'x',c,t3[0+((v2!=v1)==v2)]+a.pina(1)].slag();
var p=(v1?-a:a)*4+c;

window.vopr.txt=fn_txt(t1[v1],h,(-1).pina(4),(1).pina(4));

window.vopr.ver=[p.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад 26704 26705
//Николай Авдеев
