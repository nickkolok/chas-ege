//28. Задание 4 № 320178
//На клавиатуре телефона 10 цифр, от 0 до 9.
//Какова вероятность того, что случайно нажатая цифра будет чётной/нечетной( или от 1 до 9)(и больше/меньше)  ?

(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	var device = ['калькулятора', 'смартфона', 'POS-терминала', 'вычислительного устройства', 'банкомата', 'телефонa', 'домофонa', 'сейфa'].iz();
	var vopros = ['будет', 'будет больше', 'будет меньше'].iz();
	var chet = ['чётной', 'нечётной'].iz();
	var chislo1 = sluchch(0, 9);
	var chislo2;
	var naiti;
	var dopoln;
	var answers;
	var kolvochet = 0;
	var i;
	
	if (vopros == 'будет') {
		naiti = [chet, chislo1].iz();
		
		if (naiti == chet) {
			dopoln = [' и больше ', ' и меньше ', ''].iz();
			
			switch (dopoln) {
			case '':
				chislo2 = '';
				answers = 0.5;
				break;
				
			case ' и больше ':
				
				chislo2 = sluchch(1, 5);
				for (i = chislo2 + 1; i <= 9; i++)
					if (i % 2 === 0) {
						kolvochet++;
					}
				if (chet == 'чётной') {
					answers = kolvochet / 10;
				} else {
					answers = (9 - chislo2 - kolvochet) / 10;
				}
				break;
				
			case ' и меньше ':
				
				chislo2 = sluchch(3, 8);
				for (i = 0; i < chislo2; i++)
					if (i % 2 === 0) kolvochet++;

				if (chet == 'чётной') {
					answers = kolvochet / 10;
				} else {
					answers = (chislo2 - kolvochet) / 10;
				}
				break;
			}
		} else {
			dopoln = '';
			chislo2 = '';
			chislo1 = sluchch(0, 9);
			answers = 0.1;
		}
	} else {
		if (vopros == 'будет больше') {
			naiti = sluchch(1, 4);
			dopoln = [' и меньше ', ''].iz();
			if (dopoln === '') {
				chislo2 = '';
				answers = (9 - naiti) / 10;
			} else {
				chislo2 = sluchch(6, 8);
				answers = (chislo2 - naiti - 1) / 10;
			}
		} else {

			if (vopros == 'будет меньше') {
				naiti = sluchch(4, 8);
				dopoln = '';
				chislo2 = '';
				answers = naiti / 10;
			}
		}
	}
	NAtask.setTask({
		text: 'На клавиатуре ' + device + ' 10 цифр, от 0 до 9. ' + 'Какова вероятность того, что случайно нажатая цифра ' +
			vopros + ' ' + naiti + '' + dopoln + '' + chislo2 + '?',

		answers,

	});
})();

