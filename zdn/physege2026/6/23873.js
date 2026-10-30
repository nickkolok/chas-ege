(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '23873';
		let preference = ['speed', 'distance', 'time'];
		let typeIndex = getSelectedPreferenceFromList(key, preference);

		let type = ['Пешеход', 'Велосипедист'].iz();
		let verb = type === 'Пешеход' ? 'прошёл' : 'проехал';
		let prep = type === 'Пешеход' ? ['по шоссе', 'по дороге', 'по тротуару'].iz() : ['по шоссе', 'по дороге', 'по велодорожке'].iz();
		let subject_nom = type === 'Пешеход' ? 'Пешеход' : 'Велосипедист';
		let subject_gen = type === 'Пешеход' ? 'пешехода' : 'велосипедиста';

		let V = sl(type === 'Пешеход' ? 1 : 4, type === 'Пешеход' ? 3 : 6);
		let T = sl(5, 20);
		let S = V * T * 60;

		let text = `${subject_nom}, двигаясь ${prep}, `;
		let question, answer, analys;

		if (typeIndex === 0) {
			text += `${verb} ${S} м за ${T} мин. Чему равна средняя скорость ${subject_gen}? Ответ дайте в м/с.`;
			answer = V;
			analys = `Средняя скорость движения определяется как отношение пройденного пути ко времени движения: ` +
			         `$$v = \frac{S}{t}.$$ ` +
			         `Переведём время в секунды: $t = ${T} \text{ мин} = ${T * 60} \text{ с}. $ ` +
			         `Тогда средняя скорость равна: $$v = \frac{${S}}{${T * 60}} = ${V} \text{ м/с}.$$`;
		} else if (typeIndex === 1) {
			text += `двигался со средней скоростью ${V} м/с в течение ${T} мин. Какой путь преодолел ${subject_nom}? Ответ дайте в метрах.`;
			answer = S;
			analys = `Путь определяется как произведение скорости на время: ` +
			         `$$S = v \cdot t.$$ ` +
			         `Переведём время в секунды: $t = ${T} \text{ мин} = ${T * 60} \text{ с}. $ ` +
			         `Тогда путь равен: $$S = ${V} \cdot ${T * 60} = ${S} \text{ м}.$$`;
		} else if (typeIndex === 2) {
			text += `${verb} ${S} м со средней скоростью ${V} м/с. За сколько минут ${subject_nom} преодолел этот путь? Ответ дайте в минутах.`;
			answer = T;
			analys = `Время движения определяется как отношение пройденного пути к скорости: ` +
			         `$$t = \frac{S}{v}.$$ ` +
			         `Тогда время в секундах равно: $$t = \frac{${S}}{${V}} = ${T * 60} \text{ с}.$$ ` +
			         `Переведём секунды в минуты: $$t = \frac{${T * 60}}{60} = ${T} \text{ мин}.$$`;
		}

		NAtask.setTask({
			text: text,
			answers: answer,
			analys: analys,
			preference: preference,
		});
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=23873
//zer00player
