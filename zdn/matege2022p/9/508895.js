(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		function f(x) {
			return k * x + b;
		}

		let k = [1, 2, 3, 0.2, 0.4, 0.5].iz().pm();
		let b = sluchch(0, 3).pm();
		let chisl = sluchch(7, 20, 0.5).pm();

		let points = intPoints(f, {
			minX: -7,
			maxX: 7,
			minY: -7,
			maxY: 7
		});

		let paint1 = function(ct) {
			let h = 400;
			let w = 400;
			//Оси координат
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);

			ct.scale(20, -20);
			ct.lineWidth = 0.1;

			graph9AdrawFunction(ct, f, {
				minX: -8.5,
				maxX: 8.5,
				minY: -8.5,
				maxY: 8.5,
				step: 0.5,
			});

			graph9AmarkCircles(ct, points, 2, 0.2);
		};


		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=kx+b$. Найдите `,
			questions: [{
				text: `$f(${chisl})$`,
				answer: chisl * k + b,
			}, {
				text: `значение $x$, при котором $f(x)=${chisl * k+ b }$`,
				answer: chisl,
				analys: (`, $x=\\frac{${chisl}-${b}}{${k}}$`).replace('+0', '').plusminus(),
			}, ],
			postquestion: `.`,
			analys: (`$f(x)=` + (k + `x+` + b)).replace('+0', '').plusminus() + `$`,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//508895 508903
