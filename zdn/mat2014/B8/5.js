(function() {

var t2=sluchiz(om.latbukv,3);
var t1=[['sin',['tg~} '+t2[1],'ctg~} '+t2[2]].iz()],['cos',['ctg~} '+t2[1],'tg~} '+t2[2]].iz()]].iz();
var v1=sluchch(1);

var c=[2,5,10].iz();
var a=sluchch(1,100);
var b=c*c+a*a;
var y1=b.isPolnKvadr();
var v1=sluchch(1);
window.vopr.txt='В треугольнике $'+t2.soed()+'$ угол $'+t2[0]+'$ равен $90^\\circ$, $\\'
				+t1[0]+' '+t2[1]+' = \\frac{'+(y1?a:a+b.koren().esli(v1))+'}{'+(y1?b.sqrt:(v1?b:b.koren()))+
				'}$. Найдите $\\mathrm{'+t1[1]+'$.';
window.vopr.ver=[(a/c).ts()];
//window.vopr.ver=[(a/b.sqrt()).arcsin().tg().ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();
