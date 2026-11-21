(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = "8";
	const preference = ['river_speed', 'boat_speed', 'parking_duration', 'total_time', 'distance_between_points'];
	const variant = getSelectedPreferenceFromList(key, preference);
	
	let b = 0.5, x, a, s, t;
	for (; !(b.isZ());) {
		x = sluchch(5, 20);
		a = sluchch(2, x - 1);
		s = sluchch(10, 200);
		t = sluchch(1, 15);
		b = s / (x - a) + s / (x + a) + t;
	}

	/*

	Теплоход проходит по течению реки до пункта назначения 200 км и после стоянки возвращается в пункт отправления.
	* Найдите скорость течения, если скорость теплохода в неподвижной воде равна 15 км/ч, стоянка длится 10 часов,
	* а в пункт отправления теплоход возвращается через 40 часов после отплытия из него. Ответ дайте в км/ч.
	*/
	chas2.task.setCountableTask([{
		vel: 'скорость течения',
		zna: a,
		rod: 1,
		nah: (variant == 0),
		nmn: 'км/ч'
	}, {
		vel: 'скорость теплохода в неподвижной воде',
		zna: x,
		rod: 1,
		nah: (variant == 1),
		nmn: 'км/ч'
	}, {
		utv: 'стоянка длится ' + chislitlx(t, 'час'),
		vpr: 'сколько часов длится стоянка',
		zna: t,
		nah: (variant == 2)
	}, {
		utv: 'в пункт отправления теплоход возвращается через ' + chislitlx(b, 'час') + ' после отплытия из него',
		vpr: 'через сколько часов после отплытия теплоход возвращается в пункт отправления',
		zna: b,
		nah: (variant == 3)
	}, {
		vel: 'расстояние от пункта отправления до пункта назначения',
		zna: s,
		rod: 2,
		nah: (variant == 4),
		nmn: 'км'
	}, ], {
		preambula: 'Теплоход проходит по течению реки до пункта назначения и после стоянки возвращается в пункт отправления. ',
	}, {preference, tags: {log: 0, prz: 0, drs: 0, tri: 0}});
})();

//Обзад 26588 26589
//Николай Авдеев

