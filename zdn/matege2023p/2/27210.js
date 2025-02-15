(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let a = sl(7, 13);
			let b = sl(2, 8);
			let c = sl(5, 7);
			let d = sl(2, 10);
			let f = sl(a, 17);
			let k = sl(2, 6);

			let rand = sl1();
			let question = ['объём', 'площадь поверхности'][rand];
			let answ = [f * k * (d + b) + a * b * c, 2 * (k * (b + d) + k * f + f * (b + d)) + 2 * (a * c + c * b)][rand];


			let paint1 = function(ctx) {
				ctx.translate(115, 50);
				let koefA = (a > 11 && c > 10) ? 10 : 15;
				a *= koefA;
				f *= koefA;
				let depth = 80;
				c *= koefA;
				angle = -Math.PI - Math.PI / 3;
				ctx.drawParallelepiped({
					width: a,
					height: c,
					depth: depth,
					angle: angle
				}, [0, 3, 4], false, [4, 5]);


				ctx.translate(0, c);
				ctx.drawParallelepiped({
					width: f,
					height: c,
					depth: depth * 2,
					angle: angle
				}, [0, 2, 3, 4, 6], false, [4, 5]);

				//возрат к начальной точке
				ctx.translate(0, -c);
				ctx.drawLine(a, c, f, c);
				ctx.drawLine(depth * angle.cos(), c - depth * angle.cos(), 2 * depth * angle.cos(), c - 2 * depth * angle.cos());

				//цифорки
				ctx.beginPath();
				ctx.font = "20px serif";
				ctx.fillText(a / koefA, a / 2, -5, 15); //a
				ctx.stroke();
				ctx.moveTo(0, 0);
				ctx.fillText(b, depth * angle.cos() / 2 - 18, -depth * angle.cos() / 2, 15); //b
				ctx.fillText(c / koefA, depth * angle.cos() - 18, c / 2 - depth * angle.cos(), 15); //c

				ctx.stroke();

				ctx.beginPath();
				ctx.translate(depth * angle.cos(), c - depth * angle.cos());
				ctx.moveTo(0, 0);
				ctx.fillText(d, depth * angle.cos() / 2 - 15, -depth * angle.cos() / 2, 15); //d
				ctx.stroke();

				ctx.beginPath();
				ctx.translate(depth * angle.cos(), -depth * angle.cos());
				ctx.moveTo(0, 0);
				ctx.fillText(k, -18, c / 2, 15); //k
				if (a != f)
					ctx.fillText(f / koefA, f / 2 - depth * angle.cos(), k + c + 15, 15); //k
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
// 27210 25871 25875 25873 25877 25879
