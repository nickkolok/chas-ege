(function() {
	let statisticForSummer = sluchch(0.38, 0.98, 0.01);
	let answer = (1 - statisticForSummer) * 100;
	let time = ['летом', 'зимой'];
	let difference = ['уменьшилось ', 'увеличилось '];
	let slTime1 = sl1();
	let slTime2 = 1 - slTime1;
	let quantity = ['число', 'количество'].iz();
	let events = [' дорожно-транспортных происшествий (ДТП) ', ' переломов ', ' повреждений кровли ', ' заболевших ', ' отключений электроэнергии ',
			' повреждений заборов ', ' повреждений линий электропередач ', ' покупок витамин', ' покупок лекарств',  ' покупок лопат'].iz();
	NAtask.setTask({
		text: quantity.toZagl() + events +'в летний период составило ' + statisticForSummer.ts() +
			' от числа в  зимний период. На сколько процентов ' + difference[slTime1] +
			quantity + events + time[slTime1] + [' по сравнению ', ' в сравнении '].iz() +
			'с ' + time[slTime2] + ' ?',
		answers: answer,
	});
})();

//515845

