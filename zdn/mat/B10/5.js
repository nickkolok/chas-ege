(function() {


var a=sluchiz([20,25,40,80,100,125])[0];
var b=sluchch(2,a/3);
var c=sluchch(2,a/3-2);
var g=sluchch(2,a/3-2);
var d=a-b-c;
var f=[b,c,d,g];
var t1=sluchiz(om.strany.re,4);
var v1=sluchch(2);
var t2=sluchiz(om.sport.pe)[0];

window.vopr.txt='В чемпионате по '+t2+' участвуют '+a+' спортсменок: '+
				b+' из '+t1[0]+', '+c+' из '+t1[1]+', '+d+' из '+t1[2]+', остальные — из '+t1[3]+'. '+
				'Порядок, в котором выступают спортсменки, определяется жребием. '+
				'Найдите вероятность того, что спортсменка, выступающая '+
				sluchiz(['первой','последней','предпоследней','второй','третьей',sluchch(4,a)+'-ой'])[0]+
				', окажется из '+t1[v1]+'.';
window.vopr.ver=[''+(f[v1]/a).ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
