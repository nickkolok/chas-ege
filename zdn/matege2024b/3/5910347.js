(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '5910347';
		let preference = ['dayMinimum', 'dayMaximum', 'periodMinimum', 'periodMaximum', 'valueAtTime'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let dayData = [[2, 'Вт'], [3, 'Ср'], [4, 'Чт']];
		let days = dayData.map(([index]) => om.denned.pg['в'][index] + ' ' + om.denned.ve[index]);
		let dayShort = dayData.map(([, label]) => label);
		let hourStep = 6;
		let perDay = 24 / hourStep;
		let times = [].N(days.length * perDay + 1, hourStep).map(time => time - hourStep);
		let day = sl(0, days.length - 1);
		let hour = times.slice(1, perDay).iz();
		let pMin = 720, pMax = 780, pStep = 2;
		let values = [].zapslch(0, times.length - 1, pMin, pMax, pStep);
		let dayStart = perDay * day;
		let selected = variant < 2 ? values.slice(dayStart, dayStart + perDay + 1) : values;
		let questions = [
			'Найдите наименьшее значение атмосферного давления ' + days[day] + ' с 0:00 до 24:00 включительно.',
			'Найдите наибольшее значение атмосферного давления ' + days[day] + ' с 0:00 до 24:00 включительно.',
			'Найдите наименьшее значение атмосферного давления за все трое суток.',
			'Найдите наибольшее значение атмосферного давления за все трое суток.',
			'Определите значение атмосферного давления ' + days[day] + ' в ' + hour + ':00.',
		];
		NAtask.setTask({
			text: 'На графике показано изменение атмосферного давления в течение трёх суток. По горизонтали указаны дни недели и время, ' +
				'по вертикали — атмосферное давление в миллиметрах ртутного столба. ' + questions[variant] + ' Ответ дайте в миллиметрах ртутного столба.',
			answers: variant === 4 ? values[dayStart + hour / hourStep] : variant % 2 ? selected.maxE() : selected.minE(),
			preference: [preference],
		});
		NAtask.modifiers.addJqplot({
			dataArray: [[times, values].T()], width: '780px', height: '420px',
			options: {axes: {
				xaxis: {min: times[0], max: times.last(), ticks: times.map((time, i) => [time, i === times.length - 1 ? dayShort.last() + ' 24' : dayShort[Math.floor(i / perDay)] + ' ' + (time % 24)])},
				yaxis: {min: pMin, max: pMax, tickInterval: pStep},
			}, seriesDefaults: {showMarker: false}},
		});
	}, 1000);
})();
// 5A2F4B, C7EB02, 705687
// FD11B2
// 4FB49F, 1E69EC
// 95A959, 3B8CC1
// 831CDD
// C4FD81, 1EE16F
// 990583, 19AA6B
// A1351C, 1F0168
// 67D522
// B06F05
// A934BB, 4AD160
// 835CCE, B88E61, F8F781
// D9C832, 0C5F1F, 6C141A

