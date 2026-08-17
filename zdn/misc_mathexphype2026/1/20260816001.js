(function() { 'use strict'; retryWhileError(function() {
	NAinfo.requireApiVersion(0, 2);
	
	let volumes = [16, 32, 64, 128, 256];
	
	let c0 = sluchch(2, 15);
	let c1 = sluchch(5, 25);
	let c2 = sluchch(2, 20);
	let c3 = sluchch(1, 12);
	let c4 = sluchch(1, 8);

	let totalCards = c0 + c1 + c2 + c3 + c4;
	let s = (16*c0 + 32*c1 + 64*c2 + 128*c3 + 256*c4) / totalCards;
	
	genAssert((10*s).isAlmostInteger(), 'Ответ должен быть целым или иметь один знак после запятой');

	let vStr = volumes.map(x => x.toLocaleString('ru-RU'));
	let cStr = [c0, c1, c2, c3, c4].map(x => x.toLocaleString('ru-RU'));
	let tStr = totalCards.toLocaleString('ru-RU');

	let y = ['Объём (в Гб)'].concat(vStr).tr('th');
	let z = [['Количество карт'].concat(cStr).tr()];
	let table = (y + z.soed()).vTabl();

	let preference = ['table', 'text'];
	let displayMode = getSelectedPreferenceFromList('misc_mathexphype2026_1', preference);

	let condition = '';
	if (displayMode === 0) {
		condition = table;
	} else {
		condition = `карт объёмом ${vStr[0]} Гб — ${cStr[0]} шт.,<br/>` +
					`карт объёмом ${vStr[1]} Гб — ${cStr[1]} шт.,<br/>` +
					`карт объёмом ${vStr[2]} Гб — ${cStr[2]} шт.,<br/>` +
					`карт объёмом ${vStr[3]} Гб — ${cStr[3]} шт.,<br/>` +
					`карт объёмом ${vStr[4]} Гб — ${cStr[4]} шт.<br/>`;
	}

	let analys = `Математическое ожидание случайной величины равно сумме произведений её возможных значений на вероятности этих значений.<br/>` +
		`Вероятность выбрать карту определённого объёма равна отношению количества таких карт к общему количеству карт (${tStr}).<br/>` +
		`$$M(X) = ${vStr[0]} \cdot \frac{${cStr[0]}}{${tStr}} + ${vStr[1]} \cdot \frac{${cStr[1]}}{${tStr}} + ${vStr[2]} \cdot \frac{${cStr[2]}}{${tStr}} + ${vStr[3]} \cdot \frac{${cStr[3]}}{${tStr}} + ${vStr[4]} \cdot \frac{${cStr[4]}}{${tStr}} = ${s}$$`;

	NAtask.setTask({
		text: `Фотограф, опаздывающий на мероприятие, схватил из ящика стола случайную карту памяти. В ящике стола лежит ${tStr} одинаковых на вид карт памяти. Их распределение по объёму следующее:<br/><br/>${condition}Найдите математическое ожидание объёма выбранной карты памяти. Ответ дайте в гигабайтах.`,
		answers: s,
		analys: analys,
		preference: [preference],
	});
	NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);})();