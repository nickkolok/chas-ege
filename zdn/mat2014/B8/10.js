//(function() {


var t1 = NLsets.alphabets.english.getRandomItems(3);
var A=t1[0], B=t1[1], C=t1[2];
var c=sluchch(2,10),
	d=sluchch(0.1,0.9,0.1),
	a=c*d;
	b=(c*c-a*a).koren();

var  sinA='\\sin{'+A+'}';
var  sinB='\\sin{'+B+'}';
var  cosA='\\cos{'+A+'}';
var  cosB='\\cos{'+B+'}';
var  sin2A='\\sin^2{'+A+'}';
var  sin2B='\\sin^2{'+B+'}';
var  cos2A='\\cos^2{'+A+'}';
var  cos2B='\\cos^2{'+B+'}';

var g=1-d*d;

var f=svVel([
	[
		{vel:'',bkv:[sinA,cosB].iz(),vin:1,zna:d.ts(),nah:1},
		{vel:'',bkv:[sin2A,cos2B].iz(),vin:1,zna:(d*d).ts(),nah:1},
		{vel:'',bkv:[sin2B,cos2A].iz(),vin:1,zna:g.ts(),nah:1},
		{vel:'',bkv:[sinB,cosA].iz(),vin:1,zna:g.koren(),nah:g.isPolnKvadr()},
	].iz(),
	{vel:'',bkv:A+B,zna:c.ts(),rod:1,vin:1,nah:1},
	{vel:'',bkv:A+C,zna:b,rod:1,vin:1,nah:0},
	{vel:'',bkv:B+C,zna:a.ts(),rod:1,vin:1,nah:1},
].sluchiz(3));

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='В треугольнике $'+(A+B+C).mesh()+'$ угол $'+C+'$ равен $90^\\circ$. '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
//})();

//Обзад
//Николай Авдеев

