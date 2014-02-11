(function(){'use strict';

var a=sl(-49,49);
var t1=['-x',a].shuffle().slag().plusminus();
var t2=['-x',a].shuffle().slag().plusminus();

var fn=fn_zadan({
	slag:['('+t1+')e^{'+t2+'}'],
	minx:a+1,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
})();
//Обзад 26712
