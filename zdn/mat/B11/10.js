(function() {

var a=sluchch(2,10);//Высоты
var b=sluchch(2,5);//Радиусы
var v=sluchch(1,10)*a*b*b/2 .pow(sluchch(3))/5 .pow(sluchch(3));

var va=sl1();
var vb=sl1();
var t1=['меньше','больше'];
var ca=va?a:1/a;
var cb=vb?b*b:1/b/b;
window.vopr.ver=[(v*ca*cb).ts()];
window.vopr.txt='Объем первого цилиндра равен $'+v.ts()+'~м^3$. У второго цилиндра высота в '+chislitM(a,'раз','раза','раз')+
				' '+t1[va]+', а радиус основания — в '+chislitM(b,'раз','раза','раз')+' '+t1[vb]+', чем у первого. Найдите объем второго цилиндра. Ответ дайте в кубических метрах.';

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Обзад 27053
//Николай Авдеев
