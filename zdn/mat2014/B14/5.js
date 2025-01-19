(function() {

do{
	var a=sluchch(1,40);
	var t=sluchch(5,40);
	var b=sluchch(2,t-2);
	var x=a*t/b-a;
}while(!(x.isZ() && x>0 && x<90));


var t2=sluchiz(om.rusbukv,2);


var t1=sluchch(om.transportm.ie.length-1);
var t3=om.transportm.ie[t1];
var t4=om.transportm.re[t1];

var t5=['скорость '+t4+' на пути из '+t2[0]+' в '+t2[1],
		'скорость '+t4+' на пути из '+t2[1]+' в '+t2[0],
		'время, затраченное на путь из '+t2[0]+' в '+t2[1],
		'время, затраченное на путь из '+t2[0]+' в '+t2[1]+' (не считая времени остановки)',
];
var p5=[x,x+a,t,t-b];
var m5=['км/ч','км/ч','часах','часах'];
var v5=sl(3);

window.vopr.text=t3.toZagl()+' выехал с постоянной скоростью из '+lx[om.naspunkt.iz()].re+' '+
				t2[0]+' в '+lx[om.naspunkt.iz()].ve+' '+t2[1]+
				', расстояние между которыми равно '+(x*t)+' км. Через день после прибытия он отправился обратно в '+t2[0]+
				' со скоростью на '+a+' км/ч больше прежней. По дороге он сделал остановку на '+
				chislitlx(b,'час')+
				'. В результате '+t3+' затратил на обратный путь столько же времени, сколько на путь из '+
				t2[0]+' в '+t2[1]+'. Найдите '+t5[v5]+'. Ответ дайте в '+m5[v5]+'.';


window.vopr.correctAnswers=[p5[v5]];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();
