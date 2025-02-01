(function(){'use strict';

var a=sluchch(2,50);
var b=sluchch(0.1,2,0.01);
var c=sluchch(3,6);
var d=[];
d.zapslch(0,c-1,1000,10000,100);
var t2=sluchiz(om.rusbukv,c);
var s=Infinity;
var f;
var v1;
window.vopr.txt='Для изготовления книжных полок требуется заказать '+a+
	' '+chislit(a,'одинаковое стекло','одинаковых стекла','одинаковых стёкол')+' в одной из '+c+' фирм. '+
	'Площадь каждого стекла '+b.ts()+' ${\\textrm{м}^{2}}$. В таблице приведены цены на стекло, '+
		'а также на резку стекла и шлифовку края. Сколько рублей будет стоить самый дешёвый заказ?';
var y=['Фирма','Цена стекла<br/>(руб. за 1 ${\\textrm{м}^{2}}$)','Резка и шлифовка<br/>(руб. за одно стекло)','Дополнительные условия'].tr('th');

var g=[];
g.zapslch(0,c-1,200,400,5);
var h=[];
h.zapslch(0,c-1,5,20);
var z=[];
for(var i=0;i<c;i++){
	v1=sluchch(2);
	z[i]=[t2[i],g[i].ts(),h[i].ts(),v1?'':'При заказе от '+d[i]+' руб. резка бесплатно'].tr();
//	z[i]=[t2[i],g[i].ts(),h[i].ts(),''].tr();
	f=a*b*g[i];
	f+=(f>d)||v1?a*h[i]:0;
	s=Math.min(f,s);
//	s=Math.min(a*(h[i]+b*g[i]),s);

}

//z.shuffle();

window.vopr.txt+=(y+z.soed()).vTabl();
window.vopr.ver=[s.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
