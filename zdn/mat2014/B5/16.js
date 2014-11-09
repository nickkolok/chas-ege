(function(){'use strict';
var x=sl(-10,10);
var y=sl(-10,10);
var tchk=[om.latbukv.iz(),''].iz()+' '+'с координатами'.esli(sl1())+' '+'('+x+';'+y+')';
var osi=[['абсцисса',x,'x'],['ордината',y,'y']].shuffle();
var cx=osi[0][1];
var cy=osi[1][1];
var abs=sklonlxkand(osi[0][0]);
var ord=sklonlxkand(osi[1][0]);
var nayd=om.otvnaydite.iz();
var Nayd=nayd.toZagl();

var nazvt=om.latbukv.concat(['']).iz();
var rez=[
	['Из точки '+tchk+' опущен перпендикуляр на ось '+abs.rm+'. '+Nayd+' '+abs.ve+' основания перпендикуляра.',
	cx],

	[Nayd+' расстояние от точки '+tchk+' до оси '+abs.rm+'.',
	cy.abs()],

	[Nayd+' '+ord.ve+' точки, симметричной точке '+tchk+' относительно оси '+['O'+osi[0][2],abs.rm].iz()+'.',
	-cy],
	[Nayd+' '+abs.ve+' точки, симметричной точке '+tchk+' относительно оси '+['O'+osi[0][2],abs.rm].iz()+'.',
	cx],

	[Nayd+' '+ord.ve+' точки, симметричной точке '+tchk+' относительно начала координат.',
	-cy],
].iz();


window.vopr.txt=rez[0];
window.vopr.ver=[ rez[1] ];
})();
//Гущин 27647 27648 27649 27650 27652 27653 27654 27655
