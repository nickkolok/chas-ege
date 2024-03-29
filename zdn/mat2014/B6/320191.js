//40. Задание 4 № 320191
//На олимпиаде по русскому языку 250 участников разместили в трёх аудиториях.
//В первых двух удалось разместить по 120 человек, оставшихся перевели в запасную аудиторию в другом корпусе.
//Найдите вероятность того, что случайно выбранный участник писал олимпиаду в запасной аудитории.

(function() {
	retryWhileError(function() {

		let place = ['олимпиаде', 'экзамене', 'вступительном испытании', 'всероссийской проверочной работе',
			'всероссийском диктанте'
		].iz();
		let subject;
		if (place == 'всероссийском диктанте') {
			subject = ['русскому языку', 'географии', 'истории'].iz();
		} else {
			subject = ['русскому языку', 'географии', 'математике', 'физике', 'химии', 'биологии', 'английскому языку',
				'истории'
			].iz();
		}
		let numbersOfPlace = sl(3, 10);
		let num = ['двух', 'трёх', 'четырёх', 'пяти', 'шести', 'семи', 'восемь', 'девяти', 'десяти'];

		let numbersOfPartic = sl(100, 1000);
		let particInOne = sl(10, numbersOfPartic / numbersOfPlace - 1);

		let answers;
		inOrNotIn = sl1();
		if (inOrNotIn)
			answers = (particInOne * (numbersOfPlace - 1)) / numbersOfPartic;
		else
			answers = (numbersOfPartic - particInOne * (numbersOfPlace - 1)) / numbersOfPartic;


		genAssertZ1000(answers * 10, 'Кривой ответ');
		NAtask.setTask({
			text: 'На ' + place + ' по ' + subject + ' ' + numbersOfPartic + ' участников разместили в ' + num[
					numbersOfPlace - 2] +
				' аудиториях. ' +
				'В первых ' + num[numbersOfPlace - 3] + ' удалось разместить по ' + particInOne +
				' человек, оставшихся перевели в запасную аудиторию в другом корпусе. ' +
				'Найдите вероятность того, что случайно выбранный участник писал ' + '<b>не</b>'.esli(inOrNotIn) +
				' в запасной аудитории.',
			answers,
		});
	});
})();
//fixed and update by SugarHedgehog
// 320191 321399 513418 513437 321307 321309 321311 321313 321315 321317 321319 321321 321323 321325 321327 321329 321331 321333 321335 321337 321339 321341 321343 321345 321347 321349 321351 321353 321355 321357 321359 321361 321363 321365 321367 321369 321371 321373 321375 321377 321379 321381 321383 321385 321387 321389 321391 321393 321395 321397
