//57. Задание 4 № 320209
//Механические часы с двенадцатичасовым циферблатом в какой-то момент сломались и перестали идти.
//Найдите вероятность того, что часовая стрелка остановилась, достигнув отметки 10, но не дойдя до отметки 1.
retryWhileUndefined(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	var delenie1 = sluchch(1, 12);
	var delenie1_minute = sluchch(1, 12);
	var razn = sl(2,11);
	var razn_minute = slKrome(razn,1,12);
	var delenie2=(delenie1+razn)%13+1;
	var delenie2_minute=(delenie1_minute+razn_minute)%13+1;
	
	var answ = ((razn / 12) * (razn_minute / 12));
	if (!(answ * 1000).isZ())
		return;
	NAtask.setTask({

		text: 'Механические часы с двенадцатичасовым циферблатом в какой-то момент сломались и перестали идти. ' +
			'Найдите вероятность того, что часовая стрелка остановилась, достигнув отметки ' + delenie1 +
			', но не дойдя до отметки ' + delenie2 + ', ' +
			'а минутная стрелка остановилась, достигнув отметки ' + delenie1_minute + ', но не дойдя до отметки ' +
			delenie2_minute + '.',

		answers: answ.ts(),
	});
	return true;
}, 100000);
