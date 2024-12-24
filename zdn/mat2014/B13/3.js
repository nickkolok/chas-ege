(function() {

var r=sluchch(1,10);

var f=svVel([
	{vel:'радиус сферы',zna:r,rod:0,nah:1},
	{vel:'диаметр сферы',zna:2*r,rod:0,nah:1},
	{vel:'объём параллелепипеда',zna:8*r*r*r,rod:0,nah:1},
	{vel:'квадрат диагонали параллелепипеда',zna:3*4*r*r,rod:0,nah:1},
	{vel:'площадь поверхности параллелепипеда',zna:4*6*r*r,rod:1,nah:1},
	{vel:'среднее арифметическое длин рёбер параллелепипеда',zna:2*r,rod:2,nah:1}
].sluchiz(2));

window.vopr.correctAnswers=[''+f.splice(0,1)];
window.vopr.text='Прямоугольный параллелепипед описан около сферы. '+f.shuffle().soed();

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();
