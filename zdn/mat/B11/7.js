(function() {

var a=sluchch(1,10);

var h=sluchch(1,10);
var p=[['','',1],['$\\frac{','}{\\pi}$',0]].shuffle();

var f=svVel([
	{vel:'сторона основания',zna:a,rod:1,nah:1},
	{vel:'боковые рёбра призмы',zna:h,rod:3,nah:0,pre:'$\\frac{',nmn:'}{\\pi}$'},
	{vel:'объём описанного около этой призмы цилиндра',zna:(a*a*h/2).ts(),rod:0,nah:1},
]);

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='В основании прямой призмы лежит квадрат. '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
