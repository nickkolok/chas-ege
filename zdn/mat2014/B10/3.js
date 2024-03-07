(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		var a = sluchch(2, 9);
		
		var m = ['ребро', 'площадь поверхности', 'квадрат диагнали', 'объём', 'диагналь'];
		var n = [a, 6 * a * a, 3 * a * a, a * a * a, (3 * a * a).sqrt()];
		
		var v1 = sluchch(0, m.length);
		
		genAssertZ1000(n[v1]);
		var v2 = slKrome(v1, 0, m.length);

		let paint1 = function(ct) {
			ct.translate(110, 60);
			ct.scale(20, 20);
			ct.lineWidth = 2 / 20;
			let cubeEdge = 12;

			ct.drawParallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeEdge / (2.5),
				angle: 40,
				strokeStyle: om.secondaryBrandColors,
				diagonalStrokeStyle: om.primaryBrandColors.iz(),
			}, [0, 3, 4], [m[v1], m[v2]].includes('квадрат диагонали'), [0.5, 0.2]);
		};
		NAtask.setTask({
			text: m[v1].toZagl() + ' куба составляет ' + n[v1] + '. ' +
				'Найдите ' + m[v2] + ' куба.',
			answers: n[v2],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
