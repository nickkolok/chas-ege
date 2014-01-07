(function() {'use strict';

var a=sluchch(0.1,9.9,0.1);

var v0=sluchch(0,1);

var y=(v0?'Диагональ':'Объём')+' куба рав'+(v0?'на':'ен')+' $'+(v0?a:3*a*a*a).ts()+'\\sqrt{3}$. Найдите '+(v0?'объём':'диагональ')+' куба.';

window.vopr.txt=y;
window.vopr.ver=[''+(a*(v0?a*a:3)).ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
