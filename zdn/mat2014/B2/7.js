(function() {

var a=sluchch(0,om.sroki.ve.length-1);
var b=sluchch(20,100);
var g=sluchch(20,100);
var d=sluchch(10,20);
var h=b*d-g;

var f=sluchiz(window.profesj.ie,1)[0].toZagl()+' '+sluchiz(window.imenaj.ie,1)[0]+' '+sluchiz(window.otchestvaj.ie,1)[0];
var y=f+' купила проездной билет на '+om.sroki.ve[a]+' и совершила '+b+' '+chislit(b,'поездку','поездки','поездок')+'. '+
	'Сколько рублей она сэкономила, если проездной билет на '+om.sroki.ve[a]+' стоит '+h+' '+chislit(h,'рубль','рубля','рублей')+
	', а разовая поездка стоит '+d+' рублей?';


window.vopr.txt=y;
window.vopr.ver=[''+g];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
