(function(){'use strict';

do{
	var trigfunc = ['cos','sin'].iz();
	var denominator = 6;

	var trigCoeff = sl(1,40).pm();
	var linearCoeff = sl((trigCoeff.abs()*Math.PI).ceil(), 160);

	var i1=sluchch(-20,20);
	var i2=sluchch(i1+1,i1+40);

	var cnst = sl(99).pm(); //TODO: avoid '0 + ...'
	var y = function(x){
		return trigCoeff*Math[trigfunc](x) + linearCoeff/Math.PI * x + cnst;
	}

	var yLeft  = y(i1*Math.PI/denominator);
	var yRight = y(i2*Math.PI/denominator);

	var fn=fn_zadan({
		slag: [
			trigCoeff + '\\' + trigfunc + ' x',
			'\\frac{'+linearCoeff+'}{\\pi}x',
			cnst,
		],
		prnz: i1.pina(denominator),
		prkz: i2.pina(denominator),
		maxy: Math.max(yLeft, yRight).ts(),
		miny: Math.min(yLeft, yRight).ts(),
	});
}while(fn.ver.ts().length>8);

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];


window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад 26698 26699 26700 26701
//Николай Авдеев
