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

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 77476
