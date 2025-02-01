(function(){'use strict';

var a=sluchch(2,10);
var b=[2,4,5,8,10].iz().pm();
var c = NLsets.alphabets.english.getRandomItems(3);
var d=sl1();
var f=a/b;
var g;

var paint = function(ct) {
	var w=480;
	var h=480;
	ct.translate(w/2,h/2);
	ct.lineWidth=2;
	var s=20;
	ct.regularGrid(20,s);
	ct.lineWidth=5;
	ct.drawLine(0,0,Math.abs(b)*s,0);
	ct.drawLine(0,0,b*s,a*s);
	ct.font = 'italic bold 24px sans-serif';
	ct.textBaseline = 'top';
	ct.fillStyle='#00f';
	ct.fillText(c[1],3,3);
	ct.fillText(c[0],Math.abs(b)*s,0);
	ct.fillText(c[2],b*s,a*s);
};


// Создание задания через API тренажёра
chas2.task.setTask({
	text: 'Найдите тангенс угла $'+c.soed()+'$.',
	answers: f, // Правильный ответ
	tags: {tri: 1,},
});

// Здесь добавляется рисунок с canvas
chas2.task.modifiers.addCanvasIllustration({
	width: 480,
	height: 480,
	paint: paint,
});

})();
