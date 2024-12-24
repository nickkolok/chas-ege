(function(){'use strict';

var a = sl(1,19).pm();

var fn=fn_zadan({
	slag:[ '(x-'+a+')^{2}e^{'+['-x+',sl(1,99).pm()].slag()+'}' ],
	maxx:a+2,
	minx:a,
});

window.vopr.text=fn.txt;
window.vopr.correctAnswers=[fn.ver];

window.vopr.categories['prz']=1;
window.vopr.categories['log']=1;
})();
//Обзад 26728 26729
