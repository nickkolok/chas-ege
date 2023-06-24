(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let a = sl(10, 17);
			let b = sl(10, 15);
			let c = sl(3, a * 0.6);
			let d = sl(3, b * 0.6);
			let f = sl(4, 8);

			console.log(['a=' + a, 'b=' + b, 'c=' + c, 'd=' + d]);


			let rand = sl1();
			let s = [a * b * f - d * c * f, 2 * (a * b + a * f + b * f - c * d + c * f)][rand];

			let paint1 = function(ctx) {

				ctx.translate(80, 30);
				ctx.lineWidth = 2;
				let koefA = (a > 15 && b > 10) ? 15 : 20;
				a *= koefA;
				b *= koefA;
				c *= koefA;
				d *= koefA;

				let depth = 80;

				angle = -Math.PI - Math.PI / 3;
				ctx.drawParallelepiped({
					width: a,
					height: b,
					depth: depth,
					angle: angle
				}, [0, 3, 4], false, [4, 5]);

				ctx.translate((a - d) / 2, 0);
				ctx.drawParallelepiped({
					width: d,
					height: c,
					depth: depth,
					angle: angle
				}, [ 1, 3, 4, 5], false, [4, 5]);


				ctx.strokeStyle = "white";
				ctx.drawLine(1, 0, d - 0.5, 0);
				ctx.translate(depth * (angle).cos() + 5, -depth * (angle).cos());
				ctx.drawLine(-2, 0, d - 5, 0);

				ctx.strokeStyle = "black";
				ctx.font = "20px serif";
				ctx.fillText(a / koefA, a / 3 + depth * (angle).cos(), b + 17, 18);
				ctx.fillText(f, -depth * (angle).cos() - 20, 0, 18);
				ctx.translate(0, c / 2);


				ctx.fillText(c / koefA, 0, 0, 18);

				ctx.translate(d / 2, c / 2);
				ctx.fillText(d / koefA, 0, -5, 18);

				ctx.translate(d / 2 + (a - d) / 2, 0);
				ctx.fillText(b / koefA, 0, -5, 18);
			};
			NAtask.setTask({
				text: 'Найдите ' + ['объём', 'площадь поверхности'][rand] +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: s,
			});
			chas2.task.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27192 25651 25655 25659 25653 25657 27191 25631 25633 25635 25637 25639
