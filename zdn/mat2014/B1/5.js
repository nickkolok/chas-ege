(function(){

var t1=sluchch(0,om.uchrezhd.ie.length-1);
var t2=sluchch(0,om.sroki.re.length-1);
var a=sluchch(200,1100,100);
var b=sluchch(2,19);
var c=slKrome(a,200,1100,100);

NAtask.setTask({
	text : 'В пачке '+a+' листов формата '+['A','B'].iz()+sluchch(3,5)+
	'. За '+om.sroki.ve[t2]+' в '+om.uchrezhd.pe[t1]+' расходуется '+c+' листов. '+
	'Какое наименьшее количество пачек бумаги нужно купить в '+om.uchrezhd.ve[t1]+' на '+b+' '+
	chislit(b,om.sroki.ve[t2],om.sroki.re[t2],om.sroki.rm[t2])+'?',
	answers : (b*c/a).ceil(),
});
})();
//Обзад 26622
