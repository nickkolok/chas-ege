//Как представлено число y<2/8/10/16> в <2/8/10/16>ной системе счисления?
(function(){'use strict';
var systems = [2, 8, 10, 16];
var m = systems.iz(); //исходная система счисления
systems.splice(systems.indexOf(m), 1);
var n = systems.iz(); //конечная система счисления
var x = sluchch(10,1000);
var y = intoAnotherSystem(x,10,m);
var answer = intoAnotherSystem(x,10,n);

window.vopr.txt='Как представлено число '+y+'<sub>'+m+'</sub> в '+n+'-ной системе счисления?'
	+'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа
window.vopr.ver=[
  	answer,
];
var wrongAnswers = [];
for (var i = 0; i < 3; i++) {
	x = sluchch(10,1000);
	y = intoAnotherSystem(x,10,n);
	wrongAnswers[i]=y;
}
window.vopr.nev=wrongAnswers;
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Посмотреть, как работает шаблон, можно на страничке sh/otladka.html, скопировав весь текст отсюда, вставив его туда и нажав кнопку "Составить задание" под полем ввода.
//Настоятельно рекомендуется подписать, из какого источника взято задание. Например, Обзад ХХХХХ, или URL
//Николай Авдеев
//http://pastebin.com/gmDHW3qm
