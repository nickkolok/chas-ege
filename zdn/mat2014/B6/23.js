//РАБОТАЕТ
//51. Задание 4 № 320202
//По отзывам покупателей Иван Иванович оценил надёжность двух интернет-магазинов.
//Вероятность того, что нужный товар доставят из магазина А, равна 0,8.
//Вероятность того, что этот товар доставят из магазина Б, равна 0,9.
//Иван Иванович заказал товар сразу в обоих магазинах. Считая, что
//интернет-магазины работают независимо друг от друга,
//найдите вероятность того, что ни один магазин не доставит товар.

(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 0);

	var name = ['Иван', 'Игорь', 'Михаил', 'Дмитрий', 'Анатолий', 'Григорий', 'Станислав', 'Петр', 'Сергей',].iz();
	var patronymic = ['Викторович', 'Александрович', 'Алексеевич', 'Петрович', 'Борисович', 'Игоревич', 'Вячеславович', 'Андреевич', 'Васильевич', 'Геннадьевич'].iz();
	var verA = (sluchch(8, 93)) / 100;
	var verB = (sluchch(82, 94)) / 100;

	NAtask.setTask({
		text: 'По отзывам покупателей ' + name + ' ' + patronymic + ' оценил надёжность двух интернет-магазинов. ' +
			'Вероятность того, что нужный товар доставят из магазина А, равна ' + verA + '. ' +
			'Вероятность того, что этот товар доставят из магазина Б, равна ' + verB + '. ' +
			'' + name + ' ' + patronymic + ' заказал товар сразу в обоих магазинах. Считая, что ' +
			'интернет-магазины работают независимо друг от друга, ' +
			'найдите вероятность того, что ни один магазин не доставит товар.',
		answers: (1 - verA) * (1 - verB),

	});
})();
