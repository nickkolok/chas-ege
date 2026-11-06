(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let V = sl(1, 6);
		let T = sl(5, 20);
		let S = V * T * 60;

		let type = [
			{name: 'Пешеход', place: 'по шоссе', verb: 'прошёл', gen: 'пешехода'},
			{name: 'Велосипедист', place: 'по дороге', verb: 'проехал', gen: 'велосипедиста'},
			{name: 'Металлический шарик', place: 'по демонстрационному столу', verb: 'прошёл', gen: 'шарика'}
		].iz();

		NAtask.setTask({
			text: type.name + ', двигаясь ' + type.place + ', ' + type.verb + ' ' + S + ' м за ' + T + ' мин. Чему равна средняя скорость ' + type.gen + '? Ответ дайте в м/с.',
			answers: V,
			analys: 'Средняя скорость: v = S/t. Переведём время: t = ' + T + ' мин = ' + (T * 60) + ' с. Тогда v = ' + S + '/' + (T * 60) + ' = ' + V + ' м/с.',
		});
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=23873
