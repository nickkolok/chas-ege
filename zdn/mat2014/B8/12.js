(function() {

var t1 = NLsets.alphabets.english.getRandomItems(3);
var p1=sl(1,100);
var p2=sl(1,100);
var p3=sl(1,100);

window.vopr.ver=[p1+p2+p3];
window.vopr.txt='К окружности, вписанной в треугольник '+t1.soed()+
	', проведены три касательные. Периметры отсеченных треугольников равны '+p1+
	', '+p2+', '+p3+'. Найдите периметр данного треугольника.';

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Обзад 54649
//Николай Авдеев

