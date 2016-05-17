(function() {
	'use strict';
	var znam = [1, 2, 3, 4, 5, 6, 9, 12, 15, 18, 20].iz();
	var chis = sl(znam == 1 ? 0 : 1, znam).pm();

	chas2.task.setTask({
		text: 'Переведите $' + chis.pina(znam) + '$ радиан в градусы.',
		answers: [(180 * chis / znam).ts()],
	});
})();
//http://matematikalegko.ru/priyomy/radiany-v-gradusy-gradusy-v-radiany.html
