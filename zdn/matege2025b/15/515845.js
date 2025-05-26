(function() {
	let statisticForSummer = sluchch(0.39, 0.98, 0.01);
	let answer = (1 - statisticForSummer) * 100;
	let time = ['летом', 'зимой'];
	let difference = ['уменьшилось', 'увеличилось'];
	let slTime1 = sl1();
	let slTime2 = (slTime1 + 1) % 2;
	NAtask.setTask({
		text: ['Число', 'Количество'].iz() + ' дорожно-транспортных происшествий (ДТП) в летний период составило ' + parseFloat((statisticForSummer).toFixed(2)) +
			' числа ДТП в  зимний период. На сколько процентов ' + difference[slTime1] +
			' число дорожно-транспортных происшествий ' + time[slTime1] + [' по сравнению ', ' в сравнении '].iz() + 'с ' +
			time[slTime2] + ' ?',
		answers: answer,
	});
})();

//515845
