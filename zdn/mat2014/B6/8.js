(function() {


var a=sluchiz([20,25,40,80,100,125])[0];
var b=sluchch(1,7);
var c=sluchch(2,a/2);
a=a*b+1;
c=c*b+1;
var t1=om.imenaj.ie.iz();
var t2=om.sportparn.pe.iz();
var v1=sluchch(1);
var x=(c-1)/(a-1);
x=v1?x:1-x;
window.vopr.txt='Перед началом первого тура чемпионата по '+t2+' участниц разбивают на игровые пары случайным образом '+
				'с помощью жребия. Всего в чемпионате участвует '+chislitlx(a,'спортсменка')+
				', среди которых '+chislitlx(c,'участница')+' из России, '+
				'в том числе '+t1+'. Найдите вероятность того, что в первом туре '+t1+
				' будет играть с какой-либо спортсменкой '+(v1?'':'не ')+'из России.';
window.vopr.ver=[''+x.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
