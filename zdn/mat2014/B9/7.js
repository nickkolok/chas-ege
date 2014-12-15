(function(){

var a=[1,2,4,5,10].iz().pm();
var b=sl(-10,10);

binom=[b,a].mn_pervoobr();
binom[0]=sl(-99,99);
binom=binom.mn_pervoobr();
binom[0]=sl(-99,99);

vopr.txt="Найдите точку перегиба графика функции $y= "+binom.mn_txt('x')+"$.";
vopr.ver=[(b/a).ts()];

})();
//http://ege-ok.ru/2013/11/15/tochki-peregiba-i-promezhutki-vyipuklosti-i-vognutosti-grafika-funktsii/
