(function() {

var a=sluchch(2,99);
var c=sluchch(-100,100);
var d=sluchch(1,99);
var f=sluchch(1,99);

window.vopr.text=('Найдите наименьшее значение функции $y=e^{'+a+'x}-'+a+'e^x+'+c+'$ на отрезке $[-'+d+'; '+f+']$.').plusminus();
window.vopr.correctAnswers=[''+(c+1-a)];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=1;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();


