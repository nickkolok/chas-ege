(function() {'use strict';

var a=sluchch(2,9);
var b=sluchch(2,9);
var h=sluchch(2,9);

var v3=sluchch(0,1);
var v0=sluchch(0,2);
for(var v1=v0;v1==v0;v1=sluchch(0,2));
for(var v2=v0;(v2==v0)||(v2==v1);v2=sluchch(0,2));

var v4=sluchch(0,2);
switch(v4){
	case 0:
		a*=(a%3)?3:1;
	break;
	case 1:
		b*=(b%3)?3:1;
	break;
	case 2:
		h*=(h%3)?3:1;
	break;
}

var m=[v3?'второй катет основания':'вторая сторона основания','высота пирамиды','объём пирамиды'];
var n=[v3?'второй катет основания':'вторую сторону основания','высоту пирамиды','объём пирамиды'];

var p=[b,h,((v3?0.5:1)*a*b*h/3).ts()];
var g=[v3?'равен':'равна','равна','равен'];
var y='Основанием пирамиды является '+(v3?'прямоугольный треугольник':'прямоугольник')+', в котором '+
		(v3?'один из катетов равен ':'одна из сторон равна ')+a+', a '+m[v0]+' '+g[v0]+' '+p[v0]+
		', при этом '+m[v1]+' '+g[v1]+' '+p[v1]+'. '+
		'Найдите '+n[v2]+'.';


window.vopr.txt=y;
window.vopr.ver=[''+p[v2]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;

})();
