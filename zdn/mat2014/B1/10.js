(function(){

var a=sluchch(30,99);
var t1=sluchch(0,om.denned.ie.length-1);
var b=sluchch(2,5);
var c=sluchch(1,b);
var d=sluchch(2*a,999);
var t2={};
t2.ie=om.eda.ie.concat(om.meltov.ie);
t2.re=om.eda.re.concat(om.meltov.re);
t2.ve=om.eda.ve.concat(om.meltov.ve);
t2.rm=om.eda.rm.concat(om.meltov.rm);
var t3=sluchch(0,t2.ie.length-1);

NAtask.setTask({
	text : t2.ie[t3].toZagl()+' стоит '+chislitlx(a,'рубль')+'. '+
		om.denned.pg['в'][t1].toZagl()+' '+om.denned.ve[t1]+' в магазине действует специальное предложение: '+
		'заплатив за '+chislitM(b,t2.ve[t3],t2.re[t3],t2.rm[t3])+', покупатель получает '+(b+c)+' ('+c+' - в подарок). '+
		'Сколько '+t2.rm[t3]+' можно получить на '+chislitlx(d,'рубль')+ ' '+om.denned.pg['в'][t1]+' '+om.denned.ve[t1]+'?',
	answers : ((d/a).floor()+(d/a/b).floor()*c).ts(),
});
})();
//Обзад 26626
