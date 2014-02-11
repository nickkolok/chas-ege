(function(){'use strict';

var a=sl(1,9);
var b=sl(1,9);
var t='\\ln(x+'+b+')';

var fn=fn_zadan({
	slag:[''+a+'x','-'+[t+'^{'+a+'}',''+a+t].iz()],
	minx:1-b,
	miny:a*(1-b),
	prnb:sl1(),
	prnz:sl(0.1,0.9,0.1)-b,
	prkz:sl(1-b,9),
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 26714 26715 26716 26717
