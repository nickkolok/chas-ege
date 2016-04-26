//(function(){'use strict';

var a=sl(1,5);
var v1=sl1();//Если 1, то c<2a, ищем минимум
var c= v1? sl(1,2*a-1) : sl(2*a+1,4*a);
var b=2*a+c;
var d=sl(((2*a/(2*a-c)).abs()).ceil(),40);

var params={
	slag:[ ''+a+'x^2','-'+b+'x', ''+c+'\\ln x' ],
	prkb:sl1(),
	prnb:sl1(),
	prnz:(d-1).frac(d),
	prkz:(d+1).frac(d),
};
if(v1){		// c < 2a
	params.minx=1;
	params.miny=a-b;
}else{
	params.maxx=1;
	params.maxy=a-b;
}

var fn=fn_zadan(params);

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
window.vopr.kat['log']=1;
//})();
//Обзад 26720 26721
