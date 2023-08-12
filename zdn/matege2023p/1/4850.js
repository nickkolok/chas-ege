(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 50);
		let b = slKrome(a, 2, 50);
		let h = sl(1, [a, b].minE() - 1);

		let answ = [a, b].minE() * h / [a, b].maxE();

		genAssertZ1000(answ, 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(50, 80, 350, 80);
			ctx.drawLine(10, 320, 310, 320);
			ctx.drawLine(50, 80, 10, 320);
			ctx.drawLine(310, 320, 350, 80);

			//высоты
			ctx.drawLine(50, 80, 50, 320);
			ctx.drawLine(50, 80, 339, 140);

			//прямые углы
			ctx.lineWidth = 1.2;
			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
			ctx.drawLine(50, 320 - 20, 50 + 20, 320 - 20);
			ctx.drawLine(50 + 20, 320, 50 + 20, 320 - 20);

			ctx.drawLine(339 - 20, 140 - 28, 342, 140 - 23);
			ctx.drawLine(339 - 20, 140 - 28, 339 - 25, 140 - 4);

		};

		NAtask.setTask({
			text: 'Стороны параллелограмма равны $' + [a, b].shuffle().join('$ и $') + '$. Высота, ' +
				'опущенная на меньшую из этих сторон, ' +
				'равна $' + h + '$. Найдите высоту, опущенную на большую сторону параллелограмма.',
			answers: answ,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//4850
