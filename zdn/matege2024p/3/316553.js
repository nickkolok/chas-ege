(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = ['A', 'B', 'C', 'D', 'E', 'F'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);

		let letterQ = letters.slice().permuteCyclic(sl(0, letters.length - 1));
		letterQ = [letterQ.slice(0, 2).shuffleJoin(), [letterQ[2] + '_1', letterQ[3] + '_1'].shuffleJoin()];

		let edge = [sl(1, 10), sl(1, 20).texfracpi(sl(2, 30)), '|\\arc' + ['sin', 'cos', 'tg', 'ctg'].iz() + '(' + sl(1, 9).texfrac(sl(10, 30)) + ')'+'|', sl(1, 20).texsqrtfrac(sl(2, 30))
		].iz();

		let paint1 = function(ctx) {
			ctx.lineWidth = 0.5;
			ctx.translate(20, 100);

			ctx.scale(10, 10);
			ctx.lineWidth = 0.2;

			let width = 13;
			let depth = 13;
			let height = 20;


			ctx.font = "3px liberation_sans";
			ctx.drawPrism6({
				width: width,
				height: height,
				depth: depth,
				angle: Math.PI / 1.5,
				angleCamera: Math.PI / 5,
				scale: 20,
				lettersOnVertex: allLet,
			}, [9, 10, 11, 16, 17], [0.5, 0.6]);

		};
		NAtask.setTask({
			text: 'В правильной шестиугольной призме $ABCDEFA_1B_1C_1D_1E_1F_1$, все рёбра которой ' +
				'равны $' + edge + '$, найдите угол между прямыми $' + letterQ[0] + '$ и $' + letterQ[1] +
				'$. Ответ дайте в градусах.',
			answers: 60,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.variativeABC(allLet);
	});
})();
//316553 503245 316659 316661 316663 316665 316667 316669 316671 316673 316675 316677 316679 316681 316683 316685 316687 316689 316691 316693 316695 316697 316699 316701 316703 316705 316707 316709 316711 316713 316715 316717 316719 316721 316723 316725 316727 316729 316731 316733 316735 316737 316739 316741 316743 316745 316747 316749
