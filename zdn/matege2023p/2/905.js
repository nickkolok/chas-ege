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
		let question = sklonlxkand((name).T()[0].shuffle());
		let numbers = (name).T()[1];
		let verb = (name).T()[2];

		numbers.forEach(element => {
			genAssert((element).isZ(), 'Значение не целое');
		});

		genAssert((numbers[1] * 10).isZ() && numbers[1], 'плохой ответ');

		let numbersView = [];
		let ps;
		for (let i = 0; i < 2; i++)
			switch (question[i].ie) {
			case 'объём':
				if (!i)
					numbersView[i] = numbers[i] + '\\sqrt{2}';
				else
					numbersView[i] = numbers[i] * 2;
				ps = '\\sqrt{2}';
				break;
			case 'площадь поверхности':
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
				else
					numbersView[i] = numbers[i] * 6;
				ps = '\\sqrt{6}';
				break;

			}

            let paint1 = function(ct) {
                ct.translate(150, 100);
                ct.scale(15, 15);
                ct.lineWidth = 2 / 15;
                let edgeOfBase = 10;
                ct.drawTetrahedron({
                    side: edgeOfBase,
                    angle: -60.2
                }, [1], [0.5, 0.2], true, true);
            };
		NAtask.setTask({
			text: 'В тетраэдре ' +
				question[0].ie + ' ' + verb[0] + ' $' + numbers[0] + '$. Найдите ' +
				question[1].ve + ' тетраэдра. Ответ умножьте на ' + '$' + ps + '$',
			answers: '$' + numbersView[1].ts(1) + '$.',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 240,
			height: 240,
			paint: paint1,
		});
	}, 10000);

})();
