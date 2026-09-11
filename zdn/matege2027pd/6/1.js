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

	let tickets = sluchch(5000, 100000, 1000);
	let s = (prizes.weights[0]*c0 + prizes.weights[1]*c1 + prizes.weights[2]*c2 + prizes.weights[3]*c3 + prizes.weights[4]*c4) / tickets;
	genAssertZ1000(s, 'Ответ должен быть целым числом');

	let pStr = p.map(x => x.toLocaleString('ru-RU'));
	let cStr = [c0, c1, c2, c3, c4].map(x => x.toLocaleString('ru-RU'));
	let tStr = tickets.toLocaleString('ru-RU');

	let y = ['Выигрыш (в рублях)'].concat(pStr).tr('th');
	let z = [['Число выигрышных билетов'].concat(cStr).tr()];
	let table = (y + z.soed()).vTabl();

	let preference = ['table', 'text'];
	let displayMode = getSelectedPreferenceFromList('matege2027pd_6_1', preference);

	let condition = '';
	if (displayMode === 0) {
		condition = table;
	} else {
		condition = `на выигрыш в ${pStr[0]} рублей приходится ${cStr[0]} билетов,<br/>` +
					`на выигрыш в ${pStr[1]} рублей приходится ${cStr[1]} билетов,<br/>` +
					`на выигрыш в ${pStr[2]} рублей приходится ${cStr[2]} билетов,<br/>` +
					`на выигрыш в ${pStr[3]} рублей приходится ${cStr[3]} билетов,<br/>` +
					`на выигрыш в ${pStr[4]} рублей приходится ${cStr[4]} билетов.<br/>`;
	}

	let analys = `Математическое ожидание случайной величины равно сумме произведений её возможных значений на вероятности этих значений.<br/>` +
		`Вероятность каждого выигрыша равна отношению числа соответствующих билетов к общему количеству билетов (${tStr}).<br/>` +
		`$$M(X) = ${pStr[0]} \\cdot \\frac{${cStr[0]}}{${tStr}} + ${pStr[1]} \\cdot \\frac{${cStr[1]}}{${tStr}} + ${pStr[2]} \\cdot \\frac{${cStr[2]}}{${tStr}} + ${pStr[3]} \\cdot \\frac{${cStr[3]}}{${tStr}} + ${pStr[4]} \\cdot \\frac{${cStr[4]}}{${tStr}} = ${s}$$`;

	NAtask.setTask({
		text: `Организаторы лотереи выпустили ${tStr} билетов. Выигрыши распределены следующим образом:<br/><br/>${condition}Найдите математическое ожидание величины «выигрыш на один билет». Ответ дайте в рублях.`,
		answers: s,
		analys: analys,
		preference: [preference],
	});
	NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);})();
