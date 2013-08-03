(function() {'use strict';

var a=sluchch(0.1,9.9,0.1);
var b=sluchiz([[1,6,8,9],[3,4,5,6]])[0];
var v0=sluchch(0,1);

var y='Радиусы трёх шаров равны $'+(b[0]*a).ts()+'$ , $'+(b[1]*a).ts()+'$ и $'+(b[2]*a).ts()+'$. '+
		'Найдите радиус шара, объём которого равен сумме их объёмов.';

window.vopr.txt=y;
window.vopr.ver=[''+(b[3]*a).ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=1;
window.vopr.kat['tri']=0;
})();
