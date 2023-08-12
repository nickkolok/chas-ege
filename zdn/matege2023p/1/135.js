(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'

		let a = sl(2, 89);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		let question = [
			['Найдите величину меньшей дуги ', ' окружности. Ответ дайте в градусах'],
			['Найдите градусную меру дуги ', 'окружности, заключённой внутри этого угла']
		].iz();
		question.splice(1, 0, '$' + vertices.slice(0, 2).shuffle().join('') + '$');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.beginPath();
			ctx.arc(130, 200, 120, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
			ctx.drawLine(130, 200, 380, 200);
			ctx.drawLine(130, 200, 130 + 50, 200 - 110);
			ctx.drawLine(380, 200, 130, 200 - 137); //50:110

			//вписанный
			ctx.drawFilledCircle(130, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 130 + 50, 200 - 115);
			ctx.fillText(vertices[1], 130 + 120 + 10, 200 + 20);
			ctx.fillText(vertices[2], 380, 200 - 10);
			ctx.fillText(vertices[3], 130 - 20, 200);

		};

		NAtask.setTask({
			text: 'Угол $' + vertices[0] + vertices[2] + vertices[3] + '$ равен $'+a+'^\\circ$, где $' + vertices[3] +
				'$ – центр окружности. ' +
				'Его сторона $' + [vertices[0], vertices[2]].shuffle().join('') + '$ касается окружности. ' +
				'Сторона $' + vertices.slice(2, 4).shuffle().join('') + '$ пересекает окружность в точке $' + vertices[1] +
				'$ ' +
				'(см. рис.).' + question.join(' ') + '.',
			answers: 90 - a, //
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//135 137
