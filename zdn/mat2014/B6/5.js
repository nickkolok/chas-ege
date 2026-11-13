(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = window.nomer === 282855 ? '282855' : '5';
		let preference1 = ['first', 'last', 'otherPosition'];
		let preference2 = ['threeCountries', 'fourCountries', 'fourKnownCountries'];
		let preference3 = ['gymnastics', 'shotPut', 'otherSport'];
		let mode = getSelectedPreferenceFromList(key, preference1);
		let dataMode = getSelectedPreferenceFromList(key, preference2);
		let sport = getSelectedPreferenceFromList(key, preference3);
		let groups = dataMode ? 4 : 3;
		let total = sl(20, 125);
		let counts = [];
		for (let i = 0; i < groups - 1; i++) {
			counts.push(sl(2, Math.floor(total * 0.6)));
		}
		counts.push(total - counts.reduce((a, b) => a + b, 0));
		genAssert(counts[groups - 1] > 0);
		let selected = sl(0, groups - 1);
		genAssertZ1000(counts[selected] / total);
		let countries = om.strany.re.concat(['Финляндии', 'Дании', 'Швеции', 'Норвегии', 'Македонии', 'Хорватии', 'Великобритании', 'Франции', 'Италии', 'Греции', 'Болгарии', 'Румынии', 'Венгрии', 'Японии', 'Кореи', 'США', 'Испании', 'Португалии', 'Аргентины', 'Парагвая', 'Украины', 'Белоруссии']).iz(groups);
		let allKnown = dataMode === 2 || sport === 1;
		let text;
		let otherPosition = ['второй', 'третьей', 'предпоследней', sl(4, total) + '-й'].iz();
		if (sport === 1) {
			let descriptions = counts.map((n, i) => (i === groups - 1 ? n + ' —' : chislitlx(n, 'спортсмен')) + ' из ' + countries[i]);
			text = 'В соревнованиях по толканию ядра участвуют ' + descriptions.slice(0, -1).join(', ') + ' и ' + descriptions[groups - 1] +
				'. Порядок, в котором выступают спортсмены, определяется жребием. Найдите вероятность того, что спортсмен, выступающий ' +
				['первым', 'последним', 'вторым'][mode] + ', окажется из ' + countries[selected] + '.';
		} else {
			let descriptions = counts.slice(0, allKnown ? groups : groups - 1).map((n, i) => n + ' из ' + countries[i]);
			text = 'В чемпионате по ' + (sport === 0 ? 'гимнастике' : om.sport.pe.iz()) + ' участвуют ' +
				(allKnown ? 'спортсменки: ' : chislitlx(total, 'спортсменка') + ': ') + descriptions.join(', ') +
				(allKnown ? '' : ', остальные — из ' + countries[groups - 1]) + '. Порядок, в котором выступают ' +
				(sport === 0 ? 'гимнастки' : 'спортсменки') + ', определяется жребием. Найдите вероятность того, что спортсменка, выступающая ' +
				['первой', 'последней', otherPosition][mode] + ', окажется из ' + countries[selected] + '.';
		}
		NAtask.setTask({text, answers: counts[selected] / total, preference: [preference1, preference2, preference3]});
	}, 20000);
})();
// ФИПИ: 40E9C7, 50193E, 9AF104, A7A6A7, 18F6C2, 742B4C, BD4642, DDB2F7, D00C0E, 6B1B7F, 4EF1B4, 0D51BD, D2F122, 0F0DDF, 12AEAF, D598A5, 9820C4, 74BD9F, 1E739C, D0119A, 507994, CAFAEC, 664767, 8BA560, 9E5C82, 6510B1, D5BB23, 413FDD
