(function() {


var a=sluchiz([20,25,40,80,100,125])[0];
var b=sluchch(2,a/2);
var c=sluchch(2,a/2);
var d=a-b-c;
var f=[b,c,d];
var v3=sluchch(1);
var t1=sluchiz(om.strany.re,2);
var v1=sluchch(1);
var t2=om.sport.pe.iz();

window.vopr.txt='В чемпионате по '+t2+' участвуют '+a+' спортсменок, среди которых '+
				b+' из '+t1[0]+' и '+c+' из '+t1[1]+'. '+
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
