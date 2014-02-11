(function(){'use strict';

var a=sl(1,9);
var x1=[sl(-20,10),0].iz();//Точка максимума
var x2=sl(x1+1,20);
//Искуственно увеличиваем частоту случаев, когда x2=0;
if(x1<0 && !sl(3))
	x2=0;

var f=[-x1,1].mn_umn([-x2,1]).mn_umn([a]).mn_pervoobr();

var h=f.mn_txtmas('x');
h.splice(0,1);

var fn=fn_zadan({
	slag:h,
	minx:x2,
	maxx:x1,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
})();
/*Обзад
 * 77419 77420 77423 77424
 * 77427 77428 77431 77432
 * 77435 77436 77439 77440
 * 77443 77444 77447 77448
*/
