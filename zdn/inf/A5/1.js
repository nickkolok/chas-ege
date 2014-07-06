(function(){'use strict';
/**Для составления цепочек/слов/бус/чисел разрешается использовать бусины k типов, обозначаемых буквами*/
var myalg = genAlg();
window.vopr.txt=algInText(myalg)+'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа
window.vopr.nev=[];
window.vopr.ver=[genWordForAlg(myalg)];
for (var i=0; i<3; i++) {
	var t = '';
	do { 
		t = genWrongWordForAlg(myalg);
	} while (window.vopr.nev.hasElem(t));
	window.vopr.nev.push(t);
}
	
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
