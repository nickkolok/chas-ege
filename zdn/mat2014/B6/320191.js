(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = window.nomer === 320191 ? '320191' : '320191';
		let preference1 = ['inAuditorium', 'notInAuditorium'];
		let preference2 = ['future', 'past', 'extended'];
		let outside = getSelectedPreferenceFromList(key, preference1);
		let style = getSelectedPreferenceFromList(key, preference2);
		let rooms = style === 2 ? sl(3, 10) : 3;
		let total = sl(100, 1000);
		let each = sl(10, Math.floor((total - 1) / (rooms - 1)));
		let answer = (outside ? each * (rooms - 1) : total - each * (rooms - 1)) / total;
		genAssertZ1000(answer);
		let subject = ['русскому языку', 'обществознанию', 'химии', 'географии', 'математике', 'физике', 'биологии', 'английскому языку', 'истории'].iz();
		let not = outside ? ' не' : '';
		let text;
		if (style === 0) {
			text = 'На олимпиаде по ' + subject + ' ' + chislitlx(total, 'участник') + ' собираются разместить в трёх аудиториях' +
				(sl1() ? ': в' : '. В') + ' первых двух аудиториях — по ' + chislitM(each, 'человеку', 'человека', 'человек') +
				', оставшихся — в запасной аудитории в другом корпусе. Найдите вероятность того, что случайно выбранный участник олимпиады попадёт' + not + ' в запасную аудиторию.';
		} else if (style === 1) {
			text = 'На олимпиаде по ' + subject + ' участников рассаживают по трём аудиториям. В первых двух аудиториях сажают по ' +
				chislitM(each, 'человеку', 'человека', 'человек') + ', оставшихся проводят в запасную аудиторию в другом корпусе. ' +
				'При подсчёте выяснилось, что всего было ' + chislitlx(total, 'участник') + '. Найдите вероятность того, что случайно выбранный участник писал олимпиаду' + not + ' в запасной аудитории.';
		} else {
			let event = ['олимпиаде', 'экзамене', 'вступительном испытании', 'всероссийской проверочной работе', 'всероссийском диктанте'].iz();
			if (event === 'всероссийском диктанте') subject = ['русскому языку', 'географии', 'истории'].iz();
			let words = ['двух', 'трёх', 'четырёх', 'пяти', 'шести', 'семи', 'восьми', 'девяти', 'десяти'];
			text = 'На ' + event + ' по ' + subject + ' ' + chislitlx(total, 'участник') + ' разместили в ' + words[rooms - 2] +
				' аудиториях. В первых ' + words[rooms - 3] + ' удалось разместить по ' + chislitM(each, 'человеку', 'человека', 'человек') +
				', оставшихся перевели в запасную аудиторию в другом корпусе. Найдите вероятность того, что случайно выбранный участник писал работу' + not + ' в запасной аудитории.';
		}
		NAtask.setTask({text, answers: answer, preference: [preference1, preference2]});
	}, 20000);
})();
// ФИПИ: 0FF842, B4BC07, 8384DF, CE9AE8, 606D80, 6CB2D4, E96242
