(function(){'use strict';

var a=sluchch(2,9);
var v1=sluchch(0,3);
var v2=slKrome(v1,0,3);

var m=['ребро','площадь поверхности','квадрат диагонали','объём'];
var n=[a,6*a*a,3*a*a,a*a*a];
window.vopr.txt=m[v1].toZagl()+' куба составляет '+n[v1]+'. '+
	'Найдите '+m[v2]+' куба.';
window.vopr.ver=[''+n[v2]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
