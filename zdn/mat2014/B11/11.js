(function(){'use strict';

var a=slKrome([90,180,270],1,359);
var at='{'+a.ts()+'^\\circ}';
var b=sluchch(0.1,400,0.1).pm();
var c=2 .pow(sl(-2,4))*5 .pow(sl(-2,4)) .pm();
var f=[['\\sin','\\cos'],['\\mathrm{tg~}','\\cos^2'],['\\sin^2','\\mathrm{ctg~}']].iz().shuffle();

var vyr1=f[0]+at+'\\cdot'+f[1]+at;
var vyr2='\\sin'+(2*a).ts()+'^\\circ';

var y;
if(sl1()){
	y='\\frac{'+b.ts()+'~'+vyr1+'}{'+c.ts()+'~'+vyr2+'}';	
	window.vopr.ver=[(b/(2*c)).ts()];
}else{
	y='\\frac{'+b.ts()+'~'+vyr2+'}{'+c.ts()+'~'+vyr1+'}';	
	window.vopr.ver=[(b*2/c).ts()];
}

window.vopr.txt=('Найдите значение выражения $$'+y+'$$').plusminus().ts();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();
//Обзад 26755
//Николай Авдеев
