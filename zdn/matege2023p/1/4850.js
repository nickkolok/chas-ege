(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 50);
		let b = slKrome(a, 2, 50);

		let rand = sl1();
		let h = sl(1, !rand ? [a, b].minE() - 1 : [a, b].maxE() - 1);

		let answ = !rand ? [a, b].minE() * h / [a, b].maxE() : [a, b].maxE()* h / [a, b].minE();

		genAssertZ1000(answ, 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.strokeStyle = om.secondaryBrandColors.iz();

			let angle = Math.PI / 2.5;

			let ver1 = ctx.drawLineAtAngle(20, 300, -angle, 250);
			ctx.drawLine(ver1.x, ver1.y, 340, ver1.y);
			ctx.drawLine(20, 300, 300 - 40, 300);
			ctx.drawLine(300 - 40, 300, 340, ver1.y);

			//высоты
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawLine(ver1.x, ver1.y, ver1.x, 300);
			let ver2 = ctx.drawLineAtAngle(ver1.x, ver1.y, -angle - 1.5 * Math.PI, 230);

			//прямые углы
			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.arcBetweenSegments([ver1.x, ver1.y, ver1.x, 300, 300 - 40, 300], 20);
			ctx.arcBetweenSegments([340, ver1.y, ver2.x, ver2.y, ver1.x, ver1.y], 20);
		};

		NAtask.setTask({
			text: 'Стороны параллелограмма равны $' + [a, b].shuffleJoin('$ и $') + '$. Высота, ' +
				'опущенная на ' + ['меньшую', 'большую'][rand] + ' из этих сторон, ' +
				'равна $' + h + '$. Найдите высоту, опущенную на '+['меньшую', 'большую'][1-rand]+' сторону параллелограмма.',
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
