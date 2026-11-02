(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '3489';
		let preference = ['wallToSides', 'sidesToWall'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Сила натяжения, при которой нить разорвётся, Н
		let F = sl(2, 20) * 5;

		// Все существительные женского рода — согласования стабильны
		let obj = sklonlxkand(['нить', 'верёвка', 'леска', 'бечёвка'].iz());
		let attach = [
			'вбитому в стену гвоздю',
			'вбитому в кирпичную стену гвоздю',
			'вкрученному в деревянный столб крюку',
			'вбитому в бетонную стену крюку',
		].iz();

		let text;
		let analys;
		if (rand === 0) {
			text =
				obj.ie.toZagl() + ', привязанная одним концом к ' + attach + ', разорвётся, ' +
				'если другой её конец тянуть с силой не менее $' + F + '$ Н. ' +
				'С какой наименьшей силой F надо растягивать эту же ' + obj.ve + ' в разные стороны, ' +
				'чтобы она порвалась? Ответ дайте в ньютонах.';
			analys =
				'Когда один конец ' + obj.re + ' закреплён, а за второй тянут с силой $' + F + '$ Н, ' +
				'по третьему закону Ньютона опора действует на ' + obj.ve + ' в противоположную сторону ' +
				'с такой же по модулю силой, и натяжение равно $' + F + '$ Н — именно при таком натяжении ' + obj.ie + ' рвётся. ' +
				'При растягивании ' + obj.re + ' в разные стороны с силой F с каждого конца натяжение также равно F. ' +
				'Следовательно, наименьшая сила F, при которой ' + obj.ie + ' порвётся, равна $' + F + '$ Н.';
		} else {
			text =
				obj.ie.toZagl() + ' разорвётся, если растягивать её в разные стороны с силой не менее $' + F + '$ Н с каждого конца. ' +
				'Один конец ' + obj.re + ' привязали к ' + attach + '. ' +
				'С какой наименьшей силой надо тянуть второй конец, чтобы ' + obj.ie + ' порвалась? Ответ дайте в ньютонах.';
			analys =
				'При растягивании ' + obj.re + ' в разные стороны с силой $' + F + '$ Н с каждого конца натяжение равно $' + F + '$ Н — ' +
				'значит, именно при таком натяжении ' + obj.ie + ' рвётся. ' +
				'Если один конец привязан к ' + attach + ', то по третьему закону Ньютона опора тянет ' + obj.ve + ' в противоположную сторону ' +
				'с такой же по модулю силой, с какой тянут за свободный конец. ' +
				'Поэтому натяжение достигнет порога разрыва, когда за свободный конец потянут с силой $' + F + '$ Н.';
		}

		NAtask.setTask({
			text: text,
			answers: F,
			analys: analys,
		});

		// Рисунок: нить, растягиваемая в разные стороны силами F
		NAtask.modifiers.addCanvasIllustration({
			width: 460,
			height: 100,
			belowText: true,
			paint: function (ct) {
				let y = 40;
				let x1 = 30;
				let x2 = 430;
				let dot1 = 130;
				let dot2 = 330;
				let headLength = 14;
				let headWidth = 7;

				// нить
				ct.strokeStyle = 'black';
				ct.lineWidth = 3;
				ct.beginPath();
				ct.moveTo(x1, y);
				ct.lineTo(x2, y);
				ct.stroke();

				// острия стрелок, направленные наружу
				ct.beginPath();
				ct.moveTo(x1, y);
				ct.lineTo(x1 + headLength, y - headWidth);
				ct.moveTo(x1, y);
				ct.lineTo(x1 + headLength, y + headWidth);
				ct.moveTo(x2, y);
				ct.lineTo(x2 - headLength, y - headWidth);
				ct.moveTo(x2, y);
				ct.lineTo(x2 - headLength, y + headWidth);
				ct.stroke();

				// точки приложения сил
				ct.fillStyle = 'black';
				ct.beginPath();
				ct.arc(dot1, y, 7, 0, 2 * Math.PI);
				ct.fill();
				ct.beginPath();
				ct.arc(dot2, y, 7, 0, 2 * Math.PI);
				ct.fill();

				// подписи F
				ct.font = 'italic 22px serif';
				ct.fillText('F', x1 + 16, y + 36);
				ct.fillText('F', x2 - 28, y + 36);
			},
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3489
// https://phys-oge.sdamgia.ru/problem?id=26079
