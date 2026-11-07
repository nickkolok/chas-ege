(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '14910968';
	let preference = ['differentMasses', 'differentVolumes', 'equalAmounts', 'addWater'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let first = sl(2, 12);
	let second = slKrome(first, 2, 12);
	let percent1, percent2, condition;
	if (variant === 2) {
		second = first;
		percent1 = sl(5, 35);
		percent2 = percent1 + 2 * sl(1, 15);
		condition = 'Смешали некоторое количество $' + percent1 + '$%-го раствора вещества с таким же количеством $' +
			percent2 + '$%-го раствора этого же вещества.';
	} else if (variant === 3) {
		let step = (first + second) / first.nod(second);
		percent1 = step * sl(1, Math.floor(65 / step));
		percent2 = 0;
		condition = 'К ' + chislitlx(first, 'килограмм', 'd$') + ' $' + percent1 +
			'$%-го водного раствора вещества добавили ' + chislitlx(second, 'килограмм', 'v$') + ' воды.';
	} else {
		let total = first + second;
		let low = sl(5, 30);
		let high = low + total * sl(1, Math.floor((75 - low) / total));
		[percent1, percent2] = [low, high].shuffle();
		let unit = variant === 0 ? 'килограмм' : 'литр';
		condition = 'Смешали ' + chislitlx(first, unit, 'v$') + ' $' + percent1 + '$%-го раствора вещества и ' +
			chislitlx(second, unit, 'v$') + ' $' + percent2 + '$%-го раствора этого же вещества.';
		if (variant === 1) {
			condition += ' Концентрации указаны по объёму, объёмы при смешивании складываются.';
		}
	}
	let answer = (first * percent1 + second * percent2) / (first + second);
	NAtask.setTask({
		text: condition + ' Сколько процентов составляет концентрация получившегося раствора?',
		answers: answer,
		analys: 'Количество растворённого вещества при смешивании сохраняется. ' +
			'Процентная концентрация смеси равна $\\frac{' + first + '\\cdot' + percent1 + '+' +
			second + '\\cdot' + percent2 + '}{' + first + '+' + second + '}=' + answer + '$.',
		preference,
	});
})();
// E385F8, 63D20A, B5802E, B9D0D6, FF32C9, 1B1D9A, 9B09EC, 275D6A, 36F882, D8A2E9, F6AEFA, EBFEF9, 094108, B8BA7A, 9E0A9B, EA86ED, 48EE8E, 7EB880, A0EE0C, C12291, 5EF0F8, 040A4F, 4A00B8, B8B6B1, 50C315, E8F619, 3EE428, EF9BCE, FA60E2, 8B79EE
