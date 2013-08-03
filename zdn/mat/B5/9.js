(function() {

var a=sluchch(2,9);
var f=sluchch(2,9);
var d=sluchch(1,4);
var x=sluchch(1,9).pm();
var b=sluchch(1,9).pm();
var c=f.pow(d)-b*x;
var m=[''+c,''+b+'x'].shuffle();

var h='\\log_{'+a+'}{';
window.vopr.txt=('Найдите корень уравнения $$'+h+'('+m[0]+'+'+m[1]+')}='+d+h+f+'}$$').plusminus();
window.vopr.ver=[''+x];

window.vopr.kat['log']=1;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
