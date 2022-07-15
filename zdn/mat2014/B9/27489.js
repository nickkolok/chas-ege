retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		switch (cs) {
		case 1: //производная
			return ((a * x).cos() + (b * x).sin());
		case 2: //функция 
			return ((a * x).sin() / a - (b * x).cos() / b);
		}
	}

	function itIsRoot(root) {
		if ((f(root) && (cs == 2)) || cs == 1) {
			if (f(root).abs() > 3.5 * mash)
				return;
			if (root < limit2 * mash && root > limit1 * mash) {
				return true;
			}
		}
		return false;
	}

	function emptyPoints(ct) {
		let gran = [Xmax, Xmin];
		for (let i = 0; i < 2; i++) {
			let p = (-1).pow(i) * mash * gran[i];
			ct.fillStyle = "black";
			graph9AmarkCircles(ct, [
				[p, f(p)]
			], 1, 0.06);
		}
		for (let i = 0; i < 2; i++) {
			let p = (-1).pow(i) * mash * gran[i];
			ct.fillStyle = "white";
			graph9AmarkCircles(ct, [
				[p, f(p)]
			], 1, 0.04);
		}
	}
	let cs = sl(1, 2);
	let a = sl(1, 2, 0.5).pm();
	let b = slKrome(a.abs(), 1, 2, 0.5).pm();
	let bag = [
		[1, 1.5],
		[2, 1.5],
		[2, 1]
	];
	if (cs == 1)
		for (let i = 0; i < 3; i++)
			if (a.abs() == bag[i][0] && b.abs() == bag[i][1])
				return;
	let pi = Math.PI;
	let mash = 2 / 3;
	let points = [];
	let Xmin = sl(6, 8);
	let Xmax = sl(6, 8);
	let limit1 = sl(1, Xmin-1).pm();
	let limit2 = sl(limit1.abs(), Xmax-1);
	for (let n = -10; n < 10; n++) {
		let root1 = 0.5 * (pi - 4 * pi * n) / (a - b);
		if (itIsRoot(root1))
			points.push([root1, f(root1)]);

		let root2 = -0.5 * (pi - 4 * pi * n) / (a + b);
		if (itIsRoot(root2))
			points.push([root2, f(root2)]);
	}
	if (points.length < 2)
		return;
	let text, answ;
	switch (cs) {
	case 1:
		text =
			'$y=f\'(x)$ - производная функции $f(x)$, определённой на интервале $(' + -Xmin + ';' + Xmax +
			')$. Найдите количество точек экстремума функции';
		answ = points.length;
		break;
	case 2:
		text =
			'$y=f(x)$, определённой на интервале $(' + -Xmin + ';' + Xmax +
			')$. Найдите количество точек, где ' + ['производная этой функции равна нулю',
				'касательная к $f(x)$ параллельна $y=' + sl(-20, 20) + '$'
			].iz();
		answ = points.length;
		break;
	}
	let paint1 = function(ct) {
		let h = 350;
		let w = 800;
		//Оси координат
		ct.drawCoordPlane(w, h, {
			hor: 2,
			ver: 2
		}, {
			x1: '1',
			y1: '1',
			sh1: 17,
			sh2: 17,
		}, 20);
		//График
		ct.scale(60, -60);
		ct.lineWidth = 0.05;
		graph9AdrawFunction(ct, f, {
			minX: -mash * Xmin,
			maxX: mash * Xmax,
			minY: -5 * mash,
			maxY: 4 * mash,
			step: 0.01,
		});
		//точки
		/*ct.fillStyle = "red";
		graph9AmarkCircles(ct, points, points.length, 0.04);*/
		emptyPoints(ct);

	};
	NAtask.setTask({
		text: 'На рисунке изображён график функции ' + text + ' на отрезке $[' + limit1 + ';' + limit2 + ']$.',
		answers: answ,
		/*analys: ('$cos(' + a.ts() + 'x)+sin(' + b.ts() + 'x)$').plusminus() + '<br>' +
			('$\\frac{sin(' + a.ts() + 'x)}{' + (-a).ts() + '}+\\frac{cos(' + b.ts() + 'x)}{' + (-b).ts() + '}$').plusminus(),*/
	});
	chas2.task.modifiers.addCanvasIllustration({
		height: 350,
		width: 800,
		paint: paint1,
	});
	return true;
}, 100000);
//27489
