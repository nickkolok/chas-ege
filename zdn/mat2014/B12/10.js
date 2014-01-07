(function() {

var a;
var r;
var R=0.0001;
for(;!(R*100).isZ();){
	a=sluchch(1,95);
	r=sluchch(0.1,5,0.1);
	R=(100-a)*r/a;
}

window.vopr.txt=(
	'По закону Ома для полной цепи сила тока, измеряемая в амперах, равна $I=\\frac{\\varepsilon}{R+r}$'+
	', где $\\varepsilon$ — ЭДС источника (в вольтах), $r='+r.ts(1)+'$ Ом — его внутреннее сопротивление, $R$ — сопротивление цепи '+
	'(в омах). При каком наименьшем сопротивлении цепи сила тока будет составлять не более $'+a+'\\%$ от силы тока '+
	'короткого замыкания $I_{\\text{кз}}=\\frac{\\varepsilon}{r}$? (Ответ выразите в омах.)'
).plusminus();

window.vopr.ver=[R.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
