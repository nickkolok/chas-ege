(function(){'use strict';

var a=sl(1,49).pm();

var fn=fn_zadan({
	slag:['('+['-x',a].shuffle().slag().plusminus()+')e^{'+
		['x',-(a-1)].shuffle().slag().plusminus()+'}'],
	maxx:a-1,
	maxy:1,
	prnz:sl(-59,a-2),
	prkz:sl(a,49),
});

window.vopr.text=fn.txt;
window.vopr.correctAnswers=[fn.ver];

window.vopr.categories['prz']=1;
window.vopr.categories['log']=1;
})();
//Обзад 77476
