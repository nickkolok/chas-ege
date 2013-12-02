(function() {

var a=sluchch(1,3);
var b=sluchch(0,3);
var r=sluchch(3,8);
var c=sluchch(0,(r/2).ceil());
var d=sluchch(0,(r/2).ceil());
var s=r*r*a/4;


var slid=Math.random();
window.vopr.dey=function(){
	var ris=document.getElementById('ris'+slid);
	var ct = ris.getContext('2d');
	var w=480;
	var h=480;
	ct.translate(w/2,h/2);
	ct.lineWidth=2;
	var s=20;
	ct.setka(20,s);
	ct.lineWidth=4;
	ct.lineJoin='round';
	ct.fillStyle='777';
	var f=(d/c).atan();
	
	ct.beginPath();
		ct.arc(0, 0, r*s, f, f-Math.PI/2*a, true);
		ct.lineTo(0,0);
	ct.closePath();
	ct.globalAlpha=0.5;
	ct.fill();
	ct.globalAlpha=1;
	ct.stroke();
	ct.beginPath();
		ct.arc(0, 0, r*s, 0, 2*Math.PI, true);
	ct.closePath();
	ct.stroke();
	


};



window.vopr.txt='Найдите (в см$^2$) площадь $S$ фигуры, изображенной на клетчатой бумаге с размером клетки 1 см $\\times$ 1 см (см. рис.). В ответе запишите $\\frac S\\pi$.';
window.vopr.txt+='<canvas style="float:left;margin-right:1em;" width="480" height="480" id="ris'+slid+'" style="text-align:center"></canvas>';
window.vopr.ver=[s.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

