(function(){'use strict';

var b=sl(-10,10);
var minus=sl1();
var dob=sl(-4,4);
var trechlen=[b*b+dob,2*b,1];
var osn=sl(2,9);
var stepen=(
	'-'.esli(minus)+
	trechlen.mn_txtmas('x').join(minus?'-':'+')
).plusminus();

var pw=osn.pow(minus?-dob:dob);

var fn=fn_zadan({
	slag:[osn+'^{'+stepen+'}'],
	minx:minus?undefined:-b,
	maxx:minus?-b:undefined,
	miny: minus || !(pw*10000).isZ()?undefined:pw,
	maxy:!minus || !(pw*10000).isZ()?undefined:pw,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=0;
})();
//Обзад 245181 245182 245183 245184
