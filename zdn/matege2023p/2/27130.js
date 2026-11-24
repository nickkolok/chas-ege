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
			const drawScale = 15;
			ct.translate(50, 10);
			ct.scale(drawScale, drawScale);
			ct.lineWidth = 2 / drawScale;
			const cubeEdge = 12;
			const cubeDepth = cubeEdge / 2.5;
			const cubeAngle = 40;
			const sizeRatio = 1.5;
			const smallCubeColor = '#8080ff';
			const cubeColor = 'black';
			if (measurements.some(m => m.name.ie === 'объём')) {
				ct.save();
				ct.translate(44 / drawScale, 71 / drawScale);
				ct.drawParallelepiped({
					width: cubeEdge / sizeRatio,
					height: cubeEdge / sizeRatio,
					depth: cubeDepth / sizeRatio,
					angle: cubeAngle,
					strokeStyle: smallCubeColor,
					diagonalStrokeStyle: smallCubeColor
				}, [0, 2, 3, 4, 6], true, [1, 0.5]);
				ct.restore();
			}

			ct.drawParallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeDepth,
				angle: cubeAngle,
				strokeStyle: cubeColor,
				diagonalStrokeStyle: cubeColor
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

