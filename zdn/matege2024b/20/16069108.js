(function () {
	'use strict';

	NAinfo.requireApiVersion(0, 2);
	const preference = ['simultaneous_find_speed', 'delayed_find_distance'];
	const simultaneous = getSelectedPreferenceFromList('16069108', preference) === 0;

	const speedA = sl(50, 100, 5);
	const speedB = slKrome(speedA, 55, 110, 5);
	const delay = simultaneous ? 0 : sl(1, 3);
	const timeB = sl(1, 4);
	const fromA = speedA * (timeB + delay);
	const fromB = speedB * timeB;
	const distance = fromA + fromB;

	const movement = simultaneous
		? 'Из городов $A$ и $B$ навстречу друг другу одновременно выехали два автомобиля. Они встретились через $' +
			timeB + '$ ч на расстоянии $' + fromB + '$ км от города $B$. ' +
			'Найдите скорость автомобиля, выехавшего из города $A$. Ответ дайте в км/ч.'
		: 'Из города $A$ в город $B$ выехал первый автомобиль со скоростью $' + speedA +
			'$ км/ч. Через $' + delay + '$ ч из города $B$ навстречу ему выехал второй автомобиль со скоростью $' +
			speedB + '$ км/ч. На каком расстоянии от города $A$ они встретятся? Ответ дайте в километрах.';

	const solution = simultaneous
		? 'Первый автомобиль проехал $' + distance + '-' + fromB + '=' + fromA +
			'$ км. Его скорость равна $' + fromA + ':' + timeB + '=' + speedA + '$ км/ч.'
		: 'К выезду второго автомобиля первый проехал $' + speedA + '\\cdot' + delay + '=' + speedA * delay +
			'$ км. Оставшееся расстояние они проехали со скоростью сближения $' + speedA + '+' + speedB +
			'$ км/ч, поэтому встретились через $(' + distance + '-' + speedA * delay + '):(' + speedA + '+' +
			speedB + ')=' + timeB + '$ ч после выезда второго. Первый проехал $' + speedA + '\\cdot(' +
			delay + '+' + timeB + ')=' + fromA + '$ км.';

	NAtask.setTask({
		text: 'Расстояние между городами $A$ и $B$ равно $' + distance + '$ км. ' + movement,
		answers: simultaneous ? speedA : fromA,
		analys: solution,
		preference: preference,
	});
})();
// F531F4, D17201, A2D47D, 37CAB6, 2601D8, B7DCCE, 2D42C3, 4EDEED, D7CE50, 94175D, 0620F7, B474B0, 4F31F1, D5E347, 02BA69, 07A063
