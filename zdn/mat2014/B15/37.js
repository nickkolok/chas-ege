(function(){'use strict';

var votr=sl1();//Ограничить ли отрезком?
var a=sl(-15,15);
var b=slKrome(a,-15,15);
var notr=[sl(-25,15),-a+(0.5).pm()].iz();
var kotr=(notr+0.5,25);
var xmin=Math.max(-a,-2*a-b);
var xmax=Math.min(-a,-2*a-b);
var f=function(x){
	return (x+a).pow(2)*(x+b);
}


var fn=fn_zadan({
	slag:[('(x+'+a+')^2 (x+'+b+')').plusminus().replace(/(x)/g,'x')],
	minx: ( !votr || xmin.mzhd(notr,kotr) ) ? xmin : undefined ,
	maxx: ( !votr || xmax.mzhd(notr,kotr) ) ? xmax : undefined ,
	miny: ( !votr || xmin.mzhd(notr,kotr) ) ? f(xmin) : Math.min(f(notr),f(kotr)) ,
	maxy: ( !votr || xmax.mzhd(notr,kotr) ) ? f(xmax) : Math.max(f(notr),f(kotr)) ,
	prnz: votr?notr:undefined,
	prkz: votr?kotr:undefined,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
})();
//Обзад 282859 282860 282861 282862
