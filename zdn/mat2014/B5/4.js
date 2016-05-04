(function() {

var A={};
var B={};
var C={};
var D={};
var p=0;
var d=[];
var g='';
// TODO: переделать этот ужас!!!
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


var paint = function(ct) {
	var w=480;
	var h=480;
	ct.lineWidth=2;
	var s=20;
	ct.setka(20,s);
	ct.lineWidth=4;
	ct.lineJoin='round';
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

// Создание задания через API тренажёра
chas2.task.setTask({
	text: 'Найдите площадь '+g.re+' на клетчатой бумаге с размером клетки 1 см $\\times$ 1 см (см. рис.).'+
		' Ответ дайте в квадратных сантиметрах.',
	answers: p, // Правильный ответ
});

// Здесь добавляется рисунок с canvas
chas2.task.modifiers.addCanvasIllustration({
	width: 420,
	height: 420,
	paint: paint,
});

})();
