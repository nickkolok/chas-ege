(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = ['A', 'B', 'C', 'D'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);
		

		let paint1 = function(ctx) {
			ctx.translate(95, 50);
			let edge = 25;
			ctx.scale(10, 10);

			ctx.lineWidth = 0.2;
			ctx.font = "2.5px liberation_sans";
			ctx.drawParallelepiped({
				width: edge*1.1,
				height: edge*0.9,
				depth: edge / 2,
				angle: 40,
				lettersOnVertex: allLet,
				scale: 20,
			}, [0, 3, 4], false, [0.4, 0.5]);
		};
		NAtask.setTask({
			text: 'В правильной четырёхугольной призме $ABCDA_1B_1C_1D_1$ известно, '+
			'что $BD1=2AD$. Найдите угол между диагоналями $DB_1$ и $CA_1$. Ответ дайте в градусах.',
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
