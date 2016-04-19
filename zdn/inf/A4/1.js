(function(){'use strict';
/**Определите, какое из указанных имен файлов удовлетворяет маске*/
var mask = genMask();
window.vopr.txt='Для групповых операций с файлами используются маски имен файлов. Маска представляет собой последовательность букв, цифр и прочих допустимых в именах файлов символов, в которых также могут встречаться следующие символы: Символ «?» (вопросительный знак) означает ровно один произвольный символ. Символ «*» (звездочка) означает любую последовательность символов произвольной длины, в том числе «*» может задавать и пустую последовательность. Определите, какое из указанных имен файлов удовлетворяет маске:'
	+'<br/>'+mask+'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа
window.vopr.nev=[];
for (var i=0; i<3; i++)
	window.vopr.nev.push(genWrongWordForMask(mask));
window.vopr.ver=[genWordForMask(mask)];
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
