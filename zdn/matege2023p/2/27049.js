(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let cathet1 = sl(2, 12);
			let cathet2 = sl(2, 12);
			let height = sl(3, 12, 3);
			let radius = cathet1.pow(2) + cathet2.pow(2);

			let rand = sl1();
			let nameFigura = [ //цилиндр,конус
				['объём', radius.pow(2) * height.pow(2), 'делённый на $\\pi$'],
				['площадь боковой поверхности', radius * (2 * height).pow(2), 'делённую на $\\pi$']
			].iz();

			let paint1 = function(ct) {
				ct.scale = (60, 60);
				radius = 180;
				height = 300;
				ct.translate(200, 200);
				ct.lineWidth = 2;
				ct.strokeStyle = "#809DF2";


				//цилиндр
				ct.beginPath();
				ct.ellipse(0, -height / 2, radius, 40, 0, 0, 2 * Math.PI, true);
				ct.stroke();

				ct.beginPath();
				ct.ellipse(0, height / 2, radius, 40, 0, 0, Math.PI);
				ct.stroke();

				ct.setLineDash([4, 4]);
				ct.beginPath();
				ct.ellipse(0, height / 2, radius, 40, 0, Math.PI, 2 * Math.PI);
				ct.stroke();
				ct.setLineDash([]);

				//призма
				ct.strokeStyle = ["#D777F2", "#F2A2D6"].iz();

				ct.beginPath();
				ct.moveTo(-radius, -150);

				//треугольник сверху
				ct.lineTo(90, -116);
				ct.lineTo(150, -radius + 10);
				ct.lineTo(-radius, -150);

				//левая высота
				ct.lineTo(-radius, height - 150);
				ct.stroke();

				//треугольник снизу
				ct.setLineDash([4, 5]);
				ct.lineTo(90, height - 116);
				ct.lineTo(150, height - radius + 10);
				ct.lineTo(-radius, height - 150);
				ct.stroke();

				//высоты призмы
				ct.drawLine(150, height - radius + 10, 150, -radius + 10);
				ct.setLineDash([]);
				ct.drawLine(90, height - 116, 90, -116);

				//правая высота цилиндра
				ct.strokeStyle = "#809DF2";
				ct.moveTo(radius, 150);
				ct.lineTo(radius, -height + 150);
				ct.stroke();

			};
			NAtask.setTask({
				text: 'В основании прямой призмы лежит прямоугольный треугольник с катетами $' + cathet1 + '$ и $' + cathet2 +
					'$. ' +
					'Боковые рёбра призмы равны $' + [height, '\\frac{' + height + '}{\\pi}'][rand] + '$. ' +
					'Найдите ' + nameFigura[0] + ' цилиндра, описанного около этой призмы' + (', ' + nameFigura[2]).esli(1 - rand) +
					'.',
				answers: nameFigura[1].sqrt(),
			});
			NAtask.modifiers.multiplyAnswerBySqrt(3);
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27049 4963 4965 4967 4969 72205 72207 72209 72211 72213 72215 72217 72219 72221 72223 72225 72227 72229 72231 72233 72235 72237 72239 72241 72243 72245 72247 72249 72251 72253
