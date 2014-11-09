(function(){'use strict';
var r=sl(1,100);
var v1=sl(3);
//0 - 90
//1 - 30 150
//2 - 60 120
//3 - 45 135
var otv=[2*r,r,3*r,2*r][v1];
var rmnozh=['','','\\sqrt{3}','\\sqrt{2}'][v1];
var gradus=[90,30,60,45][v1];
gradus=[gradus,180-gradus].iz();

window.vopr.txt='Найдите хорду, на которую опирается угол $'+gradus+'^\\circ$, вписанный в окружность '+
	['радиуса $'+r,'диаметра $'+(2*r), 'длины $'+(2*r)+'\\pi'].iz()+rmnozh+'$.';
window.vopr.ver=[ otv ];
})();
//Гущин 27856 27862
