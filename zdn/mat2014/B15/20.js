(function(){'use strict';

var a=sl(1,9);
var x1=[sl(-19,10),0].iz();//Точка максимума
var x2=[sl(x1+1,20),x1].iz();
//Искуственно увеличиваем частоту случаев, когда x2=0;
if(x1<0 && !sl(3))
	x2=0;
var n=sl(-19,10);
var k=sl(n+1,19);

if(a%3){
	x1=x1.okrugldo(3);
	x2=x2.okrugldo(3);
	n=n.okrugldo(3);
	k=k.okrugldo(3);
}

var f=[-x1,1].mn_umn([-x2,1]).mn_umn([a]).mn_pervoobr();
var h=f.mn_txtmas('x');
h.splice(0,1);


var fn=f.mn_vychisl(n);
var fk=f.mn_vychisl(k);
var xmin=[n,k];
var xmax=[n,k];
var ymin=[fn,fk];
var ymax=[fn,fk];

if(x1.mzhd(n,k)){
	xmax.push(x1);
	ymax.push(f.mn_vychisl(x1));
}
if(x2.mzhd(n,k)){
	xmin.push(x2);
	ymin.push(f.mn_vychisl(x2));
}

var fn=fn_zadan({
	slag:h,
	prnz:n,
	prkz:k,
	minx:xmin[ymin.min()],
	maxx:xmax[ymax.max()],
	miny:ymin.minE(),
	maxy:ymax.maxE(),
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
})();
/*Обзад
 * 77421 77422 77425 77426
 * 77429 77430 77433 77434
 * 77437 77438 77441 77442
 * 77445 77446 77449 77450
*/
