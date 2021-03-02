(function(){'use strict';

var a = sl(1,9);
var b = sl(2*a+1,99);

var fn=fn_zadan({
	slag:[ '('+a+'x^2'+'-'+b+'x+'+b+')e^{'+['-x',sl(1,99).pm()].slag()+'}' ],
	minx:2,
	maxx:(1000*b/a).isZ()?(b/a):undefined,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 26725 26732
