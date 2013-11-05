(function() {

var A={};
var B={};
var C={};
var D={};
var p=0;
var d=[];
var g='';
for(;!p
		||(g.ie=='четырёхугольник')&&sluchch(0,2000)
		||(g.ie=='трапеция')&&sluchch(0,100)
		||(g.ie=='дельтоид')&&sluchch(0,25)
		||(g.ie=='параллелограмм')&&sluchch(0,50)
	;){
	A.x=sluchch(1,16);
	A.y=sluchch(1,16);
	B.x=sluchch(1,16);
	B.y=sluchch(1,16);
	C.x=sluchch(1,16);
	C.y=sluchch(1,16);
	D.x=sluchch(1,16);
	D.y=sluchch(1,16);
	d=[A,B,C,D];
	p=d.mt_isMnug(4);
	g=d.mt_imen4ug();
}
p=d.mt_s4ug();

var slid=Math.random();
window.vopr.dey=function(){
	var ris=document.getElementById('ris'+slid);
	var ct = ris.getContext('2d');
	var w=480;
	var h=480;
	ct.lineWidth=2;
	var s=20;
	ct.setka(20,s);
	ct.lineWidth=5;
	ct.fillStyle='777';
	ct.beginPath();
		ct.moveTo(A.x*s,A.y*s);
		ct.lineTo(B.x*s,B.y*s);
		ct.lineTo(C.x*s,C.y*s);
		ct.lineTo(D.x*s,D.y*s);
	ct.closePath();
	ct.globalAlpha=0.5;
	ct.fill();//Ax*s,Ay*s,-(Ax-Bx)*s,-(Ay-By)*s);
	ct.globalAlpha=1;
	ct.stroke();//Ax*s,Ay*s,-(Ax-Bx)*s,-(Ay-By)*s);
};

window.vopr.txt='Найдите площадь '+g.re+' на клетчатой бумаге с размером клетки 1 см $\\times$ 1 см (см. рис.). Ответ дайте в квадратных сантиметрах.'+
	'<canvas style="float:left;margin-right:1em;" width="480" height="480" id="ris'+slid+'" style="text-align:center"></canvas>';
window.vopr.ver=[p.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

