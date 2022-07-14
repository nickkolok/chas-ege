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


var paint = function(ct) {
	var w=480;
	var h=480;
	ct.lineWidth=2;
	var s=20;
	ct.regularGrid(20,s);
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

// Создание задания через API тренажёра
chas2.task.setTask({
	text: 'Найдите площадь треугольника, изображенного на клетчатой бумаге с размером клетки 1 см $\\times$ 1 см (см. рис.).'+
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
