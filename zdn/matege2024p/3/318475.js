(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = ['A', 'B', 'C', 'D'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);

		let paint1 = function(ctx) {
			ctx.translate(100, 50);
			let edge = 24;
			ctx.scale(10, 10);
			ctx.font = "3px liberation_sans";

			ctx.lineWidth = 0.2;
			ctx.drawParallelepiped({
				width: edge * 1.1,
				height: edge * 0.9,
				depth: edge / 2,
				angle: 40,
				lettersOnVertex: allLet,
				scale: 20,
			}, [0, 3, 4], false, [0.4, 0.5]);
		};
		NAtask.setTask({
			text: 'В правильной четырёхугольной призме $ABCDA_1B_1C_1D_1$ известно, ' +
				'что $BD_1=2AD$. Найдите угол между диагоналями $DB_1$ и $CA_1$. Ответ дайте в градусах.',
			answers: 60,
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.variativeABC(allLet);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
// 318475 530450 530552 318575 318577 319053 319055
