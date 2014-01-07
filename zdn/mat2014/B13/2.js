(function() {

var r=sl(1,10);
var h=sl(1,10);
var v=4*r*r*h;
var p=8*r*(r+h);
var d=8*r*r+h*h;

var f=svVel([
	{vel:'радиус основания цилиндра',zna:r,rod:0,nah:1},
	{vel:'высота цилиндра',zna:h,rod:1,nah:1},
	{vel:'площадь осевого сечения цилиндра',zna:2*r*h,rod:1,nah:1},
	[
		{vel:'объём параллелепипеда',zna:v,rod:0,nah:1},
		{vel:'площадь поверхности параллелепипеда',zna:v,rod:1,nah:1},
		{vel:(d.isPolnKvadr()?'диагональ':'квадрат диагонали')+' параллелепипеда',zna:(d.isPolnKvadr()?d.sqrt():d),rod:(d.isPolnKvadr()?1:0),nah:1}
	].iz()
].sluchiz(3));

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='Прямоугольный параллелепипед описан около цилиндра. '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
