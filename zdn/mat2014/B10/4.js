(function() {

var a=sluchch(2,9);//Ребро было
var b=sluchch(2,9);//Изменение ребра
var c=a+b;//Ребро стало

var v0=sluchch(0,1);
var v2=sluchch(1,2);;
var v4=sluchch(0,1);

var m=['ребро',(v4?'площадь поверхности':'квадрат диагонали'),'объём'];
var n=[c-a,(v4?6*(c*c-a*a):3*(c*c-a*a)),c*c*c-a*a*a];
a=v0?c:a;
var p=[a,v4?6*a*a:3*a*a,a*a*a];

var q=['увеличит','уменьшит'][v0];
var y='Eсли '+m[0]+' куба '+q+'ь на '+n[0]+', то '+m[1]+' '+q+'ся на '+n[1]+'. '+'Найдите '+m[v2]+' куба.';

window.vopr.txt=y;
window.vopr.ver=[''+p[v2]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
