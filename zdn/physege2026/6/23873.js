(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let V = sl(1, 6);  // скорость в м/с
		let T = sl(5, 20); // время в минутах
		let S = V * T * 60; // путь в метрах

		let type = ['Пешеход', 'Велосипедист'].iz();
		let verb = type === 'Пешеход' ? 'прошёл' : 'проехал';
		let gen = type === 'Пешеход' ? 'пешехода' : 'велосипедиста';

		NAtask.setTask({
			text: type + ', двигаясь по шоссе, ' + verb + ' ' + S + ' м за ' + T + ' мин. Чему равна средняя скорость ' + gen + '? Ответ дайте в м/с.',
			answers: V,
			analys: 'Средняя скорость: v = S/t. Переведём время: t = ' + T + ' мин = ' + (T * 60) + ' с. Тогда v = ' + S + '/' + (T * 60) + ' = ' + V + ' м/с.',
		});
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=23873
