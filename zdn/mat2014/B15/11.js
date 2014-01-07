(function() {

//var c=sl(9.9).pm().ts();
var a=sl(1,19).pm();
var b=[2 .pow(sl(-2,2))*5 .pow(sl(-2,2)),1].iz()
var x=-1/b-a;

var fn=fn_zadan({
	slag:[
		(2*b)+'x',
//		'\\'+['ln','lg','log_{'+sl(2,19)+'}'].iz()+'(x+'+a.ts()+')^2'],//Выпилим. Там производная хрен пойми какая
		'\\ln(x+'+a.ts()+')^2'],
	maxx:x,
	maxy: b.abs()==1 ? 2*b*x : undefined,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['log']=1;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Демка 2014
//Николай Авдеев
