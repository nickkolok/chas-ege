(function(){

var binom=[sl(-5,5),sl(1,5).pm()];
binom=binom.mn_umn(binom);
binom[[0,2].iz()]+=sl(1,9);
//Получился квадратный трёхчлен с отрицательным дискриминантом

var a=[1,2,4,5,10].iz().pm();
var b=sl(-10,10);
binom=binom.mn_umn([b,a]);
binom=binom.mn_pervoobr();
binom[0]=sl(-99,99);

vopr.txt="Найдите абсциссу точки, в которой касательная к графику функции $y= "+binom.mn_txt('x')+"$ параллельна оси абсцисс.";
vopr.ver=[(b/a).ts()];

})();
