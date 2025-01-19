(function(){'use strict';

var a=sluchch(0.1,9.9,0.1);
var b=[[1,6,8,9],[3,4,5,6]].iz();

window.vopr.text='Радиусы трёх шаров равны $'+(b[0]*a).ts()+'$ , $'+(b[1]*a).ts()+'$ и $'+(b[2]*a).ts()+'$. '+
	'Найдите радиус шара, объём которого равен сумме их объёмов.';
window.vopr.correctAnswers=[''+(b[3]*a).ts()];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=1;
window.vopr.categories['tri']=0;
})();
