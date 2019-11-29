(function(){
	"use strict";
	var a, b, c, d, e, f, g, h, u, x, p, answer, expression_text, p_text;

	/**
	   a * (u * p(b * x + c) - d * p(e * x + f))

	   p(x) = g * x - h
	*/

	a = slKrome(0, -5, 5);
	b = slKrome(0, -5, 5);
	c = slKrome(0, -5, 5);
	d = slKrome(0, -5, 5);
	e = slKrome(0, -5, 5);
	f = slKrome(0, -5, 5);
	g = slKrome(0, -5, 5);
	h = slKrome(0, -5, 5);
	u = slKrome(0, -5, 5);
	x = 0;

	while ( (b*u!=(e*d)) ){
		b = slKrome(0, -5, 5);
		e = slKrome(0, -5, 5);
		g = slKrome(0, -5, 5);
	}

	p = function(z) {
		return g * z + h;
	};

	answer = a * (u * p(b * x + c) - d * p(e * x + f));
	expression_text = "$" + a + "(" + u + "p(" + b + "x+" + c + ") " + '-' + d + "p(" + e + "x+" + f + "))$";
	p_text = "$p(x) = " + g + "x+" + h + "$";

	chas2.task.setTask({
		text: "Найдите значение выражения " + expression_text.plusminus() + ", если " + p_text.plusminus(),
		answers: answer,
	});
})();
//Обзад 26821
//by _zevs
//Исправление: Сергей Наумов, Игорь Пустовит
