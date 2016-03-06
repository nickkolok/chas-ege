(function() {

var a=sluchch(2,99);
var b=sluchch(1,89);
var c=sluchch(1,2);
var d=sluchch(1,99);
var f=(c%2)?(-1):(1);
var g=['\\cos','\\sin'].shuffle();

window.vopr.txt=('Найдите значение выражения $$\\frac{'+a+g[0]+' '+b+'^\\circ}{'+g[1]+' '+(90+c*180-b)+'^\\circ}+'+d+'$$').plusminus();
window.vopr.ver=[''+(a*f+d)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();
