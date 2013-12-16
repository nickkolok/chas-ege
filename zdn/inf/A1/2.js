//Сколько единиц/значащих нулей  в двоичной записи числа n?
(function(){'use strict';
var x = sluchch(10,1000);
var y = intoAnotherSystem(x,10,2);
var variants = ['единиц', 'значащих нулей'];
var usl = variants.iz();

if (usl == 'единиц')
	answer = String(y).split('1').length-1;
else 
 	answer = String(y).split('0').length-1;

window.vopr.txt='Сколько '+usl+' в двоичной записи числа '+x+'?'
	+'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа
window.vopr.ver=[
  	answer,
];
var wrongAnswers = [''];
for (var i = 0; i < 10; i++) {
	wrongAnswers[i]=i;
}
wrongAnswers.splice(wrongAnswers.indexOf(answer), 1);
window.vopr.nev=wrongAnswers;
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Посмотреть, как работает шаблон, можно на страничке sh/otladka.html, скопировав весь текст отсюда, вставив его туда и нажав кнопку "Составить задание" под полем ввода.
//Настоятельно рекомендуется подписать, из какого источника взято задание. Например, Обзад ХХХХХ, или URL
//Николай Авдеев
//http://pastebin.com/gmDHW3qm
