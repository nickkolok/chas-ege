//33. Задание 4 № 320184
//Игральный кубик бросают дважды. Сколько элементарных исходов
//опыта благоприятствуют событию «А = сумма очков равна 5»?

(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 0);

	var kolvo = sluchch(1, 12);
	var answers;

	if (kolvo <= 7)
		answers = kolvo - 1;
	else
		answers = 13 - kolvo;

	NAtask.setTask({

		text: 'Игральный кубик бросают дважды. Сколько элементарных исходов ' +
			'опыта благоприятствуют событию А = {сумма очков равна ' + kolvo + '}?',

		answers,

	});
})();
