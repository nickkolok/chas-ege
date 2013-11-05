(function() {

var a=sluchch(2,9);
var b=sluchch(1,100).pm();
var c=sluchch(0,4);
var v=sluchch(0,1);
var d=(v?'+':'-');
var x=(a.pow(c)-b)*(v?1:(-1))	
window.vopr.txt=('Найдите корень уравнения $$\\log_{'+a+'}{('+b+d+'x)}='+c+'$$').plusminus();
window.vopr.ver=[''+x];

window.vopr.kat['log']=1;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
