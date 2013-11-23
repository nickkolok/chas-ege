(function(){'use strict';

var a=sl(2,19,0.5);

var fn=fn_zadan({
	slag:[
		''+(4*a).ts()+'x',
		'-'+(2*a).ts()+'\\mathrm{tg~}x',
		a.ts()+'\\pi',
	],
	miny: 2*a,
	prnz: sl(-2,1).pina(6),
	prnb: 0,
	prkz: 1 .pina(sl(3,4)),
	prkb: 0,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад по мотивам 26708 26709
//Николай Авдеев
