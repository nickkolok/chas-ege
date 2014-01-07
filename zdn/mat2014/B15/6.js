(function(){'use strict';

var a=sluchch(2,90);
var b=sluchch(a+1,99);

var m=sluchch(3,6);
var n=sluchch(1,(m/2).ceil()-1);
var g=n.pina(m);

var tg='\\mathrm{tg} x';

var fn=fn_zadan({
	slag:[a+tg,'-'+a+'x'],
	miny:0,
	nech:1,
	prnz:'0',
	prkz:g,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад 26702 26703 26706 26707
//Николай Авдеев
