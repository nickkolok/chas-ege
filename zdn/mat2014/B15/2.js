(function() {

var a=sluchch(2,99)*sluchiz([-1,1])[0];
var c=sluchiz([-1,1])[0];
var d=((c-1)?('наибольшее'):('наименьшее'));


window.vopr.txt=('Найдите '+d+' значение функции $y='+((c==-1)?'-':'')+'(x+'+a+')e^{x+'+(a+1)+'}$ на отрезке $['+(-a-2)+'; '+(-a)+']$.').plusminus();
window.vopr.ver=[''+(-c)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();


