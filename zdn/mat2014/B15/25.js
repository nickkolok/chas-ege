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

window.vopr.text=fn.txt;
window.vopr.correctAnswers=[fn.ver];

window.vopr.categories['prz']=1;
window.vopr.categories['log']=1;
})();
//Обзад 26718 26719
