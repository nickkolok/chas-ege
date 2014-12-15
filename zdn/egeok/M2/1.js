(function(){

var a=sl(1,10);
var c=sl(1,10);
var b=1;
while(b.isPolnKvadr())
    b=sl(c.sqrt().ceil(),17);

vopr.txt="Вычислите значение выражения $$"+
	["\\sqrt{"+[(a*a+b),""+(2*a)+"\\sqrt{"+b+"}"].slag()+"}",
	"\\sqrt{"+[(c*c+b),""+(-2*c)+"\\sqrt{"+b+"}"].slag()+"}"].slag().plusminus()+"$$";
vopr.ver=[(a+c).ts()];

})();
