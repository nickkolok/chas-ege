(function() {
	NAinfo.requireApiVersion(0, 2);

	let b = sluchch(3, 25);
	let a = sluchch(500000, 1500000, 100000);

	if (a < 1000000) {
		n = 3;
	} else {
		b = sluchch(10, 20, 10);
		n = sluchch(4, 5);
	}

	let с = 1 + b / 100;
	let progression = new GeometricProgression(a, с);
	var arr = ['Печенов', 'Оладьев', 'Коржов', 'Плюшкин', 'Прянников', 'Баранкин', 'Бубликов', 'Батонов', 'Ватрушкин',
		'Булкин'
	].iz();

	NAtask.setTask({
		text: 'Бизнесмен ' + arr + ' получил в 2000 году прибыль в размере ' + chislitlx(a, 'рубль') +
			'. Каждый следующий год его прибыль увеличивалась на ' + b +
			'% по сравнению с предыдущим годом. Сколько рублей заработал ' + arr + ' за 200' + (n - 1) + ' год?',
		answers: progression.member(n),
		authors: ['Сергей Алендарь', 'Александра Суматохина'],
	});
})();
