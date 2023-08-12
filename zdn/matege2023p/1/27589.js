(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);

		genAssertZ1000(a.pow(2) * 0.25, 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 180, 50);
			ctx.drawLine(180, 50, 390, 370);

			//штрихи
			ctx.lineWidth = 1;
			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
			ctx.drawLine(275, 210, 300, 200);
			ctx.drawLine(80, 200, 105, 210);

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
