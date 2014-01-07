(function(){'use strict';

var t1=om.meltov.rm.concat(om.eda.rm).iz();
var a=sluchch(2,50);
var b=sluchch(0.1,0.5,0.01);
var c=sluchch(3,6);
var t2=sluchiz(om.rusbukv,c);
var s=1000000000;
window.vopr.txt='Для изготовления книжных полок требуется заказать '+a+' одинаковых '+chislit(a,'стекло','стекла','стёкол')+' в одной из '+c+' фирм. '+
				'Площадь каждого стекла '+b.ts()+' ${\\textrm{м}^{2}}$. В таблице приведены цены на стекло, '+
				'а также на резку стекла и шлифовку края. Сколько рублей будет стоить самый дешёвый заказ?';
var y=['Фирма','Цена стекла (руб. за 1 ${\\textrm{м}^{2}}$)','Резка и шлифовка (руб. за одно стекло)'].tr('th');
				
var g=[];
g.zapslch(0,c-1,200,400,5);
var h=[];
h.zapslch(0,c-1,5,20);
var z=[];
for(var i=0;i<c;i++){
	z[i]=[t2[i],g[i].ts(),h[i].ts()].tr();
	s=Math.min(a*(h[i]+b*g[i]),s);
}
				
window.vopr.txt+=(y+z.soed()).vTabl();
window.vopr.ver=[s.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
