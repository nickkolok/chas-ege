(function () {
	'use strict';

	NAinfo.requireApiVersion(0, 2);
	const preference = ['find_mass_difference', 'find_total_mass'];
	const findDifference = getSelectedPreferenceFromList('10536196', preference) === 0;

	const firstParts = sl(1, 4);
	const secondParts = findDifference ? sl(firstParts + 1, 7) : sl(1, 7);
	const partMass = sl(5, 15);
	const firstMass = firstParts * partMass;
	const secondMass = secondParts * partMass;

	const percentMixture = sl(30, 55);
	const step = sl(1, 4);
	const direction = findDifference ? -1 : 1;
	const percentFirst = percentMixture + direction * secondParts * step;
	const percentSecond = percentMixture - direction * firstParts * step;
	const metal = sklonlxkand(['никель', 'медь', 'олово', 'серебро', 'золото'].iz()).re;

	const question = findDifference
		? 'На сколько килограммов масса первого сплава меньше массы второго?'
		: 'Найдите массу третьего сплава. Ответ дайте в килограммах.';
	const answer = findDifference ? secondMass - firstMass : firstMass + secondMass;
	const relation = findDifference ? '-' : '+';

	NAtask.setTask({
		text: 'Имеется два сплава. Первый сплав содержит $' + percentFirst + '$ % ' + metal +
			', второй — $' + percentSecond + '$ % ' + metal + '. Из них получили третий сплав, содержащий $' +
			percentMixture + '$ % ' + metal + '. Масса первого сплава равна $' + firstMass + '$ кг. ' + question,
		answers: answer,
		analys: 'Пусть $x$ — масса второго сплава в килограммах. По количеству ' + metal + ' получаем уравнение $' +
			percentFirst + '\\cdot' + firstMass + '+' + percentSecond + 'x=' + percentMixture +
			'(' + firstMass + '+x)$. Отсюда $x=' + secondMass + '$. Ответ равен $' +
			secondMass + relation + firstMass + '=' + answer + '$ кг.',
		preference: preference,
	});
})();
// A0C504, AD1151, 0718AC, 2FD968, C50739, 90EE3A, BB2F87, F12249, 4EC409, 718685, 90194A, 040178, 83A97A, 0CC5B2, 1277BD, 5BE1CD, 4A1A9D, E0889B, E5F09D, 358F96
