(function() {

var troyka=om.pifagtr.iz();
var u=sluchch(1,10)
var a=troyka[0]*u;
var b=troyka[1]*u;
var c=troyka[2]*u;

var h=sluchch(1,10);

var f=svVel([
	{vel:'меньший из катетов основания',zna:a,rod:0,nah:1},
	{vel:'больший катет основания',zna:b,rod:0,nah:1},
	{vel:'боковые рёбра призмы',zna:h,rod:3,nah:0,pre:'$\\frac{',nmn:'}{\\pi}$'},
	{vel:'объём описанного около этой призмы цилиндра',zna:(c*c*h/4).ts(),rod:0,nah:1},
]);

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='В основании прямой призмы лежит прямоугольный треугольник. '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
