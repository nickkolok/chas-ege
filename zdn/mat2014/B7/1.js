(function() {

var a=sluchch(-9,9);
var b=sluchch(1,9);
var c=sluchch(-9,-2);
var d=sluchch(1,9);

window.vopr.txt=('Найдите корень уравнения $$\\frac{1}{'+(b-c)+'x+'+d+'}=\\frac{1}{'+(-c)+'x+'+(a*b+d)+'}$$').plusminus();
window.vopr.ver=[''+a];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
