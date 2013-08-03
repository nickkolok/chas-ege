(function(){'use strict';

var v3=-1;
var a;
var b;
var c;
var d;
for(;(v3==-1)||((!v3)&&(sluchch(0,10)));){
a=sluchch(1,9);
b=sluchch(1,9);
c=sluchch(1,9);

d=a*a+b*b+c*c;
v3=d.isPolnKvadr();

console.log(d);
console.log(v3);
}

d=v3?d.sqrt():d;

var s=2*(a*c+a*b+b*c);

var v1=sluchch(0,3);
var v2;
for(v2=v1;v2==v1;v2=sluchch(0,3));
var m=['площадь поверхности',v3?'диагональ':'квадрат диагонали','объём','третье ребро, выходящее из той же вершины'];
var n=[s,d,a*b*c,c];
var y='Два ребра прямоугольного параллелепипеда, выходящие из одной вершины, равны '+a+' и '+b+'. '+
	'Известно, что '+m[v1]+' составляет '+n[v1]+'. '+
	'Найдите '+m[v2]+' параллелепипеда.';


window.vopr.txt=y;
window.vopr.ver=[''+n[v2]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
