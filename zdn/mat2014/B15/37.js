(function(){'use strict';

var votr=sl1();//Ограничить ли отрезком?
var a=sl(-15,15);
var b=slKrome(a,-15,15);
//b+=(-2*a-b)%3;
var notr=[sl(-25,15),-a+(0.5).pm()].iz();
var kotr=sl(notr+0.5,25);
var xmin=Math.max(-a,(-2*a-b)/3);
var xmax=Math.min(-a,(-2*a-b)/3);
xmin=(xmin*1000).isZ()?xmin:undefined;
xmax=(xmax*1000).isZ()?xmax:undefined;
var f=function(x){
//	if(x===undefined)
//		return undefined;
	return (x+a).pow(2)*(x+b);
};

var fn=fn_zadan({
	slag:[('(x+'+a+')^2 (x+'+b+')').plusminus().replace(/\(x\+0\)/g,'x')],
	minx: ( !votr || xmin!==undefined && xmin.mzhd(notr,kotr) ) ? xmin : undefined ,
	maxx: ( !votr || xmax!==undefined && xmax.mzhd(notr,kotr) ) ? xmax : undefined ,
	miny: ( !votr || xmin!==undefined && xmin.mzhd(notr,kotr) ) ? f(xmin) : Math.min(f(notr),f(kotr)) ,
	maxy: ( !votr || xmax!==undefined && xmax.mzhd(notr,kotr) ) ? f(xmax) : Math.max(f(notr),f(kotr)) ,
	prnz: votr?notr:undefined,
	prkz: votr?kotr:undefined,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
})();
//Обзад 282859 282860 282861 282862
