(function(){'use strict';

var a=sluchch(2,99)*sluchiz([-1,1])[0];
var c=sluchiz([-1,1])[0];
var d=((c-1)?('наибольшее'):('наименьшее'));


window.vopr.text=('Найдите '+d+' значение функции $y='+((c==-1)?'-':'')+'(x+'+a+')e^{x+'+(a+1)+'}$ на отрезке $['+(-a-2)+'; '+(-a)+']$.').plusminus();
window.vopr.correctAnswers=[''+(-c)];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=1;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();
//Обзад 26691
//Николай Авдеев

