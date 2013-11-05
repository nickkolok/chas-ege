(function() {

var a;
var b;
var c;
var d;
for(c=0.5;!c.isZ();){
	a=sluchch(1,50);
	b=sluchch(1,50);
	c1=sluchch(1,7);
	d=sluchch(100,1000)*b;
	c=a*d/b;
	a*=c1;
	b*=c1;
}
var f1=[
	{vel:'первоначальный уровень воды',zna:a,rod:0,nah:1,nmn:'см'},
	{vel:'изменение уровня воды',zna:b,rod:2,nah:1,nmn:'см'},
	{vel:'первоначальный уровень воды',zna:a+b,rod:0,nah:1,nmn:'см'}
	].sluchiz(2);
var f2=[
	{vel:'первоначальный объём воды',zna:c,rod:0,nah:1,nmn:'$см^3$'},
	{vel:'объём детали',zna:d,rod:0,nah:1,nmn:'$см^3$'},
	{vel:'общий объём воды и детали',zna:c+d,rod:0,nah:1,nmn:'$см^3$'}
	].sluchiz(2);


var f=svVel(f1.concat(f2));

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='В сосуд, имеющий форму '+['цилиндра','параллелепипеда','правильной '.esli(sl1())+['треугольной','четырёхугольной','пятиугодной','шестиугольной'].iz()+' призмы'].iz()+', наливают воду, замеряют её уровень, затем опускают деталь и замеряют новый уровень. '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
