(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		var a = sluchch(2, 9); //Ребро было
		var b = sluchch(2, 9); //Изменение ребра
		var c = a + b; //Ребро стало

		var v0 = sl1();
		var v2 = 1 + sl1();
		var v4 = sl1();

		var m = ['ребро', (v4 ? 'площадь поверхности' : 'квадрат диагонали'), 'объём'];
		var n = [c - a, (v4 ? 6 * (c * c - a * a) : 3 * (c * c - a * a)), c * c * c - a * a * a];
		a = v0 ? c : a;
		var p = [a, v4 ? 6 * a * a : 3 * a * a, a * a * a];

		var q = ['увеличит', 'уменьшит'][v0];
		let paint1 = function(ct) {
			ct.translate(100, 60);
			ct.scale(20, 20);
			ct.lineWidth = 2 / 20;
			let cubeEdge = 13;

			ct.translate(44 / 20, 71 / 20);
			ct.drawParallelepiped({
				width: cubeEdge / 1.5,
				height: cubeEdge / 1.5,
				depth: cubeEdge / (2.5 * 1.5),
				angle: 40,
				strokeStyle: "#809DF2",
				diagonalStrokeStyle: ["#D777F2", "#F2A2D6"].iz(),
			}, [0, 2, 3, 4, 6], false, [0.5, 0.2]);
			ct.translate(-64 / 20, -104 / 20);

			ct.drawParallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeEdge / (2.5),
				angle: 40,
				strokeStyle: om.secondaryBrandColors,
				diagonalStrokeStyle: om.primaryBrandColors.iz(),
			}, [0, 3, 4], true, [0.5, 0.2]);
		};
		NAtask.setTask({
			text: 'Eсли ' + m[0] + ' куба ' + q + 'ь на ' + n[0] + ', то ' + m[1] + ' ' + q + 'ся на ' + n[1] + '. ' +
				'Найдите ' + m[v2] + ' исходного куба.',
			answers: p[v2],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
