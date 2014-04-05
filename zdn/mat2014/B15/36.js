(function(){'use strict';

var osn=sl(2,9);
var pw=sl(0,4);
var b=sl(-10,10);
var minus=sl1();
var vt=!sl(2);

var dob=vt?sl(500):osn.pow(pw);
var trechlen=[b*b,2*b,1].mn_umn(minus?-1:1).mn_plus([dob]);

var vyrlog=trechlen.mn_txt('x').plusminus();

var fn=fn_zadan({
	slag:['\\log_'+osn+'('+vyrlog+')'],
	minx:minus?undefined:-b,
	maxx:minus?-b:undefined,
	miny: minus || vt?undefined:pw,
	maxy:!minus || vt?undefined:pw,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['log']=1;
})();
//Обзад 245177 245178 245179 245180
