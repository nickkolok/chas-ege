(function(){'use strict';

// Чтобы не было бесконечных дробей в ответе
do {
    var students = sluchch(10, 50);
    var percent = sluchch(20, 65, 15);
} while (students * 100 % percent != 0);

var school = sklonlxkand(['школа', 'лицей', 'гимназия'].iz());
var vuz = ['военных', 'специальных', 'частных'].iz();

window.vopr.txt = chislitlx(students,'выпускник') +' '+ school.re +' собираются учиться в '+ vuz +' вузах. ' +
	'Они составляют '+ percent +'% от числа выпускников. Сколько в '+ school.pe +' выпускников?';

window.vopr.ver = [(students / percent * 100).ts()];
})();
//Обзад 77341
//ProgerFF
