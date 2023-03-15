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
			ct.translate(50, 10);
			ct.scale(15, 15);
			ct.lineWidth = 2 / 15;
			let cubeEdge = 12;

			ct.strokeStyle = "#8080ff";

			ct.translate(44 / 15, 71 / 15);
			ct.parallelepiped({
				width: cubeEdge / 1.5,
				height: cubeEdge / 1.5,
				depth: cubeEdge / (2.5 * 1.5),
				angle: 40
			}, [0, 2, 3, 4, 6]);
			ct.translate(-44 / 15, -71 / 15);

			ct.strokeStyle = "black";
			ct.parallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeEdge / (2.5),
				angle: 40
			}, [0, 3, 4], [m[0], m[1], m[v2]].includes('квадрат диагонали'));

		};
		NAtask.setTask({
			text: 'Eсли ' + m[0] + ' куба ' + q + 'ь на ' + n[0] + ', то ' + m[1] + ' ' + q + 'ся на ' + n[1] + '. ' +
				'Найдите ' + m[v2] + ' исходного куба.',
			answers: p[v2],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 240,
			height: 240,
			paint: paint1,
		});
	});
})();
