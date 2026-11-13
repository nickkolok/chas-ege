(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = window.nomer === 285923 ? '285923' : '6';
		let preference1 = ['first_day', 'last_day', 'third_day'];
		let preference2 = ['conference', 'contest'];
		let preference3 = ['fipi', 'extended'];
		let target = getSelectedPreferenceFromList(key, preference1);
		let context = getSelectedPreferenceFromList(key, preference2);
		let extended = getSelectedPreferenceFromList(key, preference3);
		let days = extended ? sl(3, 20) : (context ? sl(4, 5) : sl(3, 4));
		let earlyDays = extended ? sl(1, days - 2) : (context ? 1 : days - 2);
		let early = sl(1, 40);
		let later = sl(1, 40);
		let total = earlyDays * early + (days - earlyDays) * later;
		let specialLast = extended && sl1();
		let day = [1, days, 3][target];
		let special = specialLast ? day > days - earlyDays : day <= earlyDays;
		let answer = (special ? early : later) / total;
		genAssertZ1000(answer);
		let ordinal = ['первый', 'последний', 'третий'][target];
		let initial = ['Н', 'М', 'К', 'Ф'].iz();
		let withoutThat = sl1();
		let text;
		if (context && !extended) {
			text = 'Конкурс исполнителей проводится в ' + chislitlx(days, 'день') + '. Всего заявлено ' +
				chislitlx(total, 'выступление') + ' — по одному от каждой страны, участвующей в конкурсе. ' +
				'Исполнитель из России участвует в конкурсе. В первый день запланировано ' + chislitlx(early, 'выступление') +
				', остальные распределены поровну между оставшимися днями. Порядок выступлений определяется жеребьёвкой. ' +
				'Какова вероятность' + (withoutThat ? ', что' : ' того, что') + ' выступление исполнителя из России состоится в ' + ordinal + ' день конкурса?';
		} else if (!extended) {
			text = 'Научная конференция проводится в ' + chislitlx(days, 'день') + '. Всего запланировано ' + chislitlx(total, 'доклад') +
				': ' + (earlyDays === 1 ? 'в первый день — ' : 'первые два дня — по ') + chislitlx(early, 'доклад') +
				', остальные' + (sl1() ? ' доклады' : '') + ' распределены поровну между ' +
				(days === 3 ? 'вторым и третьим' : 'третьим и четвёртым') + ' днями. На конференции планируется доклад профессора ' +
				initial + '. Порядок докладов определяется случайным образом. Какова вероятность того, что доклад профессора ' +
				initial + '. окажется запланированным на ' + ordinal + ' день конференции?';
		} else {
			text = ['Научная конференция', 'Песенный конкурс'][context] + ' проводится в ' + chislitlx(days, 'день') +
				'. Всего запланировано ' + chislitlx(total, 'выступление') + ' — ' + (specialLast ? 'последние' : 'первые') +
				' ' + earlyDays + ' ' + chislit(earlyDays, 'день', 'дня', 'дней') + ' по ' + chislitlx(early, 'выступление') +
				', остальные распределены поровну между оставшимися днями. Порядок выступлений определяется жеребьёвкой. ' +
				'Какова вероятность, что выступление товарища ' + initial + '. окажется запланированным на ' + ordinal + ' день мероприятия?';
		}
		NAtask.setTask({text, answers: answer, preference: [preference1, preference2, preference3]});
	}, 20000);
})();
// ФИПИ: 452E1F, 0D6E8F, 4465E7, 93A088, 0ECCC1, 2989CE, C7DCB3, 6E23DD, CCBCCB, 1155EB, 3EE7EA, BD0EED, 3B77EE, 2A1BBF
