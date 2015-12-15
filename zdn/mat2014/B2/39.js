(function(){'use strict';

var KidsCount=sluchch(300,5000);
var JuniorCount=sluchch(15,70);
var LearningGer=sluchch(15,90);
var EduInst=sklonlxkand(['школа','интернат','лицей','гимназия'].iz());
var Pupil=sklonlxkand(['ученик','учащийся'].iz());
var Lang=['немецкий','французский','итальянский','английский','испанский'].iz();

window.vopr.txt='В '+EduInst.pe+' '+KidsCount+' '+Pupil.rm+', из них '+JuniorCount+'%  — '+Pupil.im+
	' начальной школы. Среди '+Pupil.rm+' средней и старшей'+
	' школы '+LearningGer+'% изучают '+Lang+' язык. Сколько '+Pupil.rm+' в '+EduInst.pe+' изучают'+
	' '+Lang+' язык, если в начальной школе '+Lang+' язык не изучается?';

window.vopr.ver=[(KidsCount*(1-JuniorCount/100)*LearningGer/100).ts()];

})();
//Обзад 77347
//nadraliev
