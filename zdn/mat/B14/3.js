(function() {

var b=sluchch(1,9).pm();
var v=sluchch(0,3);
var d=['точку минимума','точку максимума','наименьшее значение','наибольшее значение'];
var f=['','-','','-'];
var a=sluchch(2,20);
var g=[a,a,a*a,a*a];
var h=[-b,-b,a,-a];
window.vopr.txt=('Найдите '+d[v]+' функции $y='+(f[v])+'\\sqrt{x^2+'+(2*b)+'x+'+(b*b+g[v])+'}$.').plusminus();
window.vopr.ver=[''+(h[v])];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();


