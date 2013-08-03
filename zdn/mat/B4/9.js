(function(){'use strict';

var c=sluchch(3,6);
var tovar=lx[om.stroymat.iz()];
var t2=om.rusbukv.iz(c);
var edizm=lx[om.izmergruz.iz()]
var dost=[].zapslch(0,c,1000,10000,100);
var zakaz=sl(10,200);
var s=Infinity;
var f;
var v1;
var t1;
window.vopr.txt='Строительной фирме нужно приобрести '+chislitlx(zakaz,edizm.ie)+' '+tovar.re+' у одного из '+c+' поставщиков. '+
	'Цены и условия доставки приведены в таблице. Сколько рублей придется заплатить за самую дешевую покупку с доставкой?';
var y=['Фирма','Стоимость '+tovar.re+' (руб. за 1 '+edizm.ve+')','Стоимость доставки','Дополнительные условия'].tr('th');
var cena=[].zapslch(0,c,2000,4000,50);
var z=[];
var prim;
var limit;

for(var i=0;i<c;i++){
	prim='';
	f=cena[i]*zakaz+dost[i];
	v1=sl(3);
	if(v1==0){
		var limit=sl(cena[i]*zakaz*0.5,cena[i]*zakaz*1.5,100);
		prim='При заказе от '+limit+' руб. доставка бесплатно';
		if(cena[i]*zakaz>limit)
			f-=dost[i];
	}
	if(v1==1){
		var limit=sl((zakaz*0.5).floor(),(zakaz*1.5).ceil(),5);
		prim='При заказе более '+chislitlx(limit,edizm.ie)+' доставка бесплатно';
		if(zakaz>limit)
			f-=dost[i];
	}
	z[i]=[t2[i],cena[i].ts(),dost[i].ts(),prim].tr();
	s=Math.min(f,s);
}

window.vopr.txt+=(y+z.soed()).vTabl();
window.vopr.ver=[s.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
