(function() {

var a=sl(2,19);
var v1=sl(5);//0 - pi/3 не участвует, 1 - начало, 2 - конец, 3 и больше - не участвует.

var fn=fn_zadan({
	slag:[
		(2*a)+'\\cos x',
		''+a+'\\sqrt{3}x',
		!a%3 ? '-'+a/3+'\\sqrt{3}\\pi' : '-'+a+'\\frac{\\sqrt{3}\\pi}{3}',
	],
	maxy: a,
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

//Обзад 26692, но не весь, а 3401, 3411, 69997, 69999, 70005, 70007, 70013, 70021, 70031, 70035, 70043
//Обзад 26693, но не весь, а 3419.
//Николай Авдеев
