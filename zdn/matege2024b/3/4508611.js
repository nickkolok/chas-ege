(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '4508611';
		let preference = ['withinBracket', 'atUpperBound'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let bounds = [100, 125, 150, 175, 200, 225, 250];
		let rates = [12, 25, 35, 45, 50, 65, 75, 150];
		let selected = sl(0, variant ? 6 : 7);
		let lower = selected ? bounds[selected - 1] : 0;
		let power = variant ? bounds[selected] : sl(lower + 1, selected < 7 ? bounds[selected] : 300);
		let rows = [['Мощность двигателя, л.с.', 'Ставка, руб. за 1 л.с. в год'].tr('th')];
		for (let i = 0; i < rates.length; i++) {
		    let interval = i === 0 ? 'До 100 включительно' : i === 7 ? 'Свыше 250' :
		        'Свыше ' + bounds[i - 1] + ' до ' + bounds[i] + ' включительно';
		    rows.push([interval, rates[i]].tr());
		}
		NAtask.setTask({
		    text: 'В учебной таблице представлены налоговые ставки на автомобили.' + rows.join('').toTable() +
		        ' Какова налоговая ставка (в рублях за 1 л.с. в год) на автомобиль мощностью ' + power + ' л.с.?',
		    answers: rates[selected], preference,
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.56: 44CBC3, F327E2, A3AB1A, D744C2
