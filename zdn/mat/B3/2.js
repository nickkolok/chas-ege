(function(){'use strict';

var v3=-1;
var a;
var b;
var c;
var d;
for(;(v3==-1) || (!v3)&&(sl(0,10));){
	a=sl(1,9);
	b=sl(1,9);
	c=sl(1,9);

	d=a*a+b*b+c*c;
	v3=d.isPolnKvadr();
}

d=v3?d.sqrt():d;

var s=2*(a*c+a*b+b*c);
var v1=sl(0,3);
var v2=slKrome(v1,0,3);
var m=['площадь поверхности',v3?'диагональ':'квадрат диагонали','объём','третье выходящее из той же вершины ребро'];
var n=[s,d,a*b*c,c];
window.vopr.txt='Два ребра прямоугольного параллелепипеда, выходящие из одной вершины, равны '+a+' и '+b+'. '+
	'Известно, что '+m[v1]+' составляет '+n[v1]+'. '+
	'Найдите '+m[v2]+' параллелепипеда.';

window.vopr.ver=[''+n[v2]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
