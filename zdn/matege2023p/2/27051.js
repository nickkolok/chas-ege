(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);

			let rand1 = sl1();
			let rand2 = sl1();

			let radius = sl(1, 20);
			let cyl = new Cylinder({
				radius: radius,
				height: [sl(1, 20), radius][rand2],
			});
			let cone = new Cone({
				radius: cyl.radius,
				height: [cyl.height, cyl.radius][rand2]
			});

			let nameFigura = [ //цилиндр,конус
				['объём', cyl.volume / Math.PI, cone.volume / Math.PI],
				['площадь боковой поверхности', cyl.sideSurfaceArea / Math.PI, cone.sideSurfaceArea / Math.PI]
			][rand2];

			let paint1 = function(ctx) {
				ctx.scale = (60, 60);
				radius = 180;
				height = 300;
				ctx.translate(200, 200);
				ctx.strokeStyle = om.secondaryBrandColors;

				ctx.lineWidth = 2;
				//цилиндр
				ctx.drawEllipse(0, -height / 2, radius, 40, 0, 0, 2 * Math.PI);
				ctx.drawEllipse(0, height / 2, radius, 40, 0, 0, Math.PI);
				
				ctx.setLineDash([4, 5]);
				ctx.drawEllipse(0, height / 2, radius, 40, 0, Math.PI, 2 * Math.PI);

				ctx.setLineDash([0, 0]);
				ctx.drawLine(-radius, height / 2, -radius, -height / 2);
				ctx.drawLine(radius, height / 2, radius, -height / 2);

				//конус
				ctx.strokeStyle = om.primaryBrandColors.iz();
				ctx.setLineDash([4, 5]);
				ctx.drawLine(-radius, height / 2, 0, -height / 2);
				ctx.drawLine(radius, height / 2, 0, -height / 2);

				ctx.setLineDash([4, 5]);
				ctx.drawLine(0, height / 2, 0, -height / 2);
				ctx.drawLine(0, height / 2, radius, height / 2);
			};
			console.log(rand1, rand2, nameFigura[1 + rand1].texsqrtpi(), nameFigura[2 - rand1].texsqrtpi());

			NAtask.setTask({
				text: 'Цилиндр и конус имеют общие основание и высоту. ' + 'Высота цилиндра равна радиусу основания. '.esli(rand2) +
					nameFigura[0].toZagl() + ' ' + ['цилиндра', 'конуса'][rand1] + ' ' + ['равен', 'равна'][rand2] +
					' $' + nameFigura[1 + rand1].pow(2).texsqrt(1) + '$. Найдите ' + nameFigura[0] + ' ' + ['конуса', 'цилиндра'][rand1] + '.',
				answers: nameFigura[2 - rand1],
			});
			NAtask.modifiers.multiplyAnswerBySqrt(13);
			NAtask.modifiers.allDecimalsToStandard(true);
			NAtask.modifiers.assertSaneDecimals();
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		10000);

})();
// 27051 4989 5019 514020 514039 526247 642312 4991 4993 4995 4997 4999 5001 5003 5005 5007 5009 5011 5013 5015 5017  27064 5059 72967 72969 72971 72973 72975 72977 72979 72981 72983 72985 72987 72989 72991 72993 72995 72997 72999 73001 73003 73005 73007 73009 73011
