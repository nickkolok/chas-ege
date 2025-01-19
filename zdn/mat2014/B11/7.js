(function() {

var a=sluchch(2,9);
var b=sluchch(2,4);
var f=sluchch(1,b-1);
var m=sluchch(1,9);
var g=sluchch(1,9);
var z=sluchch(1,4);
var c=z*m-g;
window.vopr.text=('Найдите значение выражения $$'+a.pow(b)+'^{'+c.frac(b*m)+'}\\cdot'+
	a.pow(f)+'^{'+g.frac(f*m)+'}$$').plusminus();
window.vopr.correctAnswers=[''+a.pow(z)];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=1;
window.vopr.categories['tri']=0;
})();
