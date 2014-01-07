(function() {

var t=sluchch(0,om.korabli.ie.length-1);
var c=sluchch(10,100);
var a=sluchch(100,999);
var b=sluchch(10,100);

var y=om.korabli.ie[t].toZagl()+' перевозит '+a+' пассажиров и '+b+' членов экипажа. ';
y+='В целях безопасности на '+om.korabli.pe[t]+' размещены спасательные шлюпки, каждая из которых вмещает '+c+' человек. ';
y+='Какое наименьшее количество шлюпок должно быть на '+om.korabli.pe[t]+'?'
window.vopr.txt=y;
window.vopr.ver=[''+((a+b)/c).ceil()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
