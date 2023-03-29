(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let edgeOfBase = sl(2, 10);

		let name = [
			['площадь поверхности', edgeOfBase.pow(2), 'равна'],
			['площадь боковой поверхности', 0.75 * edgeOfBase.pow(2), 'равна'],
			['площадь основания', edgeOfBase.pow(2) / 4, 'равна'],
			['объём', edgeOfBase.pow(3) / 12, 'равен'],
			['апофема', edgeOfBase / 2, 'равна'],
			['высота', edgeOfBase / 3, 'равна'],
		].iz(2);
		let question = (name).T()[0].shuffle();
		let numbers = (name).T()[1];
		let verb = (name).T()[2];

		numbers.forEach(element => {
			genAssert((element).isZ(), 'Значение не целое');
		});

		let numbersView = numbers.map((elem) => elem);
		let ps;
		for (let i = 0; i < 2; i++)
			switch (question[i]) {
			case 'объём':
				if (!i)
					numbersView[i] = numbers[i] + '\\sqrt{2}';
				else
					numbersView[i] = numbers[i] * 2;
				ps = '\\sqrt{2}';
				break;
			case 'площадь полной поверхности':
			case 'площадь боковой поверхности':
			case 'площадь основания':
			case 'апофема':
				if (!i)
					numbersView[i] = numbers[i] + '\\sqrt{3}';
				else
					numbersView[i] = numbers[i] * 3;
				ps = '\\sqrt{3}';
				break;
			case 'высота':
				if (!i)
					numbersView[i] = numbers[i] + '\\sqrt{6}';
				else {
					numbersView[i] = numbers[i] * 6;
					ps = '\\sqrt{6}';
				}
				break;

			}

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
			text: 'В тетраэдре ' + question[0] + ' ' + verb[0] + ' $' + numbersView[0] + '$. Чему ' + verb[1] + ' ' +
				question[1] + ' тетраэдра? Ответ умножьте на $' + ps + '$.',

			answers: numbersView[1],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 240,
			height: 240,
			paint: paint1,
		});
	}, 10000);

})();
