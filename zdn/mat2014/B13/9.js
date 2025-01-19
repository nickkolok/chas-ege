(function() {

var r=sluchch(1,100);

var f=svVel([
	{vel:'объём большего конуса',zna:8*r,rod:0,nah:1,vin:1},
	{vel:'объём меньшего конуса',zna:r,rod:0,nah:1,vin:1},
]);

window.vopr.correctAnswers=[''+f.splice(0,1)];
window.vopr.text='Через середину высоты параллельно основанию конуса проведено сечение, которое является основанием меньшего конуса с той же вершиной. '+f.shuffle().soed();

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();

//Обзад 27052
//Николай Авдеев
