(function() {


var t1=NLsets.alphabets.english.sluchiz(3);
var A=t1[0], B=t1[1], C=t1[2];
var a1=om.pifagtr.iz();
var c=sluchch(1,10);
var a=a1[0]*c, b=a1[1]*c, c=a1[2]*c;
var sinA='\\sin{'+A+'}='+a.frac(c);
var sinB='\\sin{'+B+'}='+b.frac(c);
var cosA='\\cos{'+A+'}='+b.frac(c);
var cosB='\\cos{'+B+'}='+a.frac(c);
var  tgA='\\mathrm{tg}~'+A+'='+a.frac(b);
var  tgB='\\mathrm{tg}~'+B+'='+b.frac(a);
var ctgA='\\mathrm{ctg}~'+A+'='+b.frac(a);
var ctgB='\\mathrm{ctg}~'+B+'='+a.frac(b);

/*
var f=svVel([
	{utv:'$'+[sinA,sinB,cosA,cosB,tgA,tgB,ctgA,ctgB].iz()+'$'},
	].concat(
	[
		{vel:'',bkv:A+B,zna:c,rod:1,vin:1,nah:1},
		{vel:'',bkv:A+C,zna:b,rod:1,vin:1,nah:1},
		{vel:'',bkv:B+C,zna:a,rod:1,vin:1,nah:1},
	].sluchiz(2)
	));
*/
var f=svVel([
	{utv:'$'+[sinA,sinB,cosA,cosB,tgA,tgB,ctgA,ctgB].iz()+'$'},
	{vel:'',bkv:A+B,zna:c,rod:1,vin:1,nah:1},
	{vel:'',bkv:A+C,zna:b,rod:1,vin:1,nah:1},
	{vel:'',bkv:B+C,zna:a,rod:1,vin:1,nah:1},
	].sluchiz(3));

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='В треугольнике $'+A+B+C+'$ угол $'+C+'$ равен $90^\\circ$. '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад 
//Николай Авдеев

