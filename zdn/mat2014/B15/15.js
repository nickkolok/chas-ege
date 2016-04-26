(function() {

var a=sl(2,19);
var v1=sl(5);//0 - pi/6 не участвует, 1 - начало, 2 - конец, 3 и больше - не участвует.

var fn=fn_zadan({
	slag:[
		a.fracstr(3,'\\sqrt{3}')+'\\cos x',
		a.fracstr(6,'\\sqrt{3}')+'x',
		'-'+a.fracstr(36,'\\sqrt{3}\\pi'),
	],
	maxy: a/2,
	prnz: v1==1 ? 1 .pina(6) : [sl(-4,0).pina(4),sl(-2,0).pina(3),sl(-6,-1).pina(6),sl(-5,-1).pina(5),1 .pm().pina(sl(7,12))].iz(),
	prnb: v1==1 ? 0 : sl(1),
	prkz: v1==2 ? 1 .pina(6) : [1 .pina(2), sl(1,2).pina(3), sl(1,4).pina(5)].iz(),
	prkb: v1==2 ? 0 : sl(1),
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад 26692, но не весь, а 3409, 3415, 69995, 70001, 70011, 70015, 70019, 70025, 70029, 70037, 70041
//Обзад 26693, но не весь, а 3421, 3429, 3431, 3433, 70049, 70055, 70057, 70061, 70063, 70077, 70081
//Николай Авдеев
