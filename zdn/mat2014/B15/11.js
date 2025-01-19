(function() {

var a=sl(1,19).pm();
var b=[2 .pow(sl(-2,2))*5 .pow(sl(-2,2)),1].iz();
var x=-1/b-a;

var fn=fn_zadan({
	slag:[
		(2*b)+'x',
//		'\\'+['ln','lg','log_{'+sl(2,19)+'}'].iz()+'(x+'+a.ts()+')^2'],//Выпилим. Там производная хрен пойми какая
		'\\ln(x+'+a.ts()+')^2'],
	maxx:x,
	maxy: b.abs()==1 ? -2*(a+1) : undefined,
});

window.vopr.text=fn.txt;
window.vopr.correctAnswers=[fn.ver];

window.vopr.categories['log']=1;
window.vopr.categories['prz']=1;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();

//Демка 2014
//Николай Авдеев
