(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLineAtAngle(30, 300, -Math.PI / 3, 340);
			ctx.drawLineAtAngle(370, 300, 4 * Math.PI / 3, 340);
			ctx.drawLine(30, 300, 370, 300);

			//штрихи
			ctx.lineWidth = 1;
			ctx.strokeInMiddleOfSegment(30, 300, 200, 10, 10);
			ctx.strokeInMiddleOfSegment(370, 300, 200, 10, 10);
		};

		NAtask.setTask({
			text: 'Угол при вершине, противолежащей основанию равнобедренного треугольника, равен $30^\\circ$. ' +
				'Боковая сторона треугольника равна $' + a + '$. Найдите площадь этого треугольника.',
			answers: a.pow(2) * 0.25,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 27589 55203 55155 55157 55159 55161 55163 55165 55167 55169 55171 55173 55175 55177 55179 55181 55183 55185 55187 55189 55191 55193 55195 55197 55199 55201
