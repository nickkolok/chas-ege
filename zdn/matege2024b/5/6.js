(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '6';
		let preference1 = ['first_day', 'last_day'];
		let preference2 = ['conference', 'contest'];
		let target = getSelectedPreferenceFromList(key, preference1);
		let context = getSelectedPreferenceFromList(key, preference2);
		let days = sl(3, 6);
		let earlyDays = sl(1, days - 2);
		let early = sl(1, 40);
		let later = sl(1, 40);
		let total = earlyDays * early + (days - earlyDays) * later;
		let answer = (target ? later : early) / total;
		genAssertZ1000(answer);
		NAtask.setTask({
		    text: ['Научная конференция', 'Конкурс исполнителей'][context] + ' проводится ' + chislitlx(days, 'день') +
		        '. Всего запланировано ' + chislitlx(total, 'выступление') + '. В ' +
		        (earlyDays === 1 ? 'первый день — ' : 'первые ' + earlyDays + ' дня — по ') + chislitlx(early, 'выступление') +
		        ', остальные распределены поровну между оставшимися днями. Порядок выступлений определяется жеребьёвкой. ' +
		        'Какова вероятность того, что выступление участника Н. состоится в ' + (target ? 'последний' : 'первый') + ' день?',
		    answers: answer, preference: [preference1, preference2],
		});
	}, 20000);
})();
// На основе zdn/mat2014/B6/6.js.
// Сверка ФИПИ: все исходные коды соответствующих позиций.
// 5.49: 452E1F, 0D6E8F, 4465E7, 0ECCC1, 2989CE
// 5.50: 93A088
// 5.86: C7DCB3
// 5.87: 6E23DD, CCBCCB
// 5.88: 1155EB
// 5.89: 3EE7EA
// 5.90: BD0EED, 3B77EE
// 5.120: 2A1BBF
