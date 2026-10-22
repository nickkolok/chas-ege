(function() {
	let key = "9";
	let variant = getListedPreference(key, [{
		preference: 'distance_between_marinas',
		preferenceValue: 0,
	}, {
		preference: 'speed_difference',
		preferenceValue: 1,
	}, {
		preference: 'time_difference',
		preferenceValue: 2,
	}, {
		preference: 'speed_of_first',
		preferenceValue: 3,
	}, {
		preference: 'speed_of_second',
		preferenceValue: 4,
	}, ], sl(0, 4));

	let b = 0.5, x, a, s;
	for (; !(b.isZ());) {
		x = sluchch(10, 20);
		a = sluchch(2, x - 5);
		s = sluchch(10, 200);
		b = s / (x - a) - s / (x + a);
	}
	let t1 = om.rusbukv.sluchiz(2);
	/*
	От пристани А к пристани В, расстояние между которыми равно 420 км, отправился с постоянной скоростью первый теплоход,
	а через 1 час после этого следом за ним, со скоростью на 1 км/ч большей, отправился второй.
	Найдите скорость первого теплохода, если в пункт В оба теплохода прибыли одновременно. Ответ дайте в км/ч.
	*/

	chas2.task.setCountableTask([{
			vel: 'расстояние между пристанями',
			zna: s,
			rod: 2,
			nah: (variant == 0),
			nmn: 'км',
		},
		//      {vel:'время между выходом первого и второго парохода',zna:x,rod:2,nah:1,nmn:'ч'},
		{
			utv: 'в пункт ' + t1[1] + ' оба теплохода прибыли одновременно',
		}, {
			utv: 'скорость второго теплохода больше скорости первого на ' + (2 * a) + ' км/ч',
			vpr: 'на сколько километров в час скорость второго парохода больше скорости первого',
			zna: 2 * a,
			nah: (variant == 1),
		}, {
			utv: 'второй теплоход вышел на ' + chislitlx(b, 'час') + ' позже первого',
			vpr: 'на сколько часов позже первого парохода вышел второй',
			zna: b,
			nah: (variant == 2),
		}, [{
			vel: 'скорость первого теплохода',
			zna: x - a,
			rod: 1,
			nah: 1,
			nmn: 'км/ч'
		}, {
			vel: 'скорость второго теплохода',
			zna: x + a,
			rod: 1,
			nah: 1,
			nmn: 'км/ч'
		}][variant < 3 ? sl1() : variant % 3],
	], {
		preambula: 'От пристани ' + t1[0] + ' к пристани ' + t1[1] +
			'  отправился с постоянной скоростью первый теплоход, ' +
			'через некоторое время следом за ним отправился второй. '
	});
})();
//Обзад 26590 26591
//Николай Авдеев
