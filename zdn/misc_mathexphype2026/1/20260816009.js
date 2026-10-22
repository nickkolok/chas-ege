(function(){'use strict';

retryWhileError(function(){
	let payouts = [
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

	let p = payouts.weights;
	let c0 = sluchch(300, 1200, payouts.divs[0]);
	let c1 = sluchch(80, 300, payouts.divs[1]);
	let c2 = sluchch(8, 120, payouts.divs[2]);
	let c3 = sluchch(2, 20, payouts.divs[3]);
	let c4 = sluchch(1, 8, payouts.divs[4]);

	let s = (payouts.weights[0]*c0 + payouts.weights[1]*c1 + payouts.weights[2]*c2 + payouts.weights[3]*c3 + payouts.weights[4]*c4) / 10000;

	let pStr = p.map(x => x.toLocaleString('ru-RU'));
	let cStr = [c0, c1, c2, c3, c4].map(x => x.toLocaleString('ru-RU'));

	let y = ['Выплата (в рублях)'].concat(pStr).tr('th');
	let z = [['Число договоров с такой выплатой'].concat(cStr).tr()];
	let table = (y + z.soed()).vTabl();

	let preference = ['table', 'text'];
	let displayMode = getSelectedPreferenceFromList('misc_mathexphype2026_1_20260816009', preference);

	let condition = '';
	if(displayMode === 0){
		condition = table;
	} else {
		condition = `выплата в размере ${pStr[0]} рублей была произведена по ${cStr[0]} договорам,<br/>` +
		            `выплата в размере ${pStr[1]} рублей была произведена по ${cStr[1]} договорам,<br/>` +
		            `выплата в размере ${pStr[2]} рублей была произведена по ${cStr[2]} договорам,<br/>` +
		            `выплата в размере ${pStr[3]} рублей была произведена по ${cStr[3]} договорам,<br/>` +
		            `выплата в размере ${pStr[4]} рублей была произведена по ${cStr[4]} договорам.<br/>`;
	}

	let analys = `Математическое ожидание случайной величины равно сумме произведений её возможных значений на вероятности этих значений.<br/>` +
	             `Вероятность каждой выплаты равна отношению числа соответствующих договоров к общему количеству договоров (10 000).<br/>` +
	             `$$M(X) = ${pStr[0]} \\cdot \\frac{${cStr[0]}}{10000} + ${pStr[1]} \\cdot \\frac{${cStr[1]}}{10000} + ${pStr[2]} \\cdot \\frac{${cStr[2]}}{10000} + ${pStr[3]} \\cdot \\frac{${cStr[3]}}{10000} + ${pStr[4]} \\cdot \\frac{${cStr[4]}}{10000} = ${s}$$`;

	NAtask.setTask({
		text: `Страховая компания заключила 10 000 годовых договоров страхования автомобилей. За год страховые выплаты распределились следующим образом:<br/><br/>${condition}Найдите математическое ожидание величины «страховая выплата по одному договору». Ответ дайте в рублях.`,
		answers: s,
		analys: analys,
		preference: [preference],
	});
	NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);

})();
