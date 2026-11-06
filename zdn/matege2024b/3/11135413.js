(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '11135413';
		let preference = ['bronze', 'silver', 'total'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let countries = ['Россия', 'Норвегия', 'Канада', 'США', 'Германия', 'Швеция', 'Франция', 'Австрия'];
		let gold = Array.from({length: countries.length}, (_, i) => 25 - 3 * i + sl(0, 1));
		let silver = countries.map(() => sl(1, 20));
		let bronze = countries.map(() => sl(1, 20));
		let rank = sl(1, countries.length);
		let rows = [['Страна', 'Золото', 'Серебро', 'Бронза'].tr('th')];
		rows = rows.concat(countries.map((name, i) => [name, gold[i], silver[i], bronze[i]].tr()));
		NAtask.setTask({
		    text: 'В таблице показано распределение медалей на спортивных соревнованиях. Страны расположены по убыванию числа золотых медалей.' +
		        rows.join('').toTable() + ' Сколько ' + ['бронзовых медалей', 'серебряных медалей', 'всего медалей'][variant] +
		        ' у страны, занявшей ' + rank + '-е место по числу золотых медалей?',
		    answers: [bronze[rank - 1], silver[rank - 1], gold[rank - 1] + silver[rank - 1] + bronze[rank - 1]][variant],
		    preference,
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.64: A9E9B5
// 3.65: 201682
// 3.66: 8D4A78
