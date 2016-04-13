(function() {

var Ax=0;
var Ay=0;
var Bx=0;
var By=0;
var Cx=0;
var Cy=0;
var p=0;
for(;!p;){
	Ax=sluchch(1,16);
	Ay=sluchch(1,16);
	Bx=sluchch(1,16);
	By=sluchch(1,16);
	Cx=sluchch(1,16);
	Cy=sluchch(1,16);
	p=s3ug(Ax,Ay,Bx,By,Cx,Cy);
}

p=p.ts();

var slid=Math.random();
window.vopr.dey=function(){
	var ris=document.getElementById('ris'+slid);
	var ct = ris.getContext('2d');
	var w=480;
	var h=480;
	ct.lineWidth=2;
	var s=20;
	ct.setka(20,s);
	ct.lineWidth=4;
	ct.lineJoin='round';
	ct.fillStyle='777';
	ct.beginPath();
		ct.moveTo(Ax*s,Ay*s);
		ct.lineTo(Bx*s,By*s);
		ct.lineTo(Cx*s,Cy*s);
	ct.closePath();
	ct.globalAlpha=0.5;
	ct.fill();//Ax*s,Ay*s,-(Ax-Bx)*s,-(Ay-By)*s);
	ct.globalAlpha=1;
	ct.stroke();//Ax*s,Ay*s,-(Ax-Bx)*s,-(Ay-By)*s);
};

window.vopr.txt='Найдите площадь треугольника, изображенного на клетчатой бумаге с размером клетки 1 см $\\times$ 1 см (см. рис.). Ответ дайте в квадратных сантиметрах.';
window.vopr.txt+='<canvas style="float:left;margin-right:1em;" width="480" height="480" id="ris'+slid+'" style="text-align:center"></canvas>';
window.vopr.ver=[p];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

