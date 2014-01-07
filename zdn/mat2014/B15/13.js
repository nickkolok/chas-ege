(function() {

var a=sl(1,19);
var v1=sl(5);//0 - pi/3 не участвует, 1 - начало, 2 - конец, 3 и больше - не участвует.

var fn=fn_zadan({
	slag:[
		(2*a+1)+'\\cos x',
		''+(2*a+1)+'\\sqrt{3}x',
		!((2*a+1)%3) ? '-\\frac{'+(2*a+1)/3+'\\sqrt{3}\\pi}{2}' : '-'+(2*a+1)+'\\frac{\\sqrt{3}\\pi}{6}',
	],
	maxy: a+0.5,
	prnz: v1==1 ? 1 .pina(3) : [sl(-5,1).pina(4),sl(-2,0).pina(3),sl(-7,1).pina(6),sl(-5,1).pina(5),1 .pm().pina(sl(4,12))].iz(),
	prnb: v1==1 ? 0 : sl(1),
	prkz: v1==2 ? 1 .pina(3) : 1 .pina(2),
	prkb: v1==2 ? 0 : sl(1),
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();
//Обзад 26693, но не весь, а 70065, 70067, 70073, 70075, 70083, 70087.
//Николай Авдеев
