(function() {

var x=sluchch(-9,9);
var b=sluchch(1,9)*sluchiz([-1,1])[0];
var a=sluchch(1,9)*sluchiz([-1,1])[0];
var c=sluchch(1,9)*sluchiz([-1,1])[0];
var f=sluchch(1,9)*sluchiz([-1,1])[0];
var d=2*a*x+b;
var g=sluchch(0,1);
var y=a*x*x+b*x+c;
var h=['абсциссу','ординату'];
var m=[x,y];

window.vopr.txt=('Прямая $y='+d+'x+'+f+'$ параллельна касательной к графику функции $y='+a+'x^{2}+'+b+'x+'+c+'$. Найдите '+h[g]+' точки касания.').plusminus();
window.vopr.ver=[''+m[g]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
