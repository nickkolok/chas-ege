(function() {

var a=sluchch(1,99);
var v1=sluchch(1);
var b=['площадь сечения, проходящего через середины четырёх рёбер правильного тетраэдра','ребро правильного тетраэдра'];
var c=[(a*a/4).ts(),a];
var d=[', равна',' равно'];
window.vopr.text=b[v1].toZagl()+d[v1]+' '+c[v1]+'. Найдите '+b[1-v1]+'.';
window.vopr.correctAnswers=[c[1-v1]];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();
