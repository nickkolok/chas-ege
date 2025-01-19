(function(){'use strict';

var a=sluchch(1,5);
var r=a*(3 .pow(sl1()))*(2 .pow(sluchch(0,3)));
window.vopr.text='Найдите центральный угол сектора круга радиуса $\\frac{'+r+
	'}{\\sqrt{\\pi}}$, площадь которого равна '+(a*a)+'. Ответ дайте в градусах.';
window.vopr.correctAnswers=[(360*a*a/r/r).ts()];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();
