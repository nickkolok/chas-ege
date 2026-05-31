(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '511014';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let total = sl(80, 120);
		let firstLang = sl(total / 2, total - 10);
		genAssertAlmostInteger(firstLang, 'Число не должно иметь знаков после запятой');
		let secondLang = sl(30, total - 10);
		let minBoth = Math.max(0, firstLang + secondLang - total);
		let maxBoth = Math.min(firstLang, secondLang);
		let lang = ['португальский', 'французский', 'китайский', 'немецкий', 'польский', 'английский', 'корейский', 'испанский'].iz(2);

		let correct = [
			`В этой фирме хотя бы ${chislitlx(minBoth,'человек','r')} знают и ${lang[0]}, и ${lang[1]} языки.`,
			`Не более ${chislitlx(maxBoth,'человек','r')} из этой фирмы знают и португальский, и ${lang[1]} языки.`,
			`Если все, кто знает ${lang[1]}, также знают ${lang[0]}, то двуязычных — ${secondLang}.`,
			`Если множества не пересекаются, то общее число — ${firstLang + secondLang}, но это возможно только если ≤ ${total}.`
		];
		let wrong = [
			`Нет ни одного человека в этой фирме, знающего и ${lang[0]}, и ${lang[1]} языки.`,
			`Если человек из этой фирмы знает ${lang[0]} язык, то он знает и ${lang[1]}.`,
			`Число двуязычных обязательно равно ${Math.floor((firstLang + secondLang) / 2)}.`,
			`${lang[0].toZagl()} знают только те, кто не изучал ${lang[1]} язык.`,
		];

		NAtask.setTask({
			text: `В фирме работает ${chislitlx(total, 'человек','r')}, из них ${chislitlx(firstLang, 'человек')} знают ${lang[0]} язык, а ${chislitlx(secondLang, 'человек','r')} — ${lang[1]}. Выберите одно или несколько утверждений, которые ` +
				(rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=511014
