(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '1931122';
		let preferenceQuestion = ['nextTrain', 'shortestJourney'];
		let preferenceRoute = ['tver', 'kaluga', 'petushki', 'serpukhov', 'alexandrov', 'tula', 'dubna', 'borodino', 'ryazan'];
		let shortestJourney = getSelectedPreferenceFromList(key, preferenceQuestion) === 1;
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
		let durations = Array.from({length: 21}, (_, i) => 120 + 5 * i).iz(5);
		let through = [true, !!sl1(), !!sl1(), true, true];
		let numbers = departures.map((_, i) => i + 1);
		let passenger = departures[sl(0, 3)] + sl(0, 12);
		let suitable = departures.map((_, i) => i).filter(i => through[i] && (shortestJourney || departures[i] >= passenger));
		genAssertNonempty(suitable);
		let selected = suitable.slice().sort((a, b) => shortestJourney ? durations[a] - durations[b] : departures[a] - departures[b])[0];
		let table = [
		    ['Станция / поезд'].concat(numbers).tr('th'),
		    [stations[0]].concat(departures.map(time => time.toDvoet())).tr(),
		    [stations[1]].concat(departures.map(time => (time + sl(50, 80)).toDvoet())).tr(),
		    [stations[2]].concat(departures.map((time, i) => through[i] ? ((time + durations[i]) % 1440).toDvoet() : '—')).tr(),
		].join('').toTable();
		NAtask.setTask({
		    text: 'В таблице показано расписание пригородных электропоездов по направлению ' + stations.join(' — ') + '. Электропоездам присвоены условные номера. ' + table +
		        ' Прочерк означает, что поезд не доезжает до конечной станции. Время отправления и прибытия московское.' +
		        (shortestJourney ? ' Какой из поездов до конечной станции проводит в пути меньше всего времени?' :
		            ' Пассажир пришёл на начальную станцию в ' + passenger.toDvoet() +
		            ' и хочет доехать до конечной станции без пересадок. Укажите ближайший подходящий поезд (можно сесть и в момент отправления).') +
		        ' В ответе укажите номер электропоезда.',
		    answers: numbers[selected],
		    preference: [preferenceQuestion, preferenceRoute],
		});
	}, 1000);
})();
// 1D7772, 599C62, 696037, 6E7E4D, 90832B, A157EC, F74C4F, 9D7C69, DE1571, 92D54F, A8535E, D13E8E, B0946D, 8D89AB, B6A3F1
