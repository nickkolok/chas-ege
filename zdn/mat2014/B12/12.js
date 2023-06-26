(function() {
	NAinfo.requireApiVersion(0, 2);
	var TIME = sluchch(3, 99);
	var remain = sluchch(10,99);
	var time_izm = [['секундах', 'сек', 'секунд'],['минутах', 'мин', 'минут'],['часах', 'ч', 'часов']].iz();
	var g_mg = ['г', 'мг'].iz();
	var step = sluchch(1,5);
	var m_null = remain * Math.pow(2, step);
	var time = TIME * step;
	
	NAtask.setTask({
		text: 'В ходе распада радиоактивного изотопа его масса уменьшается по закону ' + '$m(t) = m_02^{-t/T}$' +
			', где ' + '$m_0$' + ' — начальная масса изотопа, ' + '$t$' + ' (' + time_izm[1] + ') — прошедшее от начального момента время, ' + '$T$' +
			' — период полураспада в ' + time_izm[0] + '. В ' + ['лаборатории', 'результате опыта', 'результате эксперимента'].iz() +
			' получили вещество, содержащее в начальный момент времени ' + '$m (t) =' + ' ' + m_null + '$ ' + g_mg + ' изотопа $Z$' +
			', период полураспада которого ' + '$T =' + ' ' + TIME + '$ ' + time_izm[1] + '. В течение скольких ' + time_izm[2] + ' масса изотопа будет ' +
			['не меньше', 'больше'].iz() + ' $'+ remain +'$ ' + g_mg + '?',
		answers: time,
	});
    
})();
//https://matematikalegko.ru/prikladnie/v-hode-raspada-radiaktivnogo-izotopa.html
//Aisse-258
