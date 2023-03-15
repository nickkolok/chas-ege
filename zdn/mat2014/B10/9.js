(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		var a = sluchch(0.1, 9.9, 0.1);
		var v0 = sl1();

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
			}, [0, 3, 4], true, [0.5, 0.2]);
		};
		NAtask.setTask({
			text: (v0 ? 'Диагональ' : 'Объём') + ' куба рав' + (v0 ? 'на' : 'ен') + ' $' + (v0 ? a : 3 * a * a * a).ts() +
				'\\sqrt{3}$. Найдите ' + (v0 ? 'объём' : 'диагональ') + ' куба.',
			answers: (a * (v0 ? a * a : 3)).ts(),
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 240,
			height: 240,
			paint: paint1,
		});
	});
})();
