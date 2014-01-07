(function() {

for(var x=0.5;!(x.isZ()&&x>0);){
	var a=sluchch(2,10);
	var t=sluchch(4,10);
	var b=sluchch(2,t-1);
	var x=a*t/b-a;
}

var t1=sluchch(om.transportm.ie.length-1);
var t3=om.transportm.r2[t1];
var t4=om.transportm.re[t1];

var t5=['первым','вторым'];
var p5=[x+a,x];
var v5=sl1();

window.vopr.txt='Два '+t3+' одновременно отправились в '+(x*t)+'-километровый пробег. Первый ехал со скоростью, на '+
				a+' км/ч большей, чем скорость второго, и прибыл к финишу на '+chislitM(b,'час','часа','часов')+
				' раньше второго. Найти скорость '+
				t4+', пришедшего к финишу '+t5[v5]+'. Ответ дайте в км/ч.';


window.vopr.ver=[p5[v5]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Обзад 26583б 26584
//Николай Авдеев
