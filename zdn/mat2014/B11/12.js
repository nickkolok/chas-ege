(function(){'use strict';

var a=slKrome([90,180,270],1,359);
var at='{'+a.ts()+'^\\circ}';

var v1=sl1();//Если 1, то косинус снизу.
var p1=sluchch(2,99).pm();
var p2=2 .pow(sl(-2,4))*5 .pow(sl(-2,4)) .pm();
var b=v1?p1:p2;
var c=v1?p2:p1;
var f=[
	[b.ts()+'(\\cos^2'+at+'-\\sin^2'+at+')',1],
	[b.ts()+'(1-2\\sin^2'+at+')',1],
	[b.ts()+'(2\\cos^2'+at+'-1)',1],
	[b.ts()+'-'+(2*b).ts()+'\\sin^2'+at,1],
	[(2*b).ts()+'\\cos^2'+at+'-'+b.ts(),1],

	[b.ts()+'(\\sin^2'+at+'-\\cos^2'+at+')',-1],
	[b.ts()+'(1-2\\cos^2'+at+')',-1],
	[b.ts()+'(2\\sin^2'+at+'-1)',-1],
	[b.ts()+'-'+(2*b).ts()+'\\cos^2'+at,-1],
	[(2*b).ts()+'\\sin^2'+at+'-'+b.ts(),-1],
].iz();

var vyr1=f[0];
var vyr2=c.ts()+'\\cos'+(2*a).ts()+'^\\circ';

var y='\\frac{'+(v1?vyr1:vyr2)+'}{'+(v1?vyr2:vyr1)+'}';
window.vopr.ver=[(p1/p2*f[1]).ts()];

window.vopr.txt=('Найдите значение выражения $$'+y+'$$').plusminus().ts();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();
//Обзад 26756
//Николай Авдеев
