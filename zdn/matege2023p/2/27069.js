(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let edgeOfBase = sl(1, 20);
		let height = sl(1, 20);
		let numberOfEdge = [3, 3, 4, 6].iz();
		let apothem = [(height.pow(2) + edgeOfBase.pow(2) / 12).sqrt(), (height.pow(2) + 0.25 * edgeOfBase.pow(2)).sqrt(),
			0, (height.pow(2) + 0.75 * (edgeOfBase).pow(2)).sqrt()
		][numberOfEdge - 3];

		let question = [
			['площадь основания', 0.25 * numberOfEdge * edgeOfBase.pow(2) * (Math.PI / numberOfEdge).ctg()],
			['площадь боковой поверхности', 0.5 * numberOfEdge * edgeOfBase * apothem],
			['апофема', apothem],
			['высота', height],
			['сторона основания', edgeOfBase],
		].iz(3);

		let name = question.T()[0];
		let number = question.T()[1];

		number.forEach(element => {
			genAssert((element * 1000).isZ(), 'Значение не целое');
		});
		let paint1 = function(ct) {
			ct.translate(30, 60);
			ct.scale(15, -15);
			ct.lineWidth = 2 / 20;
			ct.strokeStyle = "#809DF2";
			switch (numberOfEdge) {
			case 3:
				ct.rightPyramid3({
					edge: 17,
					angle: Math.PI / 8,
					height: 13,
				}, [1], [0.5, 0.2], name.includes('высота'), name.includes('апофема'));
				break;
			case 4:
				ct.rightPyramid4({
					edge: 13,
					angle: Math.PI / 4,
					height: 14,
				}, [1, 3], [0.5, 0.2], name.includes('высота'), name.includes('апофема'));
				break;
			case 6:
				ct.translate(1, -13);
				ct.rightPyramid6({
					edge: 7,
					angle: Math.PI / 3,
					height: 14,
				}, [0, 2, 4, 7, 9], [0.5, 0.2], name.includes('высота'), name.includes('апофема'));
				break;
			}
		};

		NAtask.setTask({
			text: 'В правильной ' + ['тре', 'четырёх', '', 'шести'][numberOfEdge - 3] +
				'угольной пирамиде ' + name[0] + [' составляет ', ' равна '].iz() + number[0] + '; ' + name[1] + [
					' составляет ', ' равна '
				].iz() + number[1] +
				'. Чему равна ' + name[2] + ' пирамиды?',
			answers: number[2],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 10000);

})();
