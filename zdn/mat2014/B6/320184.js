//33. Задание 4 № 320184
//Игральный кубик бросают дважды. Сколько элементарных исходов
//опыта благоприятствуют событию «А = сумма очков равна 5»?

(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 0);

	let times = ['дважды', 'трижды'].iz();
	let kolvo;
	let answers;

	switch (times) {
		case 'дважды':
			kolvo = sluchch(2, 12);
			answers = kolvo <= 7 ? kolvo - 1 : 13 - kolvo;
			break;
		case 'трижды':
			kolvo = sluchch(3, 18);
			switch (true) {
				case kolvo <= 7:
					answers = kolvo - 1;
					break;
				case kolvo <= 13:
					answers = 13 - kolvo;
					break;
				default:
					answers = 19 - kolvo;
					break;
			}
			break;
	}

	NAtask.setTask({
		text: `Игральный кубик бросают ${times}. Сколько элементарных исходов опыта благоприятствуют событию А = {сумма очков равна ${kolvo}}?`,
		answers,
	});
})();
