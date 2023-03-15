(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let cubeEdge = sl(2, 10);
		let ratio = sl(2, 20, 0.5);

		let name = ['ребро', 'площадь поверхности', 'объём', 'квадрат диагонали', 'диагональ'];
		let question = name.iz(2);

		let number = [
			[0, ratio.pow(2), ratio.pow(3), ratio.pow(2), ratio],
			[ratio.sqrt(), 0, ratio.pow(1.5), ratio, ratio.sqrt()],
			[Math.cbrt(ratio), Math.cbrt(ratio.pow(2)), 0, Math.cbrt(ratio.pow(2)), Math.cbrt(ratio)],
			[ratio.sqrt(), ratio, ratio.pow(1.5), 0, ratio.sqrt()],
			[ratio.sqrt().sqrt(), ratio.pow(0.75), ratio.sqrt(), 0],
		];

		let answ = number[name.indexOf(question[0])][name.indexOf(question[1])];
		genAssert((answ * 100).isZ() && answ, 'плохой ответ');

		let paint1 = function(ct) {
			ct.translate(50, 10);
			ct.scale(15, 15);
			ct.lineWidth = 2 / 15;
			let cubeEdge = 12;
			ct.strokeStyle = "#8080ff";
			if (question.includes('площадь поверхности') || question.includes('объём')) {
				ct.setLineDash([1, 0.5]);
				ct.translate(44 / 15, 71 / 15);
				ct.drawParallelepiped({
					width: cubeEdge / 1.5,
					height: cubeEdge / 1.5,
					depth: cubeEdge / (2.5 * 1.5),
					angle: 40
				}, [0, 2, 3, 4, 6], true, [0.5, 0.2]);
				ct.translate(-44 / 15, -71 / 15);
				ct.strokeStyle = "black";
			}

			ct.drawParallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeEdge / (2.5),
				angle: 40
			}, [0, 3, 4], true, [0.5, 0.2]);

		};

		NAtask.setTask({
			text: 'Во сколько раз увеличится ' + question[1] + ' куба, если его ' + question[0] + ' увеличится в ' +
				chislitlx(ratio, 'раз') + '?',
			answers: answ,
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	});

})();
