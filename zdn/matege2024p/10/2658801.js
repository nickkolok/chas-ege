(function() {
	'use strict';
	retryWhileError(function() {
		/* Теплоход, скорость которого в неподвижной воде равна 27 км/ч, проходит некоторое расстояние по реке и после стоянки возвращается в исходный пункт. Скоростьтечения равна 1 км/ч, стоянка длится 5 часов, а в исходный пункт теплоход возвращается через 32 часа после отправления из него. Сколько километров проходиттеплоход за весь рейс? */

		let S = sl(200, 500);
		let t_stop = sl(1, 10);
		let speed = sl(20, 100);
		let speedRiver = sl(1, 6);

		let t_1 = S / (speed + speedRiver); // время туда в минутах
		let t_2 = S / (speed - speedRiver); // время обратно в минутах
		let t_sum = t_1 + t_2;
		genAssertAlmostInteger(t_sum, 'Общее время не целое');

		let the_activeFloatingVehicle = sklonlxkand(decor.activeFloatingVehicle.iz()); // ["пароход","теплоход","каяк","корабль","паром","катер","лодка","байдарка","баржа","яхта","моторная лодка"]

		NAtask.setTask({
			text: '' + the_activeFloatingVehicle.ie.toZagl() + ', ' +
				'скорость котор' + ['ого', 'ой', 'ое'][the_activeFloatingVehicle.rod] + ' в неподвижной воде равна $' + speed +
				'$ км/ч, ' +
				'проходит некоторое расстояние по реке и после стоянки возвращается в исходный пункт. ' +
				'Скорость течения равна $' + speedRiver + '$ км/ч, ' +
				'стоянка длится ' + chislitlx(t_stop, 'час', 're$') + ', ' +
				'а в исходный пункт ' + the_activeFloatingVehicle.ie + ' возвращается через ' + ((t_sum + t_stop) * 60).toChMin('te$') +
				' после отправления из него. ' +
				'Сколько километров проходит ' + the_activeFloatingVehicle.ie + ' за весь рейс?',
			answers: S * 2,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard( /*true*/ );
	}, 5000);
})();
//2658801
