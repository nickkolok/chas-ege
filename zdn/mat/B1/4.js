(function() {

var t=sluchch(0,om.meltov.ie.length-1);
var a=sluchch(20,200,10);
var b=sluchch(a*2+10,2000,5);
var c=sluchch(3,40);
var v=sluchch(0,3);
var m=['после повышения цены на','после понижения цены на','во время распродажи, когда скидка составляет','с дисконтной картой, дающей право на скидку'];
var n=[-c,c,c,c];

window.vopr.txt=om.meltov.ie[t].toZagl()+' стоит '+a+' рублей. '+
	'Какое наибольшее число '+om.meltov.rm[t]+' можно купить за '+b+
	' рублей '+m[v]+' '+c+'%?';

window.vopr.ver=[''+(b/(a*(1-0.01*n[v]))).floor()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
