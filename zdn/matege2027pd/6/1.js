(function(){'use strict';

var p=['100','1000','5000','10 000','50 000'];
var c0=sluchch(300,900,100);
var c1=sluchch(80,250,10);
var c2=sluchch(8,90,2);
var c3=sluchch(2,15);
var c4=sluchch(1,5);
var s=(100*c0+1000*c1+5000*c2+10000*c3+50000*c4)/10000;

var y=['Выигрыш (в рублях)'].concat(p).tr('th');
var z=[['Число выигрышных билетов',c0.ts(),c1.ts(),c2.ts(),c3.ts(),c4.ts()].tr()];

window.vopr.txt='Организаторы лотереи выпустили 10 000 билетов. Выигрыши распределены следующим образом:<br/><br/>'+
    (y+z.soed()).vTabl()+
    'Найдите математическое ожидание величины «выигрыш на один билет». Ответ дайте в рублях.';

window.vopr.ver=[s.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
