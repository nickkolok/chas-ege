//РАБОТАЕТ
//32. Задание 4 № 320183
//Перед началом футбольного матча судья бросает монетку, чтобы определить,
//какая из команд начнёт игру с мячом. Команда «Физик» играет три матча
//с разными командами. Найдите вероятность того, что в этих играх
//«Физик» выиграет жребий ровно два раза.

(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	let key = "320183";

	const sport = ['футбольного', 'волейбольного', 'баскетбольного', 'хоккейного', 'теннисного', 'бейсбольного'].iz();
	const team_name = ['Физик', 'Химик', 'Сапфир', 'Труд', 'Геолог', 'Биолог', 'Квант', 'Изумруд', 'Рубин', 'Факел'].iz();
	const vopr = ['не '.esli(sl1()) + 'начнёт игру с мячом', ['выиграет', 'проиграет'].iz() + ' жребий'].iz();

	let n = sl(0, 3) + 2; // число сыгранных игр   0-2 игры 1-3 игры 2-4 игры 3-5 игр
	n = getListedPreference(key, [{
		preference: 'two_games',
		preferenceValue: 2,
	}, {
		preference: 'three_games',
		preferenceValue: 3,
	}, {
		preference: 'four_games',
		preferenceValue: 4,
	}, {
		preference: 'five_games',
		preferenceValue: 5,
	}], n);

	const games = ['два матча', 'три матча', 'четыре матча', 'пять матчей'][n - 2];
	let k = sl(1, n); // число выигранных жребиев

	k = getListedPreference(key, [{
		preference: 'equal',
		preferenceValue: k,
	}, {
		preference: 'more',
		preferenceValue: sl(1, n - 1),
	}, {
		preference: 'less',
		preferenceValue: sl(1, n - 1),
	}, {
		preference: 'moreOrEqual',
		preferenceValue: sl(1, n - 1),
	}, {
		preference: 'lesseOrEqual',
		preferenceValue: sl(1, n - 1),
	}], k);

	let equalMoreLess =
		getListedPreference(key, [{
			preference: 'equal',
			preferenceValue: 0,
		}, {
			preference: 'more',
			preferenceValue: 1,
		}, {
			preference: 'less',
			preferenceValue: 2,
		}, {
			preference: 'moreOrEqual',
			preferenceValue: 3,
		}, {
			preference: 'lesseOrEqual',
			preferenceValue: 4,
		}], (n === k) ? 0 : sl(4)); // ровно %количество побед% = 0, больше = 1, меньше = 2, не более = 3, не менее = 4

	const kolvoOptions = [
		['один раз', 'два раза', 'три раза', 'четыре раза', 'пять раз'],
		['одного раза', 'двух раз', 'трёх раз', 'четырёх раз', 'пяти раз'],
	];

	let kolvo = kolvoOptions[(equalMoreLess > 0) ? 1 : 0][k - 1];

	let answers = 0;
	switch (equalMoreLess) {
	case 0:
		answers = math.combinations(n, k) * (0.5).pow(n);
		kolvo = 'ровно ' + kolvo;
		break;
	case 1:
		for (let i = k + 1; i <= n; i++) {
			answers += math.combinations(n, i) * (0.5).pow(n);
		}
		kolvo = 'более ' + kolvo;
		break;
	case 2:
		for (let i = 0; i <= k - 1; i++) {
			answers += math.combinations(n, i) * (0.5).pow(n);
		}
		kolvo = 'менее ' + kolvo;
		break;
	case 3:
		for (let i = 0; i <= k; i++) {
			answers += math.combinations(n, i) * (0.5).pow(n);
		}
		kolvo = 'не более ' + kolvo;
		break;
	case 4:
		for (let i = k; i <= n; i++) {
			answers += math.combinations(n, i) * (0.5).pow(n);
		}
		kolvo = 'не менее ' + kolvo;
		break;
	}

	NAtask.setTask({
		text: `Перед началом ${sport} матча судья бросает монетку, чтобы определить, какая из команд начнёт игру с мячом. Команда «${team_name}» играет ${games} с разными командами. Найдите вероятность того, что в этих играх «${team_name}» ${vopr} ${kolvo}.`,
		answers
	});
})();
//Refactoring Александра Суматохина, помогала Диана Белова
