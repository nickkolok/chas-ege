(function(){'use strict';

var a = sl(1,9);
var b = sl(2*a+1,99);

var fn=fn_zadan({
	slag:[ '('+a+'x^2'+'-'+b+'x+'+b+')e^{'+['-x',sl(1,99).pm()].slag()+'}' ],
	minx:2,
	maxx:(1000*b/a).isZ()?(b/a):undefined,
});

window.vopr.text=fn.txt;
window.vopr.correctAnswers=[fn.ver.ts()];

window.vopr.categories['prz']=1;
window.vopr.categories['log']=1;
})();
//Обзад 26725 26732
