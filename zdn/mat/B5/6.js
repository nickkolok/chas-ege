(function() {

var x=sluchch(-9,9);
var b=sluchch(1,9);
var c=sluchch(1,9);
var x=sluchch(1,9);
var a=c*c-b*x;
var m=[''+a,''+b+'x'].shuffle();
window.vopr.txt=('Найдите корень уравнения $$\\sqrt{'+m[0]+'+'+m[1]+'}='+c+'$$').plusminus();
window.vopr.ver=[''+x];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
