(function() {

var a=sluchch(11,19);
var l0=sluchch(10,90,10);
var t=sluchch(10,90,10);
var dl=(a*t*l0/1000).toFixedLess(3);

var c='При температуре $0^\\circ {\\rm{C}}$ рельс имеет длину $l_0='+l0+'$ м. '+
'При возрастании температуры происходит тепловое расширение рельса, и его длина, '+
'выраженная в метрах, меняется по закону $l(t^\\circ ) = l_0 (1 + \\alpha  \\cdot t^\\circ)$, '+
'где $\\alpha='+(a/10).toFixedLess(3)+'\\cdot 10^{-5}(^\\circ {\\rm{C}})^{-1}$ — коэффициент '+
'теплового расширения, $t^\\circ$  — температура (в градусах Цельсия). При какой температуре '+
'рельс удлинится на '+dl+' мм? Ответ выразите в градусах Цельсия.';

window.vopr.txt=c;
window.vopr.ver=[''+t];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

