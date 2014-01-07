(function() {

var x=sluchch(1,99);
var f=[1,2,4,5,10,20,25].iz();
var d=sluchch(30,50);
var b=f+d;
var a=sluchch(1,d-f-1);
var c=x*(2*d-a-b)/10/f;
x=x/10;
var g=sluchch(0,2);
var h=['первого','второго','третьего'];
var m=[x,x+c,2*x+c];

window.vopr.txt='Первый раствор содержит '+a.toFixedLess(4)+'% соли, второй содержит '+b.toFixedLess(4)+'% соли.';
window.vopr.txt+=' Масса второго раствора больше массы первого раствора на '+c.toFixedLess(4)+' г.';
window.vopr.txt+=' Два раствора сливают и получают третий, содержащий '+d.toFixedLess(4)+'% соли.';
window.vopr.txt+=' Найдите массу '+h[g]+' раствора.';
window.vopr.txt+=' Ответ дайте в граммах.';

window.vopr.ver=[''+m[g].toFixedLess(4)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
