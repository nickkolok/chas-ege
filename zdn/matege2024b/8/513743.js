(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '513743';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;
		let spotName = sklonlxkand(['фестиваль', 'пляж', 'рынок', 'рыбалка', 'сафари', 'скалодром'].iz(2));
		let days = sl(7, 14);
		let spotA = sl(1, 3);
		let spotB = sl(2, 5);
		let minBoth = 0;
		let maxBoth = Math.min(spotA, spotB);
		let minNone = days - (spotA + spotB - minBoth);
		let name = om.maleNames.iz();
		let surname = ['Сергеевич','Иванович','Николаевич','Валерьевич','Петрович','Александрович','Юрьевич','Михайлович','Евгеньевич','Васильевич','Валентинович','Никитич','Антонович','Кириллович','Борисович','Викторович','Владимирович','Фёдорович','Егорович',].iz();
		let fullName = `${name} ${surname}`;
		
		let correct = [
			`Не может оказаться, что ${fullName} ${chislitlx(maxBoth + 1, 'день', '$')} ходил и на ${spotName[0].ve}, и на ${spotName[1].ve}.`,
			`Было ${chislitlx(minNone, 'день', '$')}, когда ${fullName} не ходил ни на ${spotName[0].ve}, ни на ${spotName[1].ve}.`,
			`Максимум ${chislitlx(maxBoth, 'день', '$')} он был и там, и там.`,
			`Минимум ${chislitlx(minNone, 'день', '$')} он никуда не ходил.`
		]
		let wrong = [
			`Было ${chislitlx(spotA, 'день', '$')}, когда ${fullName} ходил и на ${spotName[0].ve}, и на ${spotName[1].ve}.`,
			`Если ${fullName} сходил на ${spotName[0].ve}, то в этот же день он ходил и на ${spotName[1].ve}.`,
			`Он был на ${spotName[1].pe} каждый день.`,
			`Он ни разу не был на ${spotName[0].pe}.`
		];

		NAtask.setTask({
			text: `${fullName} был в отпуске ${chislitlx(days, 'день', '$')}  и каждый день ходил куда-нибудь гулять. ${chislitlx(spotA, 'раз', '$')} он ходил на ${spotName[0].ve} и ${chislitlx(spotB, 'раз', '$')} ходил на ${spotName[1].ve} ` +
				`(за день ${fullName} мог сходить и на ${spotName[0].ve}, и на ${spotName[1].ve}, а мог никуда не ходить, но дважды в день в одно и то же место не ходил).` +
				` Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях вне зависимости от того, в какие дни ${fullName} ходил на ${spotName[1].ve}.` +
				` В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513743
