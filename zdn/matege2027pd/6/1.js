(function() { 'use strict'; retryWhileError(function() {
	let prizes = [
		{
			weights: [100, 1000, 5000, 10000, 50000],
			divs: [100, 10, 2, 1, 1],
		},
		{
			weights: [50, 500, 2000, 10000, 50000],
			divs: [200, 20, 5, 1, 1],
		},
		{
			weights: [200, 1000, 5000, 50000, 100000],
			divs: [50, 10, 2, 1, 1],
		},
	].iz();

	let p = prizes.weights;
	let c0 = sluchch(300, 1200, prizes.divs[0]);
	let c1 = sluchch(80, 300, prizes.divs[1]);
	let c2 = sluchch(8, 120, prizes.divs[2]);
	let c3 = sluchch(2, 20, prizes.divs[3]);
	let c4 = sluchch(1, 8, prizes.divs[4]);

	let s = (prizes.weights[0]*c0 + prizes.weights[1]*c1 + prizes.weights[2]*c2 + prizes.weights[3]*c3 + prizes.weights[4]*c4) / 10000;

	let y = ['Выигрыш (в рублях)'].concat(p).tr('th');
	let z = [['Число выигрышных билетов', c0, c1, c2, c3, c4].tr()];
	let table = (y + z.soed()).vTabl();

	let preference = ['table', 'text'];
	let displayMode = getSelectedPreferenceFromList('matege2027pd_6_1', preference);

	let condition = '';
	if (displayMode === 0) {
		condition = table;
	} else {
		condition = `на выигрыш в ${p[0]} рублей приходится ${c0} билетов,<br/>` +
					`на выигрыш в ${p[1]} рублей приходится ${c1} билетов,<br/>` +
					`на выигрыш в ${p[2]} рублей приходится ${c2} билетов,<br/>` +
					`на выигрыш в ${p[3]} рублей приходится ${c3} билетов,<br/>` +
					`на выигрыш в ${p[4]} рублей приходится ${c4} билетов.<br/>`;
	}

	let analys = `Математическое ожидание случайной величины равно сумме произведений её возможных значений на вероятности этих значений.<br/>` +
		`Вероятность каждого выигрыша равна отношению числа соответствующих билетов к общему количеству билетов (10 000).<br/>` +
		`$$M(X) = ${p[0]} \\cdot \\frac{${c0}}{10000} + ${p[1]} \\cdot \\frac{${c1}}{10000} + ${p[2]} \\cdot \\frac{${c2}}{10000} + ${p[3]} \\cdot \\frac{${c3}}{10000} + ${p[4]} \\cdot \\frac{${c4}}{10000} = ${s}$$`;

	NAtask.setTask({
		text: `Организаторы лотереи выпустили 10 000 билетов. Выигрыши распределены следующим образом:<br/><br/>${condition}Найдите математическое ожидание величины «выигрыш на один билет». Ответ дайте в рублях.`,
		answers: s,
		analys: analys,
		preference: [preference],
	});
	NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);})();
