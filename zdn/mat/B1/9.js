(function() {

var a=sluchch(1,9);
var b=sluchch(2,20);
for(var c=b;c==b;c=sluchch(2,60));
for(var d=a;d==a;d=sluchch(2,60));
var f=sluchiz(['маринада','рассола'])[0];
var g=sluchiz(['помидоров','огурцов','грибов','капусты','шампиньонов'])[0];
var y='Для приготовления '+f+' для '+g+' на '+a+'&nbsp;л воды требуется '+b+'&nbsp;г лимонной кислоты. '+
		'Лимонная кислота продается в пакетиках по '+c+'&nbsp;г. '+
		'Какое наименьшее число пачек нужно купить хозяйке для приготовления '+d+'&nbsp;л '+f+'?';


window.vopr.txt=y;
window.vopr.ver=[''+(b*d/a/c).ceil().ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
