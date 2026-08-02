(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '522305';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let total = sl(30, 50);
		let pads = sl(3, 8);
		let filter = sl(7, 15);
		let minNone = total - (pads + filter);
		let maxBoth = Math.min(pads, filter);

		let correct = [
			`Найдётся ${chislitlx(minNone,'машина','$')}, в которых не нужно менять ни колодки, ни фильтр.`,
			`Не найдётся ${chislitlx(maxBoth + 1,'машина','$')}, в которых нужно менять и колодки, и фильтр.`,
			`Максимум ${chislitlx(maxBoth,'машина','$')} требуют замены обоих деталей.`,
			`Минимум ${chislitlx(minNone,'машина','$')} не требуют никакой замены.`
		];
		let wrong = [
			`Найдётся ${chislitlx(maxBoth + 1,'машина','$')}, в которых нужно поменять и колодки, и фильтр.`,
			`Если в машине нужно менять колодки, то фильтр тоже нужно менять.`,
			`Все машины требуют хотя бы одной замены.`,
			`Колодки и фильтр всегда меняют вместе.`
		];

		NAtask.setTask({
			text: `Диагностика ${chislitlx(total,'машина','r$')} в автосервисе показала, что у ${chislitlx(pads,'машина','r$')} нужно заменить тормозные колодки, а у ${chislitlx(filter,'машина','r$')} — заменить воздушный фильтр (колодки и фильтр требуют замены независимо друг от друга). ` +
				`Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях вне зависимости от того, какие машины нуждаются в замене фильтра, а какие — в замене колодок. В ответе запишите номера выбранных утверждений без пробелов, запятых и` +
				` других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=522305
