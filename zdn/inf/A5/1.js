(function(){'use strict';
/**Для составления цепочек/слов/бус/чисел разрешается использовать бусины k типов, обозначаемых буквами*/
var myalg = genAlg();
window.vopr.text=algInText(myalg)+'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа
window.vopr.incorrectAnswers=[];
window.vopr.correctAnswers=[genWordForAlg(myalg)];
for (var i=0; i<3; i++) {
	var t = '';
	do {
		t = genWrongWordForAlg(myalg);
	} while (window.vopr.incorrectAnswers.hasElem(t));
	window.vopr.incorrectAnswers.push(t);
}

window.vopr.solution='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
