(function() {

var a=sluchch(2,10);//Высоты
var b=sluchch(2,5);//Радиусы
var v=sluchch(1,10)*a*b*b/2 .pow(sluchch(3))/5 .pow(sluchch(3));

var va=sl1();
var vb=sl1();
var t1=['меньше','больше'];
var telo=sklonlxkand('конус');//Отличие здесь! =/
var ca=va?a:1/a;
var cb=vb?b*b:1/b/b;
window.vopr.ver=[(v*ca*cb).ts()];
window.vopr.txt='Объём первого '+telo.re+' равен $'+v.ts()+'~м^3$. У второго '+telo.re+' высота в '+chislitlx(a,'раз')+
	' '+t1[va]+', а радиус основания — в '+chislitlx(b,'раз')+' '+t1[vb]+', чем у первого. '+
	om.otvnaydite.iz().toZagl()+' объём второго '+telo.re+'. Ответ '+om.otvdayte.iz()+' в кубических метрах.';

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
