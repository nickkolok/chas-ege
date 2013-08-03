(function() {

var Ax=0;
var Ay=0;
var Bx=0;
var By=0;
var fl=1;
for(;fl;){
	Ax=sluchch(1,16);
	Ay=sluchch(1,16);
	Bx=sluchch(1,16);
	By=sluchch(1,16);
	fl=(Ax==Bx)||(Ay==By);
}

var p=(Ax-Bx)*(Ay-By);
p=p.abs().ts();

var slid=Math.random();
window.vopr.dey=function(){
	var ris=document.getElementById('ris'+slid);
	var ct = ris.getContext('2d');
	var w=480;
	var h=480;
//	ct.translate(w/2,h/2);
	ct.lineWidth=2;
	var s=20;
	ct.setka(20,s);
	ct.lineWidth=5;
	ct.fillStyle='777';
	ct.globalAlpha=0.5;
	ct.fillRect(Ax*s,Ay*s,-(Ax-Bx)*s,-(Ay-By)*s);
	ct.globalAlpha=1;
	ct.strokeRect(Ax*s,Ay*s,-(Ax-Bx)*s,-(Ay-By)*s);
//	ct.drawLine(Ax*s,Ay*s,Ax*s,By*s);
//	ct.drawLine(Bx*s,By*s,Bx*s,Ay*s);
//	ct.drawLine(Bx*s,By*s,Ax*s,By*s);
	//$('#ris').attr('id','');
};



window.vopr.txt='Найдите площадь '+((Ax-Bx==Ay-By)?'квадрата':'прямоугольника')+', изображенного на клетчатой бумаге с размером клетки 1 см $\\times$ 1 см (см. рис.). Ответ дайте в квадратных сантиметрах.';
window.vopr.txt+='<canvas style="float:left;margin-right:1em;" width="480" height="480" id="ris'+slid+'" style="text-align:center"></canvas>';
window.vopr.ver=[p];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

