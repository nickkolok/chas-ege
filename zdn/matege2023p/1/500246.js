(function() {
	retryWhileError(function() {
		'use strict';
		let angle = sl(10, 89);
		let letter = window.latbukv.iz(4);

		let rand = sl1();
		let answ = rand ? angle * 2 : angle;
		let angleText = [[letter[1], letter[0], letter[2]].randomReverse().join(''), [letter[1], letter[3], letter[2]].randomReverse().join('')];
		angleText = !rand ? angleText.reverse() : angleText;
		let angleNumber = !rand ? angle * 2 : angle;

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.drawArc(200, 200, 180, 0, 2 * Math.PI);
			ctx.fillKrug(200, 200, 2);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			let ver1 = ctx.drawLineAtAngle(210, 20, Math.PI / 3, 300);
			let ver2 = ctx.drawLineAtAngle(210, 20, 4 * Math.PI / 6, 320);
			ctx.drawLine(ver1.x, ver1.y, ver2.x, ver2.y);

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(200, 200, ver2.x, ver2.y);
			ctx.drawLine(200, 200, ver1.x, ver1.y);


			ctx.font = "23px liberation_sans";
			ctx.fillText(letter[0], 210, 20 - 2);
			ctx.fillText(letter[1], ver1.x + 10, ver1.y + 20);
			ctx.fillText(letter[2], ver2.x - 30, ver1.y + 20);

			ctx.fillText(letter[3], 200 + 5, 200);
		};

		NAtask.setTask({
			text: 'Треугольник $' + letter.slice(0, 3).shuffleJoin() + '$ вписан в окружность с центром $' + letter[3] +
				'$. Угол $' + angleText[0] + '$ равен $' + angleNumber + '^\\circ$. ' +
				'Найдите угол $' + angleText[1] + '$. Ответ дайте в градусах.',
			answers: answ,
			analys: ''
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
//500246
