(function() {

var a=sluchch(2,9);
var b=sluchch(2,3);
var f=sluchch(1,b-1);
var c=sluchch(0.01,9.99,0.01);
var z=sluchch(1,4);
window.vopr.txt=('Найдите значение выражения $$\\frac{'+a.pow(b)+'^{'+(z+c).toFixedLess(5).toStandart()+'}}{'+a.pow(f)+'^{'+(z+c*b/f).toFixedLess(5).toStandart()+'}}$$').plusminus();
window.vopr.ver=[''+a.pow(z)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=1;
window.vopr.kat['tri']=0;
})();
