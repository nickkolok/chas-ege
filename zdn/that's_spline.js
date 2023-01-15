(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let xs = [];
		let ys = [];
		for (let i = -10; i < 10; i++) {
			xs.push(i);
			ys.push(sl(1, 4, 0.5) * (-1).pm());
		}
		// new a Spline object
		let spline = new Spline(xs, ys);

		// interpolate a line at a higher resolution
		let points = [];
		for (let i = -10; i < 10; i += 0.1) {
			points.push([i, spline.at(i)]);
		}
		let paint1 = function (ct) {
			let h = 500;
			let w = 800;
			ct.translate(400, 250);
			ct.drawCoordPlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);

			ct.scale(30, -30);
			ct.lineWidth = 0.1;
			for (let i = 1; i < points.length; i++)
				ct.drawLine(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
		};
		NAtask.setTask({
			text: '',
			answers: 0,
			analys: '',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 800,
			height: 500,
			paint: paint1,
		});
	});
})();
