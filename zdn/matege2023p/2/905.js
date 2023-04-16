(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let edgeOfBase = sl(2, 10);
		let name = [
			['площадь полной поверхности', 3 * edgeOfBase.pow(4), 'равна'],
			['площадь боковой поверхности', 3 * (0.75 * edgeOfBase.pow(2)).pow(2), 'равна'],
			['площадь основания', 3 * (0.25 * edgeOfBase.pow(2)).pow(2), 'равна'],
			['объём', 2 * (edgeOfBase.pow(3) / 12).pow(2), 'равен'],
			['апофема', 3 * (0.5 * edgeOfBase).pow(2), 'равна'],
			['высота', 6 * (edgeOfBase / 3).pow(2), 'равна'],
		].iz(2);

		let question = (name).T()[0];
		let numbers = (name).T()[1];
		let verb = (name).T()[2];

		numbers.forEach(element => {
			genAssert((element * 10).isZ(), 'Значение не целое');
		});

		let paint1 = function(ct) {
			ct.translate(10, 20);
			ct.scale(10, -10);
			ct.lineWidth = 2 / 15;
			ct.rightPyramid3({
				edge: 17,
				angle: Math.PI / 8,
				height: 11,
			}, [1], [0.5, 0.2], question.includes('высота'), question.includes('апофема'));
		};
		NAtask.setTask({
			text: 'В правильном тетраэдре ' + question[0] + ' ' + verb[0] + ' $' + numbers[0].texsqrt(1) + '$. Чему ' +
				verb[1] + ' ' +
				question[1] + ' тетраэдра?',

			answers: numbers[1].sqrt(),
		});
		NAtask.modifiers.multiplyAnswerBySqrt(6);
		chas2.task.modifiers.addCanvasIllustration({
			width: 240,
			height: 240,
			paint: paint1,
		});
	}, 10000);

})();
