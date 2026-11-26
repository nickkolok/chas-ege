(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510715';
		let preference = ['3digit', '4digit', '5digit'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let preferenceBound = ['between', 'above', 'below'];
		let bound = getSelectedPreferenceFromList(key, preferenceBound);

		let d = [3, 4, 5][rand];
		let start = Math.pow(10, d - 1);
		let end = Math.pow(10, d) - 1;

		let allValidForD = [];
		for (let n = start; n <= end; n++) {
			let s = String(n);
			if (s.includes('0')) continue;
			let seen = {};
			let unique = true;
			for (let c of s) {
				if (seen[c]) {
					unique = false;
					break;
				}
				seen[c] = true;
			}
			if (!unique) continue;
			let divisible = true;
			for (let c of s) {
				if (n % parseInt(c) !== 0) {
					divisible = false;
					break;
				}
			}
			if (divisible) {
				allValidForD.push(n);
			}
		}

		genAssert(allValidForD.length > 0, 'Не найдено подходящих чисел для d=' + d);

		let A = allValidForD.iz();

		let lowerOffset = sl(50, 150);
		let upperOffset = sl(50, 150);

		let moreThan = Math.max(start, A - lowerOffset);
		let lessThan = Math.min(end, A + upperOffset);

		let validAnswers = [];
		for (let v of allValidForD) {
			if ((bound === 2 || v > moreThan) && (bound === 1 || v < lessThan)) {
				validAnswers.push(v);
			}
		}
		genAssertNonempty(validAnswers);
		let size = ['трёхзначное', 'четырёхзначное', 'пятизначное'][rand];
		let textStart = [
			'Найдите натуральное число, большее $' + moreThan + '$, но меньшее $' + lessThan + '$',
			'Найдите ' + size + ' натуральное число, большее $' + moreThan + '$',
			'Найдите ' + size + ' натуральное число, меньшее $' + lessThan + '$',
		][bound];
		NAtask.setTask({
			text: textStart + ', ' +
				'которое делится на каждую свою цифру и все цифры которого различны и не равны нулю. ' +
				'В ответе укажите какое-нибудь одно такое число.',
			answers: validAnswers,
			preference: [preference, preferenceBound],
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=510715
//zer00player
// A2E542, 1DF008, A8F2D4, 58FFA0
