(function(){'use strict';

var Cube = makeStruct('lowAx lowAy lowBx lowBy lowCx lowCy height');
var bCube = new Cube(260, 200, 260, 300, 300, 200, -120);

bCube.lowAx = Math.floor((((Math.random(1)*10)+6.7))*10)+100;
bCube.lowBx = bCube.lowAx;
bCube.lowBy += Math.floor(Math.random()*7)*10;
bCube.lowCx = bCube.lowAx+Math.floor((Math.random(1)*10+11.3))*10;
bCube.lowAx += 50;
bCube.lowBx += 50;
bCube.lowCx += 50;
bCube.lowBy -= 40;

var tmp = 0.3-Math.random(1)+0.000001;
tmp /= Math.abs(tmp);
bCube.height+=((Math.floor(Math.random(1)*2.8)*20)*tmp/Math.abs(tmp));
bCube.height-=10;

var q_end = ' параллелепипеда, изображённого на рисунке';

var g=[	'Найдите площадь поверхности'+q_end,
		'Найдите площадь основания'+q_end,
		'Найдите объём'+q_end];

var q_id = getRandomInt(0,2);
var ab = getLen(bCube.lowAx, bCube.lowBx, bCube.lowAy, bCube.lowBy)/10;
var ac = getLen(bCube.lowAx, bCube.lowCx, bCube.lowAy, bCube.lowCy)/10;
var hh = Math.abs(bCube.height)/10;

console.log('Q_ID = '+q_id);

switch(q_id){
	case 0:
		var q_val = (ab*ac+ab*hh+ac*hh)*2;
	break;
	case 1:
		var q_val = ab*ac;
	break;
	case 2:
		var q_val = ab*ac*hh;
	break;
}

var actualDraw=function(ct){
	// В этой функции видны все переменные, объявленные выше.
	// Это называется "замыкание" и является наиболее покрываемым матюками местом JS

	// ct - это, вообще говоря, и есть объект, на котором рисуем
	// Вся романика тип getContext запрятана в движок
	ct.lineWidth=1;
	ct.fillStyle='#000000';
	ct.lineWidth = 2;
	/* A */ ct.fillKrug(bCube.lowAx, bCube.lowAy, 5);
	/* B */ ct.fillKrug(bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy, 5);
	/* C */ ct.fillKrug(bCube.lowCx, bCube.lowCy, 5);
	/* D */ ct.fillKrug(bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy, 5);

	/* A' */ct.fillKrug(bCube.lowAx, bCube.lowAy+bCube.height, 5);
	/* B' */ct.fillKrug(bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height, 5);
	/* C' */ct.fillKrug(bCube.lowCx, bCube.lowCy+bCube.height, 5);
	/* D' */ct.fillKrug(bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height, 5);

	/*  A-A' */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowAx, bCube.lowAy+bCube.height);
	/*  B-B' */ct.drawLine(bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy, bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);
	/*  C-C' */ct.drawLine(bCube.lowCx, bCube.lowCy, bCube.lowCx, bCube.lowCy+bCube.height);
	/*  D-D' */ct.drawLine(bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);

	/*  A-B  */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy);
	/*  A-C  */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowCx, bCube.lowCy);
	/*  C-D  */ct.drawLine(bCube.lowCx, bCube.lowCy, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy);
	/*  D-B  */ct.drawLine(bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy);

	/* A'-B' */ct.drawLine(bCube.lowAx, bCube.lowAy+bCube.height, bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);
	/* A'-C' */ct.drawLine(bCube.lowAx, bCube.lowAy+bCube.height, bCube.lowCx, bCube.lowCy+bCube.height);
	/* C'-D' */ct.drawLine(bCube.lowCx, bCube.lowCy+bCube.height, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);
	/* D'-B' */ct.drawLine(bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);

	ct.font = '12pt sans-serif';

	ct.fillText(Math.abs(bCube.lowAy-bCube.lowBy)/10,(bCube.lowAx+bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy))/2 -20, ((bCube.lowAy+bCube.lowBy)/2)+bCube.height-20);
	ct.fillText(Math.abs(bCube.lowAx-bCube.lowCx)/10, Math.abs(bCube.lowAx+Math.abs(bCube.lowAx-bCube.lowCx)/2), bCube.lowAy+bCube.height-5);
	ct.fillText(-bCube.height/10, bCube.lowCx+5, bCube.lowCy+(bCube.height/2));
	//Задание рамки
	ct.fillStyle='black';
	ct.drawLine(0,0,600,0);
	ct.drawLine(600,0,600,400);
	ct.drawLine(600,400,0,400);
	ct.drawLine(0,400,0,0);

	ct.fillKrug(0,0,10);
	ct.fillKrug(0,400,10);
	ct.fillKrug(600,400,10);
	ct.fillKrug(600,0,10);
};

// Создание задания через API тренажёра
chas2.task.setTask({
	text: g[q_id],  // Текст задания
	answers: q_val, // Правильный ответ
});

// Здесь добавляется рисунок с canvas
chas2.task.modifiers.addCanvasIllustration({
	width: 600,
	height: 400,
	paint: actualDraw,
});

})();
//by _zevs
