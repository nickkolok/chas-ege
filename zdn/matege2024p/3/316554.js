(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = ['A', 'B', 'C', 'D'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);

		let letters1, letters2;

		switch (sl1()) {
		case 0:
			letters1 = letters.slice().iz();
			letters1 += letters1 + '_1';
			letters2 = [letters[0] + letters[2], letters[1] + letters[3]].iz();
			break;
		case 1:
			letters1 = [
				[letters[0], letters[3]],
				[letters[1], letters[2]]
			].iz();
			letters1 = (sl1()) ? letters1.join('_1') : letters1.join('') + '_1';

			letters2 = [letters.slice(0, 2), letters.slice(2, 4)].iz();
			if (sl1()) {
				letters2 = letters2.map((elem) => elem + '_1');
			}
			letters2 = letters2.join('');
			break;
		}


		let paint1 = function(ct) {
			ct.translate(110, 60);
			ct.scale(10, 10);
			ct.lineWidth = 0.1;
			let cubeEdge = 24;

			ct.font = "2.5px liberation_sans";
			ct.lineWidth = 0.2;
			ct.drawParallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeEdge / 2,
				angle: 40,
				scale: 20,
				lettersOnVertex: allLet,
			}, [0, 3, 4], false, [0.5, 0.2]);
		};
		NAtask.setTask({
			text: 'В кубе $ABCDA_1B_1C_1D_1$ найдите угол между прямыми $' + letters1 + '$ и $' + letters2 +
				'$. Ответ дайте в градусах.',
			answers: 90,
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
// 316554 316751 316753 316755 316757 316759 316761 316763 316765 316767 316769 316771
