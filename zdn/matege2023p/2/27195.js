(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let a = sl(15, 30);
			let b = sl(2, 8);
			let c = sl(15, 30);
			let d = sl(5, c / 2);
			let f = sl(5, a / 2);

			let rand = sl1();
			let question = ['объём', 'площадь поверхности'][rand];
			let answ = [a * b * c - d * f * b, 2 * (a * b + a * c + b * c - f * d + b * d + b * f)][rand];

			let paint1 = function(ctx) {
				ctx.translate(70, 50);
                ctx.lineWidth = 2;
				let koefA = (a > 15 || c > 15) ? 10 : 20;
				a *= koefA;
				f *= koefA;
				d *= koefA;
				c *= koefA;
				let depth = 80;

				angle = -Math.PI - Math.PI / 3;
				ctx.drawParallelepiped({
					width: a,
					height: c,
					depth: depth,
					angle: angle,
					strokeStyle: "#809DF2",
				}, [0, 3, 4], false, [4, 5]);

				ctx.translate(a / 4, c / 4);
				ctx.drawParallelepiped({
					width: f,
					height: d,
					depth: depth,
					angle: angle,
					strokeStyle: "#809DF2",
				}, [1, 2, 3, 5, 6, 7], false, [4, 5]);

				ctx.drawLine(0, d, f + depth * (angle).cos(), d);

				//возрат к начальной точке
				ctx.translate(-a / 4, -c / 4);


				//цифорки
				ctx.beginPath();
				ctx.font = "20px serif";
				ctx.fillText((a / koefA).toString(), a / 2, -5, 15); //a
				ctx.stroke();
				ctx.fillText((b).toString(), depth * (angle).cos() / 2 - 18, -depth * (angle).cos() / 2, 15); //b
				ctx.fillText((c / koefA).toString(), depth * (angle).cos() - 18, c / 2 - depth * (angle).cos(), 15); //c
				ctx.stroke();

				ctx.beginPath();
				ctx.translate(a / 4, c / 4);
				ctx.fillText((d / koefA).toString(), depth * (angle).cos() - 15, -depth * (angle).cos() + d / 2, 15); //d
				ctx.fillText((f / koefA).toString(), depth * (angle).cos() + f / 2, -depth * (angle).cos() + d + 15, 15); //d
				ctx.stroke();


			};
			NAtask.setTask({
				text: 'Найдите ' + question +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: answ,
			});
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27195 25711 25713 25715 25717 25719
