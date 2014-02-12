(function(){'use strict';

var b = [1,2,4,5,10,20,25,50,100].iz();
var a = sl(1,30).pm();

var fn=fn_zadan({
	slag:[ '-'+b+'x', '\\ln(x-'+a+')' ],
	maxx:1/b+a,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 26722 26734
