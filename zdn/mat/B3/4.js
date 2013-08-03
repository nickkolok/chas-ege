(function() {

var a=sluchch(2,9);
var b=sluchch(2,9);
var c=a+b;

var v0=sluchch(0,1);
var v1=0;
var v2=sluchch(1,2);;
for(v2=v1;v2==v1;v2=sluchch(0,2));
var v3=1;
//for(v3=v1;(v3==v1)||(v3==v2);v3=sluchch(0,2));
var v4=sluchch(0,1);

var m=['ребро',(v4?'площадь поверхности':'квадрат диагонали'),'объём'];
var n=[c-a,(v4?6*(c*c-a*a):3*(c*c-a*a)),c*c*c-a*a*a];
a=v0?c:a;
var p=[a,6*a*a,3*a*a,a*a*a];

var q=['увеличит','уменьшит'][v0];
var y='Eсли '+m[v1]+' куба '+q+'ь на '+n[v1]+', то '+m[v3]+' '+q+'ся на '+n[v3]+'. '+
	'Найдите '+m[v2]+' куба.';


window.vopr.txt=y;
window.vopr.ver=[''+p[v2]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
