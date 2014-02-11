(function(){'use strict';

var a=sl(1,49).pm();

var fn=fn_zadan({
	slag:['('+['x',a].shuffle().slag().plusminus()+')e^{'+
		['x',-a].shuffle().slag().plusminus()+'}'],
	minx:-a-1,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 26710 26711
