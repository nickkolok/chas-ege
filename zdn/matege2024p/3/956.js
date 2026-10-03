(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = ['A', 'B', 'C'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);

		let hight = letters.iz();
		hight += hight + '_1';
		let diagonal = letters.iz(2).join('_1');

		let a = sl(1, 20);

		let paint1 = function(ctx) {
			ctx.translate(110, 50);
			let edge = 25;
			ctx.scale(10, 10);
			ctx.lineWidth = 0.2;
			ctx.font = "3px liberation_sans";
			ctx.drawPrism({
				width: edge,
				height: edge * 0.8,
				depth: edge * 0.8,
				angle: Math.PI / 1.8,
				scale: 10,
				lettersOnVertex: allLet,
			}, [0, 3, 4], [0.4, 0.5]);
		};


		NAtask.setTask({
			text: 'В правильной треугольной призме $ABCA_1B_1C_1$, все рёбра которой равны $' + a +
				'$, найдите угол между прямыми $' + hight + '$ и $' + diagonal + '$.',
			answers: 45,
			analys: '',
		});
		NAtask.modifiers.variativeABC(allLet);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//https://ege314.ru/8-stereometriya-ege/reshenie-956/
