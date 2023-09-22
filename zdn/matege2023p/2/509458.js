(function() {
	function volume(edge, height) {
		return edge.pow(2) * height / 3;
	}

	function sideSurfaceArea(edge, height) {
		return 2 * edge * ((edge * 0.5).pow(2) + height.pow(2));
	}

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let ratio1 = sl(2, 10, 0.5);
		let ratio2 = sl(2, 10, 0.5);

		let edge1 = sl(1, 10);
		let height1 = sl(2, 10);
		let volume1 = volume(edge1, height1);
		let area1 = sideSurfaceArea(edge1, height1);

		let edge2 = ratio1 * edge1;
		let height2 = ratio2 * height1;
		let volume2 = volume(edge2, height2);
		let area2 = sideSurfaceArea(edge2, height2);

		let data = [
			[
				['объём', volume1, volume2, volume2 / volume1],
				['площадь боковой поверхности', area1, area2, area2 / area1]
			].iz(), ['сторона основания', edge1, edge2, ratio1],
			['высота', height1, height2, ratio2]
		].shuffle();
		
		let name = (data.T()[0]);
		let knownValue = data.T()[1][0];
		let answer = data.T()[2][0];
		let ratio = data.T()[3];

		genAssert((knownValue * 100).isZ());
		genAssert((answer * 100).isZ());
		genAssert((answer < 1000));

		ratio.forEach(element => {
			genAssert((element * 100).isZ(), 'Значение не целое');
		});


		let paint1 = function(ct) {
			ct.translate(10, 150);
			ct.strokeStyle = "#809DF2";
			ct.scale(10, -10);
			ct.lineWidth = 2 / 15;
			ct.rightPyramid4({
				edge: 12,
				angle: Math.PI / 5,
				height: 13,
			}, [1, 3, 6], [0.5, 0.2], name.includes('высота'));

			ct.translate(23, 2);
			ct.rightPyramid4({
				edge: 14,
				angle: Math.PI / 5,
				height: 16,
			}, [1, 3, 6], [0.5, 0.2], name.includes('высота'));
		};
		NAtask.setTask({
			text: 'Даны две правильные четырёхугольные пирамиды. ' + name[0].toZagl() + ' первой пирамиды составляет ' +
				knownValue + '. ' +
				'У второй пирамиды ' + name[1] + ' в ' + chislitlx(ratio[1], 'раз') + ' больше, а ' + name[2] + ' в ' +
				chislitlx(ratio[2], 'раз') + ' больше, чем у первой. ' +
				'Найдите ' + sklonlxkand(name[0]).ve.replace('сторона', 'сторону').replace('основанию', 'основания') +
				' второй пирамиды.',

			answers: answer,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	}, 10000);

})();
