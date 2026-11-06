(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '1931122';
		let preferenceQuestion = ['nextTrain', 'shortestJourney'];
		let preferenceRoute = ['tver', 'kaluga', 'petushki', 'serpukhov', 'alexandrov', 'tula', 'dubna', 'borodino', 'ryazan'];
		let question = getSelectedPreferenceFromList(key, preferenceQuestion);
		let route = getSelectedPreferenceFromList(key, preferenceRoute);
		let routes = [
		    ['Москва Октябрьская', 'Клин', 'Тверь'], ['Москва Киевская', 'Малоярославец', 'Калуга'],
		    ['Москва Курская', 'Крутое', 'Петушки'], ['Москва Курская', 'Чехов', 'Серпухов'],
		    ['Москва Ярославская', 'Сергиев Посад', 'Александров'], ['Москва Курская', 'Серпухов', 'Тула'],
		    ['Москва Савёловская', 'Дмитров', 'Большая Волга'], ['Москва Смоленская', 'Можайск', 'Бородино'],
		    ['Москва Казанская', 'Голутвин', 'Рязань'],
		];
		let stations = routes[route];
		let first = sl(15 * 60, 18 * 60);
		let departures = Array.from({length: 5}, (_, i) => first + 25 * i + sl(0, 10));
		let durations = Array.from({length: 5}, () => sl(120, 220, 5));
		genAssert(!durations.hasDubl(), 'Время в пути должно различаться');
		let through = [true, !!sl1(), !!sl1(), true, true];
		let numbers = Array.from({length: 5}, () => sl(6000, 6998, 2));
		genAssert(!numbers.hasDubl(), 'Номера поездов должны различаться');
		let passenger = departures[sl(0, 3)] + sl(0, 12);
		let suitable = departures.map((_, i) => i).filter(i => through[i] && (question || departures[i] >= passenger));
		genAssertNonempty(suitable);
		let selected = suitable.slice().sort((a, b) => question ? durations[a] - durations[b] : departures[a] - departures[b])[0];
		let table = [
		    ['Станция / поезд'].concat(numbers).tr('th'),
		    [stations[0]].concat(departures.map(time => time.toDvoet())).tr(),
		    [stations[1]].concat(departures.map(time => (time + sl(50, 80)).toDvoet())).tr(),
		    [stations[2]].concat(departures.map((time, i) => through[i] ? ((time + durations[i]) % 1440).toDvoet() : '—')).tr(),
		].join('').toTable();
		NAtask.setTask({
		    text: 'В таблице показано расписание пригородных электропоездов по направлению ' + stations.join(' — ') + '.' + table +
		        'Прочерк означает, что поезд не доезжает до конечной станции. Время отправления и прибытия московское.' +
		        (question ? ' Какой из поездов до конечной станции проводит в пути меньше всего времени?' :
		            ' Пассажир пришёл на начальную станцию в ' + passenger.toDvoet() +
		            ' и хочет доехать до конечной станции без пересадок. Укажите ближайший подходящий поезд (можно сесть и в момент отправления).') +
		        ' В ответе укажите номер электропоезда.',
		    answers: numbers[selected],
		    preference: [preferenceQuestion, preferenceRoute],
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.51: 1D7772
// 3.52: 599C62
// 3.53: 696037
// 3.54: 6E7E4D
// 3.55: 90832B
// 3.57: A157EC
// 3.58: F74C4F, 9D7C69
// 3.59: DE1571, 92D54F
// 3.60: A8535E, D13E8E
// 3.61: B0946D
// 3.62: 8D89AB
// 3.63: B6A3F1
