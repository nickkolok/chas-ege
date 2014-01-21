(function(){

var a=sl(1,9);
var b=sl(2,20);
var c=slKrome(b,2,60);
var d=slKrome(a,2,60);
var f=['маринада','рассола'].iz();
var g=['помидоров','огурцов','грибов','капусты','шампиньонов'].iz();
window.vopr.txt='Для приготовления '+f+' для '+g+' на '+a+'&nbsp;л воды требуется '+b+'&nbsp;г лимонной кислоты. '+
	'Лимонная кислота продается в пакетиках по '+c+'&nbsp;г. '+
	'Какое наименьшее число пачек нужно купить хозяйке для приготовления '+d+'&nbsp;л '+f+'?';

window.vopr.ver=[(b*d/a/c).ceil().ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
//Обзад 26625
