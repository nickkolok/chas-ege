(function() {

var t=sluchch(1,20);
var b=sluchch(1,10);
var a=sluchch(1,20);
var c=a-b*t;
var m=[c,b];
var n=m.mn_pervoobr();
n[0]=sluchch(-20,20);

window.vopr.txt=(
				'Материальная точка движется прямолинейно по закону $x(t)='+n.mn_txt('t')+
				'$, где $x$ — расстояние от точки отсчета в метрах, t — время в секундах, измеренное с начала движения. '+
				'В какой момент времени (в секундах) ее скорость была равна '+a+' м/с?'
				).plusminus();
window.vopr.ver=[t.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
