(function() {

var r=sluchch(1,100);

var f=svVel([
	{vel:'объём конуса',zna:r,rod:0,nah:1},
	{vel:'объём цилиндра',zna:3*r,rod:0,nah:1},
]);

window.vopr.ver=[''+f.splice(0,1)];
window.vopr.txt='Конус и цилиндр имеют общее основание и общую высоту (конус вписан в цилиндр). '+f.shuffle().soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Обзад 27051
//Николай Авдеев
