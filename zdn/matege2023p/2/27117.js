(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let edge = sl(1, 8);
			let rand = sl1();
			let question = ['объём', 'площадь поверхности'][rand];
			let answ = [7 * edge.pow(3), 30 * edge.pow(2)][rand];

			let paint1 = function(ctx) {
				ctx.translate(150, 210);
				let cubeEdge = 150;
				ctx.lineWidth = 2;
				ctx.drawParallelepiped({
					width: cubeEdge / 1.5,
					height: cubeEdge / 1.5,
					depth: cubeEdge / (2.5 * 1.5),
					angle: 40
				}, [0, 3, 4, 2, 6, 7, 10, ], false, [0, 0.1]);

				ctx.translate(0, cubeEdge * (40).cos());


				ctx.translate(0, cubeEdge * (40).cos());
				ctx.drawParallelepiped({
					width: cubeEdge / 1.5,
					height: cubeEdge / 1.5,
					depth: cubeEdge / (2.5 * 1.5),
					angle: 40
				}, [0, 3, 4], false, [0, 0.1]);


				ctx.translate(cubeEdge * (40).cos(), -cubeEdge * (40).cos());
				ctx.drawParallelepiped({
					width: cubeEdge / 1.5,
					height: cubeEdge / 1.5,
					depth: cubeEdge / (2.5 * 1.5),
					angle: 40
				}, [0, 3, 4, 9, 1, 7, 5], false, [0, 0.1]);


				ctx.translate(-2 * cubeEdge * (40).cos(), 0);
				ctx.drawParallelepiped({
					width: cubeEdge / 1.5,
					height: cubeEdge / 1.5,
					depth: cubeEdge / (2.5 * 1.5),
					angle: 40
				}, [0, 3, 4], false, [0, 0.1]);

				ctx.translate(-26 + cubeEdge * (40).cos(), 20);
				ctx.drawParallelepiped({
					width: cubeEdge / 1.5,
					height: cubeEdge / 1.5,
					depth: cubeEdge / (2.5 * 1.5),
					angle: 40
				}, [0, 2, 1, 3, 4], false, [0, 0.1]);

				ctx.translate(26 - cubeEdge * (40).cos(), -20 - 16);
				ctx.drawParallelepiped({
					width: cubeEdge / 7,
					height: cubeEdge / 9,
					depth: cubeEdge / (5),
					angle: 40
				}, [0, 3, 4, 5, 6, 8, 9, 10, 11], false, [0, 0.1]);

				//заплаточки
				ctx.fillStyle = 'white';
				ctx.fillRect(-126, 10, 30, 20);
				ctx.fillRect(-152, 125, 50, 30);
				ctx.fillRect(-10, 105, 20, 30);


			};
			NAtask.setTask({
				text: 'Найдите ' + question +
					' пространственного креста, изображенного на рисунке и составленного из кубов со стороной равной $' + edge +
					'$.',
				answers: answ,
			});
			NAtask.modifiers.multiplyAnswerBySqrt(3);
			chas2.task.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
// 27117
