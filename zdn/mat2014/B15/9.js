(function(){'use strict';

var a=sluchch(2,90);

var fn=fn_zadan({
	slag:[[a.pow(2).frac('x'),'x'],[[a.pow(2),'x^2'].slag().frac('x')]].iz(),
	miny:2*a,
	prnz:sl(0.1,a-0.1,0.1),
	prkz:sl(a+0.1,2*a,0.1),
	prnb:sl1(),
	prkb:sl1(),
	nech:1,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Обзад 77473
//Расширяемо на 77467 77468 77469 77470 77471 77472 77474
//Николай Авдеев
