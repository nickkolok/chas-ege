(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let a = sl(10, 17);
			let b = sl(10, 15);
			let c = sl(7, 15);
			let d = sl(3, b * 0.8);
			let f = sl(4, (a - 1));
			let k = sl(4, c - 1);

			console.log(['a=' + a, 'b=' + b, 'c=' + c, 'd=' + d, 'f=' + f, 'k=' + k]);


			let rand = sl1();
			let s = [a * b * c - (a - f) * k * d, 2 * (a * b + a * c + b * c)][rand];

			let paint1 = function(ctx) {

				ctx.translate(70, 30);
				ctx.lineWidth = 2;
				let koefA = (a > 15 && b > 10) ? 15 : 20;
				a *= koefA;
				b *= koefA;
				d *= koefA;
				f *= koefA;

				let depth = 80;

				angle = -Math.PI - Math.PI / 3;
				ctx.font = "20px serif";
				ctx.fillText(a / koefA, a / 2 + depth * (angle).cos(), b + 25, 18);
				ctx.fillText(b / koefA, depth * (angle).cos() - 20, b / 2, 18);
				ctx.fillText(c, depth * (angle).cos(), -depth * (angle).cos() / 2, 18);

				ctx.fillText(d / koefA, depth * (angle).cos() - 20 + f, d / 2 - depth * (angle).cos(), 18);
				ctx.fillText(f / koefA, f / 2 + depth * (angle).cos(), -depth * (angle).cos() - 5, 18);
				ctx.fillText(k, depth * (angle).cos() + f + 5, -depth * (angle).cos() / 2, 18);

				ctx.drawParallelepiped({
					width: a,
					height: b,
					depth: depth,
					angle: angle,
					strokeStyle: "#809DF2",
				}, [0, 3, 4], false, [4, 5]);

				ctx.translate((f), 0);
				ctx.lineWidth = 3;
				ctx.drawParallelepiped({
					strokeStyle: "white",
					width: (a - f),
					height: d,
					depth: depth,
					angle: angle,
				}, [], false, [4, 5]);
				ctx.lineWidth = 2;

				ctx.strokeStyle = "black";
				ctx.drawParallelepiped({
					width: (a - f),
					height: d,
					depth: depth / 3,
					angle: angle,
					strokeStyle: "#809DF2",
				}, [0, 3, 4, 5, 6], false, [0, 5]);

				ctx.translate((depth / 3) * (angle).cos(), -(depth / 3) * (angle).cos());
				ctx.drawParallelepiped({
					width: (a - f),
					height: d,
					depth: depth + 2 * (depth / 3) * (angle).cos(),
					angle: angle,
					strokeStyle: "#809DF2",
				}, [0, 3, 7, 9, 10], false, [0, 5]);
			};
			NAtask.setTask({
				text: 'Найдите ' + ['объём', 'площадь поверхности'][rand] +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: s,
			});
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27190 25611 25615 25619 25613 25617
//by _zevs
//refactoring by SugarHedgehog
