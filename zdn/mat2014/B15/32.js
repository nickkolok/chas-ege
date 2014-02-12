(function(){'use strict';

var a = sl(1,19);
var b = sl(a,49);
var v1=sl1();//Если 1, то sin
var f=['cos','sin'];

var fn=fn_zadan({
	slag:[ ''+b+'x', ''+a+'\\'+f[v1]+' x' ],
	minx:0,
	miny:v1?0:a,
	prnz:0,
	prkz:sl(1,10).pina(sl(1,10)),
	prkb:sl1(),
	nech:v1,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['tri']=1;
})();
//Обзад 26730 26731
