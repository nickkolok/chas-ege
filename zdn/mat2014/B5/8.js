(function() {

var a=sluchch(1,19);
var v1=sluchch(1);
var b=['площадь','диагональ'];
var c=[(a*a/2).ts(),a];
window.vopr.text=b[v1].toZagl()+' квадрата равна '+c[v1]+'. Найдите его '+b[1-v1]+'.';
window.vopr.correctAnswers=[c[1-v1]];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();
