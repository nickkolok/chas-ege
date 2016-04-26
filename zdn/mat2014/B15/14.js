(function() {

var a=sl(2,19);
var v1=sl(5);//0 - pi/4 не участвует, 1 - начало, 2 - конец, 3 и больше - не участвует.

var fn=fn_zadan({
	slag:[
		''+a+'\\sqrt{2}\\cos x',
		''+a+'x',
		(-a).pina(4),
	],
	maxy: a,
	prnz: v1==1 ? 1 .pina(4) : [sl(-4,0).pina(4),sl(-2,0).pina(3),sl(-7,1).pina(6),sl(-5,1).pina(5),1 .pm().pina(sl(5,12))].iz(),
	prnb: v1==1 ? 0 : sl(1),
	prkz: v1==2 ? 1 .pina(4) : [1 .pina(2), sl(1,2).pina(3), 3 .pina(5)].iz(),
	prkb: v1==2 ? 0 : sl(1),
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад 26692, но не весь, а 3403, 3405, 3407, 3413, 70003, 70009, 70017, 70023, 70027, 70033, 70039
//Обзад 26693, но не весь, а 3417, 3423, 3425, 3427, 3435, 70045, 70047, 70051, 70053, 70069, 70071, 70079, 70085
//Николай Авдеев
