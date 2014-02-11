(function(){'use strict';

var a=sl(-49,49);

var fn=fn_zadan({
	slag:['('+['x',a].shuffle().slag().plusminus()+')e^{'+
		['-x',a].shuffle().slag().plusminus()+'}'],
	maxx:a+1,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 26713
