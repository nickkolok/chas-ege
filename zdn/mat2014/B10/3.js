(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		var a = sluchch(2, 9);
		var v1 = sluchch(0, 3);
		var v2 = slKrome(v1, 0, 3);

		var m = ['ребро', 'площадь поверхности', 'квадрат диагонали', 'объём'];
		var n = [a, 6 * a * a, 3 * a * a, a * a * a];

		let paint1 = function(ct) {
			ct.translate(50, 10);
			ct.scale(15, 15);
			ct.lineWidth = 2 / 15;
			let cubeEdge = 12;

			ct.drawParallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeEdge / (2.5),
				angle: 40
			}, [0, 3, 4], [m[v1], m[v2]].includes('квадрат диагонали'), [0.5, 0.2]);
		};
		NAtask.setTask({
			text: m[v1].toZagl() + ' куба составляет ' + n[v1] + '. ' +
				'Найдите ' + m[v2] + ' куба.',
			answers: n[v2],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 240,
			height: 240,
			paint: paint1,
		});
	});
})();
