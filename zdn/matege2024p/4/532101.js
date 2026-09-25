(function() {
	'use strict';
	let Vmax = sl(30, 110, 10);
	let Ntotal = sl(500, 20000, 500);

	let weights = [
		sl(50, 70), // below
		sl(10, 20), // 0-9
		sl(5, 15),  // 10-19
		sl(2, 8),   // 20-29
		sl(1, 5),   // 30-39
		sl(0, 3),   // 40-49
		sl(0, 2),   // 50-59
		sl(0, 1),   // 60-69
		sl(0, 1),   // 70-79
		sl(0, 1)    // 80-89
	];
	let sumW = weights.reduce((a,b) => a+b, 0);
	let counts = [];
	let rem = Ntotal;
	for(let i=0; i<10; i++){
		let c = Math.round(Ntotal * weights[i] / sumW);
		if(i < 10) c = Math.min(c, rem);
		counts.push(c);
		rem -= c;
	}
	counts.push(rem);

	let rows = [
		{text: '0–' + (Vmax - 1), count: counts[0], fine: 0},
		{text: Vmax + '–' + (Vmax + 9), count: counts[1], fine: 0},
		{text: (Vmax + 10) + '–' + (Vmax + 19), count: counts[2], fine: 0},
		{text: (Vmax + 20) + '–' + (Vmax + 29), count: counts[3], fine: 750},
		{text: (Vmax + 30) + '–' + (Vmax + 39), count: counts[4], fine: 750},
		{text: (Vmax + 40) + '–' + (Vmax + 49), count: counts[5], fine: 1500},
		{text: (Vmax + 50) + '–' + (Vmax + 59), count: counts[6], fine: 1500},
		{text: (Vmax + 60) + '–' + (Vmax + 69), count: counts[7], fine: 3000},
		{text: (Vmax + 70) + '–' + (Vmax + 79), count: counts[8], fine: 3000},
		{text: (Vmax + 80) + '–' + (Vmax + 89), count: counts[9], fine: 7500},
		{text: (Vmax + 90) + ' и более', count: counts[10], fine: 7500}
	];

	let table = '| Скорость, км/ч | Количество ТС |\n|---|---|\n';
	for(let r of rows){
		table += `| ${r.text} | ${r.count} |\n`;
	}

	let fineSpeed = 0;
	for(let r of rows){
		fineSpeed += r.count * r.fine;
	}

	let otherViolations = [
		{
			text: "проезда на запрещающий сигнал светофора",
			fine: 1500,
			article: "ч. 1 ст. 12.12 КоАП РФ"
		},
		{
			text: "использования мобильного телефона за рулём",
			fine: 1500,
			article: "ст. 12.36.1 КоАП РФ"
		},
		{
			text: "пересечения сплошной линии разметки между попутными полосами движения",
			fine: 750,
			article: "ч. 1 ст. 12.16 КоАП РФ"
		},
		{
			text: "отсутствия ремня безопасности",
			fine: 1500,
			article: "ст. 12.6 КоАП РФ"
		}
	];
	let otherVio = otherViolations.iz();
	let N_other = sl(1, Math.max(1, Math.round(Ntotal * 0.05)), 1);

	let totalFine = fineSpeed + N_other * otherVio.fine;
	let expectedValue = Math.round(totalFine / Ntotal * 100) / 100;

	let text = `
На арке над дорогой закреплена камера фиксации нарушений ПДД. Максимальная разрешённая скорость в зоне действия камеры составляет ${Vmax} км/ч.
За отчётный период через зону действия камеры проехало ${Ntotal} транспортных средств. В таблице приведено количество транспортных средств, имевших скорость в каждом из контрольных диапазонов.

${table}

Согласно КоАП РФ (в редакции 2026 года), штрафы за превышение разрешённой скорости, зафиксированное камерой, составляют:
* менее чем на 20 км/ч: штраф не назначается;
* от 20 до 39 км/ч: 750 рублей;
* от 40 до 59 км/ч: 1500 рублей;
* от 60 до 79 км/ч: 3000 рублей;
* на 80 км/ч и более: 7500 рублей.

Более того, камера зафиксировала ${N_other} случаев ${otherVio.text}. Это нарушение наказывается штрафом в размере ${otherVio.fine} рублей (${otherVio.article}).

Каково математическое ожидание штрафа, выписанного каждому из ${Ntotal} транспортных средств? Ответ выразите в рублях и при необходимости округлите до сотых.
`;

	let analys = `
Математическое ожидание случайной величины (в данном случае — размера штрафа, выпавшего на одно случайное ТС) равно среднему арифметическому всех возможных значений с учётом их вероятностей (или частот).
Иными словами, необходимо найти общую сумму всех выписанных штрафов и разделить её на общее количество транспортных средств.

1. Штрафы за превышение скорости:
* Менее чем на 20 км/ч: штраф 0 руб. В эту категорию попадают все ТС со скоростью от 0 до ${(Vmax + 19)} км/ч. Сумма штрафов: 0 руб.
* От 20 до 39 км/ч: штраф 750 руб. Таких ТС: ${counts[3] + counts[4]}. Сумма штрафов: ${(counts[3] + counts[4]) * 750} руб.
* От 40 до 59 км/ч: штраф 1500 руб. Таких ТС: ${counts[5] + counts[6]}. Сумма штрафов: ${(counts[5] + counts[6]) * 1500} руб.
* От 60 до 79 км/ч: штраф 3000 руб. Таких ТС: ${counts[7] + counts[8]}. Сумма штрафов: ${(counts[7] + counts[8]) * 3000} руб.
* На 80 км/ч и более: штраф 7500 руб. Таких ТС: ${counts[9] + counts[10]}. Сумма штрафов: ${(counts[9] + counts[10]) * 7500} руб.

Итого штрафов за скорость: ${fineSpeed} руб.

2. Штрафы за ${otherVio.text}:
Камера зафиксировала ${N_other} таких нарушений. Штраф за каждое составляет ${otherVio.fine} руб.
Сумма штрафов: ${N_other} * ${otherVio.fine} = ${N_other * otherVio.fine} руб.

3. Общая сумма штрафов:
${fineSpeed} + ${N_other * otherVio.fine} = ${totalFine} руб.

4. Математическое ожидание штрафа на одно ТС:
${totalFine} / ${Ntotal} = ${totalFine / Ntotal} руб.
${expectedValue != totalFine / Ntotal ? 'После округления до сотых: ' + expectedValue + ' руб.' : ''}
`;

	chas2.task.setTask({
		text: text,
		analys: analys,
		answers: [expectedValue],
		authors: ['Селена'],
	});

})();
