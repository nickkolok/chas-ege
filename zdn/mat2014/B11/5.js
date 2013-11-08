(function() {

var a=sluchch(2,19);
var b=sluchch(1,3);
var c=sluchch(0.01,0.99,0.01);
var d=sluchch(1,2);
var z=sluchch(1,4);
var f=(z-b*c)/d;
var m=[[a.pow(b).toFixedLess(5).toStandart(),c.toFixedLess(5).toStandart()],[a.pow(d).toFixedLess(5).toStandart(),f.toFixedLess(5).toStandart()]].shuffle();
var x=(a*a*b/c).toFixedLess(5);
window.vopr.txt=('Найдите значение выражения $$'+m[0][0]+'^{'+m[0][1]+'}\\cdot'+m[1][0]+'^{'+m[1][1]+'}$$').plusminus();
window.vopr.ver=[''+a.pow(z)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=1;
window.vopr.kat['tri']=0;
})();
