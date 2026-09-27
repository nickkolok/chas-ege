(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let athletes = [1, 2, 3];
		let judges = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
		let points = sl(150, 190, 5);
		let sport = ['прыжкам в воду', 'синхронному плаванию', 'водному поло', 'прыжкам на батуте', 'бегу', 'метанию копья', 'метанию диска',
			'метанию молота', 'метанию ядра', 'фехтованию', 'боксу', 'скалолазанию', 'боксу', 'стрельбе из лука'].iz();

		let kValues = arrayOfUniqueValues(3, 8.0, 9.5, 0.1);;
		let scores = [];
		for (let i = 0; i < 3; i++) {
			let athleteScores = [];
			for (let j = 0; j < 7; j++) {
				athleteScores.push(sl(5.0, 10.0, 0.1));
			}
			scores.push(athleteScores);
		}
		let finalScores = [];
		for (let i = 0; i < 3; i++) {
			let sorted = [...scores[i]].sortNumeric();
			let sumMiddle = sorted.slice(2, 5).sum();
			finalScores.push(sumMiddle * kValues[i]);;
		}
		let answerNumbers = [];
		for (let i = 0; i < 3; i++) {
			if (finalScores[i] > points) {
				answerNumbers.push(athletes[i]);
			}
		}
		genAssert(answerNumbers.length > 0, 'Все трое спортсменов не нужный итоговый балл');

		let tableHTML = `
      <style>
        .bordered-table, .bordered-table th, .bordered-table td {
          border: 1px solid black;
          border-collapse: collapse;
          padding: 5px;
          text-align: center;
        }
        .bordered-table {
          width: 100%;
        }
      </style>
      <table class="bordered-table">
        <tr>
          <th>Номер спортсмена</th>
          <th>K*</th>` +
			judges.map(j => `<th>${j} судья</th>`).join('') +
			`</tr>`;

		for (let i = 0; i < 3; i++) {
			tableHTML += '<tr>' +
				`<td>${athletes[i]}</td>` +
				`<td>${kValues[i].ts()}</td>` +
				scores[i].map(s => `<td>${s.ts()}</td>`).join('') +
				'</tr>';
		}
		tableHTML += '</table>';

		let text = 'На соревнованиях по ' + sport + ' судьи выставили оценки от $0$ до $10$ трём спортсменам. Результаты приведены в таблице.' +
			tableHTML +
			'*K — коэффициент сложности.' +
			' Итоговый балл вычисляется следующим образом: две наибольшие и две наименьшие оценки отбрасываются, а три оставшиеся складываются, и их сумма умножается на коэффициент сложности.' +
			' В ответе укажите номера спортсменов, итоговый балл которых больше $' + points + '$, без пробелов, запятых и других дополнительных символов.';

		NAtask.setTask({
			text: text,
			answers: answerNumbers.join(''),
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=510728
