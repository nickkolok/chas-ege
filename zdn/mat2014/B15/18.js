(function(){'use strict';

var a;
var b;
var c;
do{
	a=sl(1,9);
	b=sl(-99,99);
	c=sl(0,99);
}while(b*b-4*a*c>0)

var f=[c,b,a].mn_pervoobr();

var vn=sl1();//Если 1, то бесконечность
var vk=vn?0:sl1();

var t=a%3?3:1;

var n=vn?undefined:sl(-9,3,t);
var k=vk?undefined:sl(vn?-9:(n+t),12,t);

var h=f.mn_txtmas('x');
h.splice(0,1);

var fn=fn_zadan({
	slag:h,
	minx:n,
	miny:vn?undefined:f.mn_vychisl(n),
	maxx:k,
	maxy:vk?undefined:f.mn_vychisl(k),
	prnz: n,
	prnb: 0,
	prkz: k,
	prkb: 0,
});

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];

window.vopr.kat['prz']=1;
})();
//Вроде даже НЕ обзад.

