(function(){'use strict';

var a=sluchch(2,9);
var h=sluchch(2,9);

var v0=sl1();
var v1=sl1();
var v2=sl1();
var v3=slKrome(v0,0,5);
var v4=slKrome([v0,v3],0,5);

var m=['высота',(v1?'площадь основания':'сторона основания'),(v2?'площадь боковой грани':'площадь боковой поверхности'),'объём','площадь полной поверхности','квадрат диагонали'];
var n=['высоту',(v1?'площадь основания':'сторону основания'),(v2?'площадь боковой грани':'площадь боковой поверхности'),'объём','площадь полной поверхности','квадрат диагонали'];
var p=[h,(v1?(a*a):(a)),(v2?(a*h):(4*a*h)),a*a*h,4*a*h+2*a*a,2*a*a+h*h];
var g=['равна','равна','равна','равен','равна','равен'];
window.vopr.txt='В правильной четырёхугольной призме '+m[v0]+' '+g[v0]+' '+p[v0]+', при этом '+m[v3]+' '+g[v3]+' '+p[v3]+'. '+
		'Найдите '+n[v4]+'.';
window.vopr.ver=[''+p[v4]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
