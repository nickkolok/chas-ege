(function() { 'use strict'; retryWhileError(function() {
	let prizes = [
		{
			weights: [2, 4, 5, 10, 20],
			divs: [50, 25, 20, 10, 5],
			cBounds: [[50, 200], [25, 100], [20, 80], [10, 40], [5, 20]]
		},
		{
			weights: [5, 10, 20, 25, 50],
			divs: [20, 10, 5, 4, 2],
			cBounds: [[20, 80], [10, 40], [5, 20], [4, 16], [2, 8]]
		},
		{
			weights: [1, 2, 5, 10, 25],
			divs: [100, 50, 20, 10, 4],
			cBounds: [[100, 200], [50, 150], [20, 80], [10, 40], [4, 16]]
		},
	].iz();

	let total = sluchch(500, 2000, 100);

	let c = prizes.cBounds.map((b, i) => sluchch(b[0], b[1], prizes.divs[i]));

	let s = prizes.weights.map((w, i) => w * c[i]).sum() / total;
	genAssertZ1000(s, 'Ответ должен быть целым числом');

	let wStr = prizes.weights.map(x => x.toLocaleString('ru-RU'));
	let cStr = c.map(x => x.toLocaleString('ru-RU'));
	let tStr = total.toLocaleString('ru-RU');

	let w = ['Масса украшения (в граммах)'].concat(wStr).tr('th');
	let z = [['Число таких украшений в сундуке'].concat(cStr).tr()];
	let table = (w + z.soed()).vTabl();

	let preference = ['table', 'text'];
	let displayMode = getSelectedPreferenceFromList('misc_mathexphype2026_1_20260816006', preference);

	let condition = '';
	if (displayMode === 0) {
		condition = table;
	} else {
		condition = `украшений массой ${wStr[0]} г в сундуке ${cStr[0]} шт.,<br/>` +
					`украшений массой ${wStr[1]} г в сундуке ${cStr[1]} шт.,<br/>` +
					`украшений массой ${wStr[2]} г в сундуке ${cStr[2]} шт.,<br/>` +
					`украшений массой ${wStr[3]} г в сундуке ${cStr[3]} шт.,<br/>` +
					`украшений массой ${wStr[4]} г в сундуке ${cStr[4]} шт.<br/>`;
	}

	let analys = `Математическое ожидание случайной величины равно сумме произведений её возможных значений на вероятности этих значений.<br/>` +
		`Вероятность достать каждое украшение равна отношению числа таких украшений к общему количеству предметов в сундуке (${tStr}).<br/>` +
		`$$M(X) = ${wStr[0]} \cdot \frac{${cStr[0]}}{${tStr}} + ${wStr[1]} \cdot \frac{${cStr[1]}}{${tStr}} + ${wStr[2]} \cdot \frac{${cStr[2]}}{${tStr}} + ${wStr[3]} \cdot \frac{${cStr[3]}}{${tStr}} + ${wStr[4]} \cdot \frac{${cStr[4]}}{${tStr}} = ${s}$$`;

	NAtask.setTask({
		text: `В сундуке у пиратского капитана Джека лежит ${tStr} различных предметов. Среди них есть золотые и серебряные украшения, распределённые следующим образом:<br/><br/>${condition}Остальные предметы в сундуке — это железные гвозди, они не представляют ценности (их массу для юнги считаем равной нулю). Капитан щедрой рукой достаёт из сундука один случайный предмет и вручает его отличившемуся на абордаже юнге. Найдите математическое ожидание массы ценного предмета (украшения), который достанется юнге. Ответ дайте в граммах.`,
		answers: s,
		analys: analys,
		preference: [preference],
	});
	NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);})();