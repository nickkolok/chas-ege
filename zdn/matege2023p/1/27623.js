(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 89);
		let b = slKrome(a, 2, 89);

		let rand = sl1();
		let h = rand ? sl(1, [a, b].minE() - 1) : sl(1, [a, b].maxE() - 1);
		let answ = rand ? [a, b].maxE() * h / [a, b].minE() : [a, b].minE() * h / [a, b].maxE();
		let moreLess = rand ? ['большую', 'меньшую'] : ['большую', 'меньшую'].reverse();

		genAssertZ1000(answ, 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 150, 70);
			ctx.drawLine(150, 70, 390, 370);

			ctx.drawLine(10, 370, 270, 220);
			ctx.drawLine(79, 220, 390, 370);

			//прямой угол
			ctx.lineWidth = 1;
			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();

			ctx.drawLine(79 + 20, 220 + 10, 90 + 20, 200 + 10);
			ctx.drawLine(79 + 10, 220 - 19, 90 + 20, 200 + 10);

			ctx.drawLine(270 - 35, 220 - 7, 270 - 20, 220 + 13);
			ctx.drawLine(270 - 35, 220 - 7, 270 - 15, 220 - 20);

		};

		NAtask.setTask({
			text: 'Две стороны треугольника равны $' + [a, b].shuffle().join('$ и $') + '$. ' +
				'Высота, опущенная на ' + moreLess[0] + ' из этих сторон,' +
				' равна $' + h + '$. Найдите высоту, опущенную на ' + moreLess[1] + ' из этих сторон треугольника.',
			answers: answ,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 27623 56755 56801 56805 513617 56757 56759 56761 56763 56765 56767 56769 56771 56773 56775 56777 56779 56781 56783 56785 56787 56789 56791 56793 56795 56797 56799 56803
