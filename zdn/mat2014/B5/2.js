(function() {

var b=sluchiz(latbukv,5); 
var tA=b[0],tB=b[1],tC=b[2],tD=b[3],tE=b[4];
var nS=sluchch(11,99);
var aV=[1,2,3,4];
aV.shuffle();
var nS1=nS*aV[0];
var nS2=nS*aV[1];
var tTr=[];

tTr[1]='треугольника $'+(sluchiz([sluchiz([tC,tA,tB]).soed()+tD+tE,sluchiz([tD,tE]).soed()+tA+tB]).soed()).mesh()+'$ ';
tTr[2]='треугольника $'+(sluchiz([tC+tD+tB,tC+tE+tA]).soed()).mesh()+'$ ';
tTr[3]='трапеции $'+sluchiz([tA+tD+tE+tB,tB+tE+tD+tA])+'$ ';
tTr[4]='треугольника $'+(tA+tB+tC).mesh()+'$ ';

window.vopr.txt='В треугольнике $'+tA+tB+tC+'$  $'+tD+tE+'$ – средняя линия, $'+tD+' \\in '+tA+tC+'$, $'+tE+' \\in '+tC+tB+'$. Площадь '+tTr[aV[0]]+'равна '+nS1+'. Найдите площадь '+tTr[aV[1]]+'.';
window.vopr.ver=[''+nS2];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
