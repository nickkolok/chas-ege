//Дано: a<2/8/10/16>, b<2/8/10/16>. Какое из чисел С, записанных в двоичной системе счисления, удовлетворяет неравенству a<C<b?
(function(){'use strict';
var systems = [8, 10, 16];
var m = systems.iz(); //система счисления числа a
systems.splice(systems.indexOf(m), 1);
var n = systems.iz(); //система счисления числа b

var a10 = sluchch(10,1000);
var b10 = sluchch(a10+2,a10+10);//обычно разница между a и b достаточно мала
var c10 = sluchch(a10+1,b10-1);

var a = intoAnotherSystem(a10,10,m);
var b = intoAnotherSystem(b10,10,n);
var C = intoAnotherSystem(c10,10,2);

window.vopr.txt='Дано: a='+a+'<sub>'+m+'</sub>, b='+b+'<sub>'+n+'</sub>. Какое из чисел С, записанных в двоичной системе счисления, удовлетворяет неравенству a &lt; C &lt; b?'+
	'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа
window.vopr.ver=[
	C,
];
var wrongAnswers = [];
for (var i = 0; i < 2; i++) {
	var x = sluchch(10,a);
	var y = intoAnotherSystem(x,10,2);
	wrongAnswers[i]=y;
}
for (var i = 2; i < 4; i++) {
	x = sluchch(b,1000);
	y = intoAnotherSystem(x,10,2);
	wrongAnswers[i]=y;
}
window.vopr.nev=wrongAnswers;
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
