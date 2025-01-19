(function(){'use strict';

var a = sl(1,6);
var b = sl(3,30,3);

var xmin=4*b*b/a/a;
var ymin=xmin*b/3;

var zprn,zprk;
switch(sl(3)){
	case 0:
		//Вся прямая
	break;
	case 1:
		//Отрезок или луч, точка минимума внутри
		zprn=sl(0,xmin-1);
		zprk=[sl(xmin+1,1024),undefined].iz();
	break;
	case 2:
		//Отрезок или луч, точка минимума в начале
		zprn=xmin;
		zprk=[sl(xmin+1,1024),undefined].iz();
	break;
	case 3:
		//Отрезок, точка минимума в конце
		zprn=sl(0,xmin-1);
		zprk=xmin;
	break;
}

var fn=fn_zadan({
	slag:[ a.frac(3)+['x^{\\frac{3}{2}}','x \\sqrt{x}'].iz(),'-'+b+'x',],
	minx:xmin.ts(),
	miny:ymin.ts(),
	prnz:zprn,
	prkz:zprk,
});

window.vopr.text=fn.txt;
window.vopr.correctAnswers=[fn.ver];

window.vopr.categories['prz']=1;
window.vopr.categories['drs']=1;
})();
/*Обзад
 * 26751 26752 26753 26754
 * 26755 26756 26757 26758
 * 26759 26760 26761 26762
 * 26763 26764 26765 26766
*/
