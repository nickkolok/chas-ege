(function() {

var a=sluchch(2,9);
var b=sluchch(2,9);
var h=sluchch(2,9);

var v0=sluchch(0,2);
for(var v1=v0;v1==v0;v1=sluchch(0,2));
for(var v2=v0;(v2==v0)||(v2==v1);v2=sluchch(0,2));

var m=['второй катет основания','боковое ребро призмы','объём призмы'];

var p=[b,h,(a*b*h/2).ts()];
var g=['равен','равно','равен'];
var y='Основанием треугольной призмы является прямоугольный треугольник, в котором один из катетов равен '+a+', a '+m[v0]+' '+g[v0]+' '+p[v0]+', при этом '+m[v1]+' '+g[v1]+' '+p[v1]+'. '+
		'Найдите '+m[v2]+'.';


window.vopr.txt=y;
window.vopr.ver=[''+p[v2]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
