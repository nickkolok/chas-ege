(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514088';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let total = sl(80, 120, 2);
		let firstLang = sl(total / 2, total - 10);
		let secondLang = slKrome([firstLang], 30, total - 10);
		let minBoth = Math.max(0, firstLang + secondLang - total);
		let maxBoth = Math.min(firstLang, secondLang);
		let lang = ['португальский', 'французский', 'китайский', 'немецкий', 'польский', 'английский', 'корейский', 'испанский'].iz(2);
		let moreOrLess = firstLang > secondLang ? 'больше' : 'меньше';
		let smallerLang = firstLang < secondLang ? lang[0] : lang[1];
		let largerLang = firstLang > secondLang ? lang[0] : lang[1];

		let correct = [
			`В этой фирме хотя бы ${chislitM(minBoth, 'человека', 'человека', 'человек')} ${chislit(minBoth, 'знает', 'знают', 'знают')} и ${lang[0]}, и ${lang[1]} языки.`,
			`Не более ${chislitM(maxBoth, 'человека', 'человека', 'человек')} из этой фирмы ${chislit(maxBoth, 'знает', 'знают', 'знают')} и ${lang[0]}, и ${lang[1]} языки.`,
			`Если все, кто знает ${smallerLang}, также знают ${largerLang}, то двуязычных — ${maxBoth}.`,
			`Знающих только ${lang[0]} на ${chislitM((firstLang - secondLang).abs(), 'человека', 'человека', 'человек')} ${moreOrLess}, чем тех, кто знает только ${lang[1]}.`,
		];
		let wrong = [
			`Нет ни одного человека в этой фирме, знающего и ${lang[0]}, и ${lang[1]} языки.`,
			`Если человек из этой фирмы знает ${lang[0]} язык, то он знает и ${lang[1]}.`,
			`Число двуязычных обязательно равно ${Math.floor((firstLang + secondLang) / 2)}.`,
			`${lang[0].toZagl()} знают только те, кто не изучал ${lang[1]} язык.`,
		];

		NAtask.setTask({
			text: `В фирме работает ${chislitM(total, 'человек', 'человека', 'человек')}, из них ${chislitM(firstLang, 'человек', 'человека', 'человек')} ${chislit(firstLang, 'знает', 'знают', 'знают')} ${lang[0]} язык, а ${chislitM(secondLang, 'человек', 'человека', 'человек')} — ${lang[1]}. Выберите одно или несколько утверждений, которые ` +
				(rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514088
