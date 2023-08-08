(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 100);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		genAssertZ1000(4 * a / 3, 'Кривой ответ');

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLine(10, 350, 390, 350);
			ctx.drawLine(10, 350, 180, 50);
			ctx.drawLine(180, 50, 390, 350);

			ctx.drawLine(180, 50, 180, 350);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 170, 40);
			ctx.fillText(vertices[1], 10 - 5, 370 + 10);
			ctx.fillText(vertices[2], 390 - 10, 370 + 10);
			ctx.fillText(vertices[3], 400 / 2 - 20, 370 + 10);

		};

		NAtask.setTask({
			text: 'В равностороннем треугольнике $' + vertices.slice(0, 3).shuffle().join('') +
				'$ высота $' + [vertices[0], vertices[3]].shuffle().join('') + '$ равна $' + a.texsqrt(sl1()) + '$. Найдите $' +
				vertices.slice(0, 3).iz(2).join('') + '$.',
			answers: (4 * a / 3).sqrt(),
			analys: '',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(7);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 27793 26113 48719 48721 48723 48725 48727 48729 48731 48733 48735 48737 48739 48741 48743 48745 48747 48749 48751 48753 48755 48757 48759 48761 48763 48765 48767
