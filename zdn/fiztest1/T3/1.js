(function(){
	NAinfo.requireApiVersion(0, 0);

	var ampl=sl(2,100);
	var chis=sl(1,20);
	var znam=sl(2,20,2);

	NAtask.setTask(svVel([
		{utv:"все величины выражены в единицах СИ"},
		{utv:"координата колеблющегося тела изменяется по закону $x="+ampl+"\\"+["sin","cos"].iz()+chis.pina(znam/2)+" t$"},
		].concat([
		{vel:"частота колебаний",vin:"частоту колебаний",zna:"$"+chis.frac(znam)+"$ Гц",nah:1,rod:1,nev:[
			"$"+chis.frac(znam)+"$ c",
			"$"+znam.frac(chis)+"$ c",
			"$"+znam.frac(chis)+"$ Гц",
			"$"+chis.frac(znam/2)+"$ c",
			"$"+znam.frac(chis/2)+"$ c",
			"$"+chis.frac(znam/2)+"$ Гц",
			"$"+(ampl*chis).frac(znam)+"$ Гц",
			"$"+chis.frac(znam*ampl)+"$ Гц",
			"$"+ampl.frac(znam)+"$ Гц",
			"$"+chis.frac(ampl)+"$ Гц",
			"$"+ampl+"$ Гц",
			"$"+(1).frac(ampl)+"$ Гц",
		]},
		{vel:"период колебаний",vin:1,zna:"$"+znam.frac(chis)+"$ c",nah:1,rod:0,nev:[
			"$"+znam.frac(chis)+"$ Гц",
			"$"+chis.frac(znam)+"$ c",
			"$"+chis.frac(znam)+"$ Гц",
			"$"+znam.frac(chis/2)+"$ Гц",
			"$"+znam.frac(chis*2)+"$ c",
			"$"+chis.frac(znam/2)+"$ Гц",
			"$"+(ampl*chis).frac(znam)+"$ с",
			"$"+chis.frac(znam*ampl)+"$ с",
			"$"+ampl.frac(znam)+"$ с",
			"$"+chis.frac(ampl)+"$ с",
			"$"+ampl+"$ с",
			"$"+(1).frac(ampl)+"$ с",

		]},
		{vel:"амплитуда колебаний",vin:"амплитуду колебаний",zna:"$"+ampl+"$ м",nah:1,rod:1,nev:[
			"$"+chis.frac(znam)+"$ м",
			"$"+znam.frac(chis)+"$ м",
			"$"+chis.frac(znam)+"$ м",
			"$"+(ampl*chis).frac(znam)+"$ м",
			"$"+chis.frac(znam*ampl)+"$ м",
			"$"+ampl.frac(znam)+"$ м",
			"$"+chis.frac(ampl)+"$ м",
			"$"+ampl+"$ Гц",
			"$"+(1).frac(ampl)+"$ м",
		]},
	].iz())
));

AtoB();
})();
