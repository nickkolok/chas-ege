(function() {

var a=sluchch(1,20);
var b=sluchch(1,20);
var c=sluchch(1,20);

var y='{\\frac{\\sqrt{'+(a*b*0.1).ts()+'}\\cdot\\sqrt{'+(a*c*0.1).ts()+'}}{\\sqrt{'+(c*b*0.01).ts()+'}}}';
window.vopr.txt=('Найдите значение выражения $$'+y+'$$').plusminus();
window.vopr.ver=[''+a];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
