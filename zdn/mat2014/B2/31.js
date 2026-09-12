(function(){'use strict';
NAinfo.requireApiVersion(0, 0);


// Чтобы не было бесконечных дробей в ответе
	do {
		var students = sluchch(10, 50);
		var percent = sluchch(20, 65, 15);
	}
	while (students * 100 % percent != 0);

	var school = sklonlxkand(['школа', 'лицей', 'гимназия'].iz());
	var vuz = ['военных', 'специальных', 'частных'].iz();

NAtask.setTask({

	text: chislitlx(students,'выпускник') +' '+ school.re +' собираются учиться в '+ vuz +' вузах. ' +
	'Они составляют '+ percent +'% от числа выпускников. Сколько в '+ school.pe +' выпускников?',

	answers: (students / percent * 100).ts(),

});
})();
//Обзад 77341
//ProgerFF
