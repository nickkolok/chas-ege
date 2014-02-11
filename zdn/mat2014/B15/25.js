(function(){'use strict';

var a=sl(2,30);
var c=sl(2,5);

var fn=fn_zadan({
	slag:[ ''+a+'x', '-\\ln('+a+'x)' ],
	minx: (100/a).isZ() ? (1/a) : undefined,
	miny: 1,
	prkb:sl1(),
	prnb:sl1(),
	prnz:sl1() ? sl(1,c-1) .frac(c*a) : undefined,
	prkz:sl1() ? (3+sl(1,10)) .frac(c*a) : undefined,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 26718 26719
