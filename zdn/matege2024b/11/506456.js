(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = "506456";
		let preference = ['length', 'litres'];
		let rand = getSelectedPreferenceFromList(key, preference);
		
		let length = sl(10, 70, 10);
		let height = sl(5, 40, 5);
		let litres = sl(2, 12, 1);
		let m = sl(1, 9, 1);
		let koeff = (10 + m) / 10;
		let volume = [length * length * height, 100 * litres * m][rand];
		
		let paint1 = function (ct) {
			let edgeColor = om.secondaryBrandColors.iz();
			let randColor = sl1();
			let liquidColor = om.transparentBrandColors[randColor];
			let liquidSurfaceColor = om.primaryBrandColors[randColor];

			let width = 120;
			let tankHeight = 160;
			let depth = 80;
			let angle = Math.acos(5 / 8);
			let liquidHeight = 110;
			let depthX = depth * angle.cos();
			let depthY = depth / 2;

			ct.save();
			ct.translate(65, 250);
			ct.scale(1, -1);

			// Передняя грань жидкости.
			ct.drawSection([
				[0, 0],
				[width, 0],
				[width, liquidHeight],
				[0, liquidHeight],
			], liquidColor);

			// Правая боковая грань жидкости.
			ct.drawSection([
				[width, 0],
				[width + depthX, depthY],
				[width + depthX, depthY + liquidHeight],
				[width, liquidHeight],
			], liquidColor);

			// Рёбра бака.
			ct.drawParallelepiped({
				width: width,
				height: tankHeight,
				depth: depth,
				angle: angle,
				strokeStyle: edgeColor,
			}, [6, 8, 10], false, [5, 3]);

			// Видимая часть поверхности жидкости.
			ct.strokeStyle = liquidSurfaceColor;
			ct.lineWidth = 2;
			ct.drawLine(0, liquidHeight, width, liquidHeight);
			ct.drawLine(
				width,
				liquidHeight,
				width + depthX,
				liquidHeight + depthY
			);

			// Невидимая часть поверхности жидкости.
			ct.setLineDash([5, 3]);
			ct.drawLine(
				0,
				liquidHeight,
				depthX,
				liquidHeight + depthY
			);
			ct.drawLine(
				depthX,
				liquidHeight + depthY,
				width + depthX,
				liquidHeight + depthY
			);
		};

		NAtask.setTask({
			text: 'В бак, имеющий форму правильной четырёхугольной призмы' +
				[' со стороной основания, равной $' + length + '$ см, налита жидкость. Чтобы измерить объём детали сложной формы, её полностью погружают в эту жидкость.',
				 ', налито $' + litres + '$ л воды. После полного погружения в воду детали уровень воды в баке увеличился в ' + chislitlx(koeff, 'раз', '$v') + '.'][rand] +
				[' Найдите объём детали, если после её погружения уровень жидкости в баке поднялся на $' + height + '$ см. Ответ дайте в кубических сантиметрах.',
				 ' Найдите объём детали. Ответ дайте в кубических сантиметрах, зная, что в одном литре $1000$ кубических сантиметров.'][rand],
			answers: volume,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506456
