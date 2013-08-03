(function() {

var a=sluchch(0,window.dlina.m.length-1);
var b=sluchch(10,100,5);
var g=window.dlina.m[a];
var d=sluchiz(window.transportm.ie,1)[0];
var f=sluchiz(window.profesj.ie,1)[0].toZagl()+' '+sluchiz(window.imenaj.ie,1)[0]+' '+sluchiz(window.otchestvaj.ie,1)[0];
var c=f+' '+sluchiz(window.deistviaj,1)[0];
c+=' '+d+', на спидометре которого скорость отображается в '+window.dlina.pm[a]+' в час,';
c+=' и отправилась в путь. По дороге ей встретился сотрудник ГАИ с прибором для выявления нарушителей скоростного режима,';
c+=' на котором скорость отображается в километрах в час с округлением до целого числа.';
c+=' '+d.toZagl()+' двигался со скоростью '+b+' '+window.dlina.rm[a]+' в час. ';
c+=window.dlina.ie[a].toZagl()+' - это '+g+' метра.';
c+=' Какое число отобразится на экране прибора для выявления нарушителей скоростного режима?';


window.vopr.txt=c;
window.vopr.ver[0]=''+(Math.round(b*g/1000));
window.vopr.ver.length=1;

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
