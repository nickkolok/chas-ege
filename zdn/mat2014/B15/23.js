(function(){'use strict';

var a=sl(1,49).pm();

var fn=fn_zadan({
	slag:['('+['x',a].shuffle().slag().plusminus()+')e^{'+
		['-x',a].shuffle().slag().plusminus()+'}'],
	maxx:-a+1,
});

window.vopr.text=fn.txt;
window.vopr.correctAnswers=[fn.ver];

window.vopr.categories['prz']=1;
window.vopr.categories['log']=1;
})();
//Обзад 26713
//TODO: a=0
