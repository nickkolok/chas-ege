(function() {

var a=sluchch(2,9);
var b=sluchch(2,4);
var f=sluchch(1,b-1);
var m=sluchch(1,9);
var g=sluchch(1,9);
var z=sluchch(1,4);
var c=z*m-g;
window.vopr.txt=('Найдите значение выражения $$'+a.pow(b)+'^{\\frac{'+c+'}{'+(b*m)+'}}\\cdot'+a.pow(f)+'^{\\frac{'+g+'}{'+(f*m)+'}}$$').plusminus();
window.vopr.ver=[''+a.pow(z)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=1;
window.vopr.kat['tri']=0;
})();
