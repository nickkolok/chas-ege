(function() {
	retryWhileError(function() {
		'use strict';
		let angle = sl(10, 89);
		let letter = [slLetter().toZagl()];
		while (letter.length != 4) {
			let lt = slLetter().toZagl();
			letter.pushIf(lt, !letter.includes(lt));
		}
		NAtask.setTask({
			text: 'Треугольник $' + letter[0] + letter[1] + letter[2] + '$ вписан в окружность с центром $' + letter[3] +
				'$. Угол $' + letter[1] + letter[0] + letter[2] + '$ равен $' + angle + '^\\circ$.' +
				'Найдите угол $' + letter[1] + letter[3] + letter[2] + '$ . Ответ дайте в градусах.',
			answers: angle * 2,
			analys: ''
		});
	});
})();
//SugarHedgehog
//500246
