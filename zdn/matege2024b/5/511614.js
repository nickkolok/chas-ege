(function () {
	retryWhileError(function () {
		'use strict';
		NAinfo.requireApiVersion(0, 2);
		let key = "511614";

		let preference = ['two_boys', 'two_girls', 'boy', 'girl', 'boy_and_girl'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let age = sl(0, 2);

		let question;
		switch (variant) {
			case 0:
				question = 'оба пришедших оказались ' + ['мальчиками', 'юношами', 'мужчинами'][age];
				break;
			case 1:
				question = 'обе пришедшие оказались ' + ['девочками', 'девушками', 'женщинами'][age];
				break;
			case 2:
				question = 'среди пришедших есть хотя бы один ' + ['мальчик', 'юноша', 'мужчина'][age];
				break;
			case 3:
				question = 'среди пришедших есть хотя бы одна ' + ['девочка', 'девушка', 'женщина'][age];
				break;
			case 4:
				question = 'пришли ' + ['мальчик', 'юноша', 'мужчина'][age] + ' и ' + ['девочка', 'девушка', 'женщина'][age];
				break;
		}

		NAtask.setTask({
			text: `$${sl(1, 28)}$ ${[`апреля`, `июля`, sklonlxkand(om.months.iz()).re][age]} на ${[`запись в первый класс`, `подачу документов`, `собеседование`][age]} независимо друг от друга пришли
			два будущих ${[`первоклассника`, `студента`, `работника`][age]}. Считая, что приходы ${['мальчика', 'юноши', 'мужчины'][age]} и ${['девочки', 'девушки', 'женщины'][age]}
			равновероятны, найдите вероятность того, что ${question}.`,
			answers: [0.25, 0.25, 0.75, 0.75, 0.5][variant],
			authors: ['Суматохина Александра'], preference,
		});
	}, 100);
})();

// 511614 511654 511674 511694
// 2598BB
// B306C9
// 2D6259
// 998481
