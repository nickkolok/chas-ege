(function() {

var t=sl(om.eda.ie.length-1);
var c=sl(1,10);
var a=sl(3,9);
var b=sl(1,9);


window.vopr.txt=om.eda.ie[t].toZagl()+' стоит '+chislitlx(a,'рубль')+' '+b+'0 копеек. '+
	'Какое наибольшее число '+om.eda.rm[t]+' можно купить на '+c+'0 рублей?';
window.vopr.ver=[(c*100/(10*a+b)).floor().ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
