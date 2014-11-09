(function(){'use strict';
var a=sl(1,100);
var t=['_1',''].shuffle();

window.vopr.txt='В правильной шестиугольной призме $ABCDEFA_1B_1C_1D_1E_1F_1$ все ребра равны '+
	+a+'. '+om.otvnaydite.iz().toZagl()+' расстояние между точками $'+[
		['A'+t[0],'D'+t[0]],
		['B'+t[0],'E'+t[0]],
		['C'+t[0],'F'+t[0]],

		['A'+t[0],'E'+t[1]],
		['E'+t[0],'C'+t[1]],
		['C'+t[0],'A'+t[1]],

		['B'+t[0],'D'+t[1]],
		['D'+t[0],'F'+t[1]],
		['F'+t[0],'B'+t[1]],
	].iz().shuffle().join('$ и $')+'$.';
window.vopr.ver=[ 2*a ];
})();
//Гущин 503245
