(function() {

var a=sluchch(1,9);
var d=sluchch(2,9);
var x=sluchch(1,9).pm();
var b=sluchch(1,9).pm();
var c=a*d*d-b*x;
var m=[''+c,''+b+'x'].shuffle();

window.vopr.txt=('Найдите корень уравнения $$\\sqrt{\\frac{'+a+'}{'+m[0]+'+'+m[1]+'}}=\\frac{1}{'+d+'}$$').plusminus();
window.vopr.ver=[''+x];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
