(function(){'use strict';

var a = sl(1,19).pm();

var fn=fn_zadan({
	slag:[ '(x-'+a+')^{2}e^{x+'+sl(1,99).pm()+'}' ],
	maxx:a-2,
	minx:a,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 26726 26727
