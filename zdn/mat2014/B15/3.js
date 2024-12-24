(function() {

var b=sluchch(1,9).pm();
var v=sluchch(0,3);
var d=['точку минимума','точку максимума','наименьшее значение','наибольшее значение'];
var f=['','-','','-'];
var a=sluchch(2,20);
var g=[a,a,a*a,a*a];
var h=[-b,-b,a,-a];
window.vopr.text=('Найдите '+d[v]+' функции $y='+(f[v])+'\\sqrt{x^2+'+(2*b)+'x+'+(b*b+g[v])+'}$.').plusminus();
window.vopr.correctAnswers=[''+(h[v])];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();


