(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let students, percent;
	do {
		students = sl(10, 50);
		percent = sl(20, 65, 15);
	} while (students * 100 % percent !== 0);
	const school = sklonlxkand(['школа', 'лицей', 'гимназия'].iz());
	const universities = ['военных', 'специальных', 'частных'].iz();
	NAtask.setTask({
		text: chislitlx(students, 'выпускник') + ' ' + school.re + ' ' +
			chislit(students, 'собирается', 'собираются', 'собираются') + ' учиться в ' + universities +
			' вузах. Это составляет ' + percent + '% от числа выпускников. Сколько в ' + school.pe + ' выпускников?',
		answers: students * 100 / percent,
	});
	NAtask.modifiers.allDecimalsToStandard();
})();
// Обзад 77341
// ProgerFF
