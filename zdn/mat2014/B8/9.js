(function() {


var t1=NLsets.alphabets.english.sluchiz(3);
var A=t1[0], B=t1[1], C=t1[2];
var a=sluchch(2,20),
	b=sluchch(0.5,5,0.5),
	c=(a*a*b*b+a*a).koren();

var  tgA='\\mathrm{tg}~'+A;
var  tgB='\\mathrm{tg}~'+B;
var ctgA='\\mathrm{ctg}~'+A;
var ctgB='\\mathrm{ctg}~'+B;
var  tg2A='\\mathrm{tg^2}~'+A;
var  tg2B='\\mathrm{tg^2}~'+B;
var ctg2A='\\mathrm{ctg^2}~'+A;
var ctg2B='\\mathrm{ctg^2}~'+B;


var f=svVel([
	[
		{vel:'',bkv:[tgA,ctgB].iz(),vin:1,zna:1 .frac(b)},
		{vel:'',bkv:[ctgA,tgB].iz(),vin:1,zna:b.ts(),nah:1},
		{vel:'',bkv:[tg2A,ctg2B].iz(),vin:1,zna:1 .frac(b*b)},
		{vel:'',bkv:[ctg2A,tg2B].iz(),vin:1,zna:(b*b).ts(),nah:1},
	].iz(),
	{vel:'',bkv:A+B,zna:c,rod:1,vin:1,nah:(b*b+1).isPolnKvadr()},
	{vel:'',bkv:A+C,zna:(a*b).ts(),rod:1,vin:1,nah:1},
	{vel:'',bkv:B+C,zna:a.ts(),rod:1,vin:1,nah:1},
].sluchiz(3));

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='В треугольнике $'+(A+B+C).mesh()+'$ угол $'+C+'$ равен $90^\\circ$. '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад
//Николай Авдеев

