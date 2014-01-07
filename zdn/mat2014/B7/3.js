(function() {

var a=sluchch(2,99);
var c=sluchch(1,9).pm();
var d=sluchch(2,99);
var x=sluchch(1,9).pm();
var b=d-c*x;

var m=['('+b+'+'+c+'x)',''+d].shuffle();
var n='\\log_{'+a+'}';
window.vopr.txt=('Найдите корень уравнения $$'+n+m[0]+'='+n+m[1]+'$$').plusminus();
window.vopr.ver=[''+x];

window.vopr.kat['log']=1;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
