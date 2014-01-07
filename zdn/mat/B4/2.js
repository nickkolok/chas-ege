(function(){'use strict';

var t1=om.meltov.rm.concat(om.eda.rm).iz();
var a=sluchch(2,50);
var b=sluchch(2,60);
var c=sluchch(3,6);
var t2=sluchiz(om.rusbukv,c);
var s=1000000000;
window.vopr.txt='Для транспортировки '+chislitM(a,'тонны','тонн','тонн')+' '+t1+' на '+(b*100)+
				' км можно воспользоваться услугами одной из '+c+' '+
				'фирм-перевозчиков. Стоимость перевозки и грузоподъемность автомобилей для каждого перевозчика '+
				'указана в таблице. Сколько рублей придется заплатить за самую дешёвую перевозку?';
var y=['Перевозчик','Стоимость перевозки <br/> одним автомобилем <br/> (руб. на 100 км)',
		'Грузоподъемность  <br/> автомобилей (тонн)'].tr('th');
var g=[];
g.zapslch(0,c-1,1200,9000,100);
var h=[];
h.zapslch(0,c-1,2,15,0.1);
var z=[];
for(var i=0;i<c;i++){
	z[i]=[t2[i],g[i].ts(),h[i].ts()].tr();
	s=Math.min((a/h[i]).ceil()*b*g[i],s);
}
				
window.vopr.txt+=(y+z.soed()).vTabl();
window.vopr.ver=[s.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
