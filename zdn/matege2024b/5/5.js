(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '5';
		let preference1 = ['first', 'last'];
		let preference2 = ['threeCountries', 'fourCountries'];
		let mode = getSelectedPreferenceFromList(key, preference1);
		let groups = getSelectedPreferenceFromList(key, preference2) + 3;
		let total = sl(20, 100);
		let counts = [];
		let remaining = total;
		for (let i = 0; i < groups - 1; i++) {
		    let count = sl(1, remaining - (groups - i - 1));
		    counts.push(count); remaining -= count;
		}
		counts.push(remaining);
		let selected = mode ? groups - 1 : sl(0, groups - 2);
		genAssertZ1000(counts[selected] / total);
		let countries = om.strany.re.iz(groups);
		let descriptions = counts.slice(0, -1).map((n, i) => n + ' из ' + countries[i]);
		NAtask.setTask({
		    text: 'В чемпионате по ' + om.sport.pe.iz() + ' участвуют ' + chislitlx(total, 'спортсменка') + ': ' + descriptions.join(', ') +
		        ', остальные — из ' + countries[groups - 1] + '. Порядок выступлений определяется жребием. ' +
		        'Найдите вероятность того, что спортсменка, выступающая ' + ['первой', 'последней', 'второй', 'третьей'].iz() +
		        ', окажется из ' + countries[selected] + '.',
		    answers: counts[selected] / total, preference: [preference1, preference2],
		});
	}, 20000);
})();
// На основе zdn/mat2014/B6/5.js.
// Сверка ФИПИ: все исходные коды соответствующих позиций.
// 5.18: 40E9C7
// 5.19: 50193E
// 5.20: 9AF104
// 5.21: A7A6A7
// 5.22: 18F6C2
// 5.34: 742B4C, 9820C4
// 5.35: BD4642, DDB2F7, D2F122, D598A5, 74BD9F
// 5.36: D00C0E, 8BA560, 6510B1, D5BB23, 413FDD
// 5.37: 6B1B7F, 664767
// 5.38: 4EF1B4
// 5.39: 0D51BD, 0F0DDF, CAFAEC
// 5.40: 12AEAF
// 5.41: 1E739C
// 5.42: D0119A, 507994
// 5.43: 9E5C82
