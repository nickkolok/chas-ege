(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		let a = sl(2, 89);
		let b = sl(90, 179);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 3);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(200, 200, 180, 0, 2 * Math.PI);
			ctx.stroke();

			//вписанный

			ctx.drawLine(200 + 180, 200 + 10, 200 - 80, 200 - 160);
			ctx.drawLine(200 - 180, 200 + 10, 200 - 80, 200 - 160);

			ctx.drawFilledCircle(200, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 200 - 180 - 22, 200 + 10);
			ctx.fillText(vertices[1], 200 + 180 + 5, 200 + 10);
			ctx.fillText(vertices[2], 200 - 90, 200 - 170);

		};

		NAtask.setTask({
			text: 'На окружности отмечены точки $' + vertices[0] + '$, $' + vertices[1] + '$ и $' + vertices[2] + '$. ' +
				'Дуга окружности $' + [vertices[0], vertices[2]].shuffle().join('') + '$, не содержащая точку $' + vertices[1] +
				'$, составляет $' + a + '^\\circ$. ' +
				'Дуга окружности $' + vertices.slice(1, 4).shuffle().join('') + '$, не содержащая точку $' + vertices[0] +
				'$, составляет $' + b +
				'^\\circ$. ' +
				'Найдите вписанный угол $' + vertices.permuteCyclic(1).join('') + '$. Ответ дайте в градусах.',
			answers: (360 - a - b) / 2,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//131
