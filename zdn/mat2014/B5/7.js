(function(){'use strict';

var a=sluchch(1,3);
var b=sluchch(0,3);

do{
	var r=sluchch(1,11);
	r *= Math.sqrt([1,2,5,10].iz())
}while(r>=12);

// Get rif of dubious radii
if(r>8 || Math.round(r*r)==40){
	var r=sluchch(1,11);
}

var c=sluchch(0,(r/2).ceil());
var d=sluchch(c?0:1,(r/2).ceil());
var s=r*r*a/4;

var paint = function(ct) {
	var w=480;
	var h=480;
	ct.translate(w/2,h/2);
	ct.lineWidth=2;
	var s2=20;
	ct.setka(20,s2);
	ct.lineWidth=2.5;
	ct.lineJoin='round';
	ct.fillStyle='777'; // No idea what does it change
	var f=(d/c).atan();

	ct.beginPath();
		ct.arc(0, 0, r*s2, f, f-Math.PI/2*a, true);
		ct.lineTo(0,0);
	ct.closePath();
	ct.globalAlpha=0.5;
	ct.fill();
	ct.globalAlpha=1;
	ct.stroke();
	ct.beginPath();
		ct.arc(0, 0, r*s2, 0, 2*Math.PI, true);
	ct.closePath();
	ct.stroke();
};

// Создание задания через API тренажёра
chas2.task.setTask({
	text: [
		'Найдите (в см$^2$) площадь $S$ ' + [
				'закрашенного сектора, изображенного', 'закрашенной фигуры, изображенной'
			].iz() + ' на клетчатой бумаге с размером клетки '+
			'1 см $\\times$ 1 см (см. рис.). В ответе запишите $\\frac S\\pi$.',
		'На клетчатой бумаге с размером клетки $\\frac1{\\sqrt\\pi}$ см $\\times\\frac1{\\sqrt\\pi}$ см изображён круг. '+
			'Найдите площадь ' + ['закрашенного сектора', 'закрашенной фигуры'].iz() + '. '+
			'Ответ дайте в квадратных сантиметрах.',
	].iz(),
	answers: s, // Правильный ответ
});

// Здесь добавляется рисунок с canvas
chas2.task.modifiers.addCanvasIllustration({
	width: 480,
	height: 480,
	paint: paint,
});

})();
