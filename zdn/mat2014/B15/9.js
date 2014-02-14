(function(){'use strict';

var a=sluchch(1,90);
var v1=sl1();//Если 1, то отрезок, иначе прямая.

var fn=fn_zadan({
	slag: [[a.pow(2).frac('x'),'x'],[[a.pow(2),'x^2'].slag().frac('x')]].iz(),
	miny: v1 ? 2*a : undefined,
	minx: v1 ? undefined : a,
	prnz: v1 ? sl(0.1,a-0.1,0.1) : undefined,
	prkz: v1 ? sl(a+0.1,2*a,0.1) : undefined,
	prnb: sl1(),
	prkb: sl1(),
	nech: 1,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
})();
//Обзад 77467 77468 77469 77470 77471 77472 77473 77474
