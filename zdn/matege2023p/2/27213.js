(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let a = sl(7, 15);
			let b = sl(2, 8);
			let c = sl(5, 7);
			let d = sl(2, 10);
			let f = sl(2, 4);
			let k = sl(2, 6);

			let rand = sl1();
			let question = ['объём', 'площадь поверхности'][rand];
			let answ = [k * d * a + f * b * k + a * b * c, 2 * (a * b + a * c + a * d + a * k + b * c + b * f + b * k + d * k +
				f * k)][rand];


			let paint1 = function(ctx) {
				ctx.translate(115, 50);
				ctx.lineWidth = 2;
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
					width: a,
					height: c,
					depth: depth * 2,
					angle: angle
				}, [0, 1, 2, 3, 4, 5, 6], false, [4, 5]);


				ctx.translate(depth * (angle).cos(), -depth * (angle).cos());
				ctx.drawParallelepiped({
					width: a,
					height: c,
					depth: depth,
					angle: angle
				}, [0, 1, 2, 3, 4, 8, 9, 10, 11], false, [0, 0]);

				ctx.strokeStyle = "black";
				ctx.translate(a - depth * (angle).cos(), depth * (angle).cos());
				ctx.drawParallelepiped({
					width: f,
					height: c,
					depth: depth,
					angle: angle
				}, [0, 3, 4, 6], false, [4, 5]);

				//возрат к начальной точке
				ctx.translate(0, -c);
				ctx.translate(-depth * (angle).cos(), depth * (angle).cos());
				ctx.translate(-a + depth * (angle).cos(), -depth * (angle).cos());

				//цифорки
				ctx.beginPath();
				ctx.font = "20px serif";
				ctx.fillText((a / koefA).toString(), a / 2, -5, 15); //a
				ctx.stroke();
				ctx.moveTo(0, 0);
				ctx.fillText((b).toString(), depth * (angle).cos() / 2 - 18, -depth * (angle).cos() / 2, 15); //b
				ctx.fillText((c / koefA).toString(), depth * (angle).cos() - 18, c / 2 - depth * (angle).cos(), 15); //c
				//ctx.lineTo(depth * (angle).cos(), c - depth * (angle).cos()); //c

				ctx.stroke();

				ctx.beginPath();
				ctx.translate(depth * (angle).cos(), c - depth * (angle).cos());
				ctx.moveTo(0, 0);
				ctx.fillText((d).toString(), depth * (angle).cos() / 2 - 15, -depth * (angle).cos() / 2, 15); //d
				ctx.stroke();

				ctx.beginPath();
				ctx.translate(depth * (angle).cos(), -depth * (angle).cos());
				ctx.moveTo(0, 0);
				ctx.fillText((k).toString(), -18, c / 2, 15); //k
				ctx.fillText((f / koefA).toString(), a - depth * (angle).cos() + f / 2, c / 4 - c * (angle).cos(), 15); //k
				ctx.stroke();



			};
			NAtask.setTask({
				text: 'Найдите ' + question +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: answ,
			});
			NAtask.modifiers.multiplyAnswerBySqrt(3);
			chas2.task.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
// 27213 25931 25933 25935 25937 25939
