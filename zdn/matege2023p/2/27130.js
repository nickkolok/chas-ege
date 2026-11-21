(function() {
	retryWhileError(function() {
		lx_declareClarifiedPhrase('площадь', 'поверхности');
		lx_declareClarifiedPhrase('квадрат', 'диагонали');
		NAinfo.requireApiVersion(0, 2);
		let measurements = [{
			name: 'ребро',
			power: 1,
		}, {
			name: 'площадь поверхности',
			power: 2,
		}, {
			name: 'объём',
			power: 3,
		}, {
			name: 'диагональ',
			power: 1,
		}, {
			name: 'квадрат диагонали',
			power: 2,
		}, ].iz(2);

		let paint1 = function(ct) {
			ct.translate(50, 10);
			ct.scale(15, 15);
			ct.lineWidth = 2 / 15;
			let cubeEdge = 12;
						if (measurements.some(m => m.name.ie === 'объём')) {
								ct.translate(44 / 15, 71 / 15);
				ct.drawParallelepiped({
					width: cubeEdge / 1.5,
					height: cubeEdge / 1.5,
					depth: cubeEdge / 2.5 / 1.5,
					angle: 40,
					strokeStyle: "#8080ff"
				}, [0, 2, 3, 4, 6], true, [1, 0.5]);
				ct.translate(-44 / 15, -71 / 15);
							}

			ct.drawParallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeEdge / 2.5,
				angle: 40,
				strokeStyle: "black"
			}, [0, 3, 4], true, [0.5, 0.2]);

		};

		NAtask.setDilationTask({
			measurements: measurements,
			figureName: 'куб',
			dilationCoefficient: sl(2, 10),
			authors: ['Суматохина Ася'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	});

})();
