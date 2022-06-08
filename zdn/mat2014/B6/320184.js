//33. Задание 4 № 320184
//Игральный кубик бросают дважды. Сколько элементарных исходов
//опыта благоприятствуют событию «А = сумма очков равна 5»?

(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	var answers;
	var times = ['дважды', 'трижды'].iz();

	if (times == 'дважды'){
		var kolvo = sluchch(2, 12);
		if (kolvo <= 7){
			answers = kolvo - 1;
		} else {
			answers = 13 - kolvo;
		}
	}

	if (times == 'трижды'){
		var kolvo = sluchch(3, 18);
		if (kolvo <= 7){
			var a = 1            
			var b = 1
			var c = 1
			answers = kolvo - 1;
		} else {
			if (kolvo <= 13){
				answers = 13 - kolvo;
			} else {
				if (kolvo <= 19){
					answers = 19 - kolvo;
				}
			}
		}
	}

	NAtask.setTask({

		text: 'Игральный кубик бросают ' + times + ' . Сколько элементарных исходов ' +
			'опыта благоприятствуют событию А = {сумма очков равна ' + kolvo + '}?',
		
		answers,

	});
})();
