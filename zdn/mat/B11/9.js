(function() {

var r=sluchch(1,100);

var f=svVel([
	{vel:'объём большего конуса',zna:8*r,rod:0,nah:1,vin:1},
	{vel:'объём меньшего конуса',zna:r,rod:0,nah:1,vin:1},
]);

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='Через середину высоты параллельно основанию конуса проведено сечение, которое является основанием меньшего конуса с той же вершиной. '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Обзад 27052
//Николай Авдеев
