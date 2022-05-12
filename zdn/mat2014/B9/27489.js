CanvasRenderingContext2D.prototype.setkaVer2 = function(h, w, hor, ver, mash) {
	if (mash === undefined)
		mash = 1;
	else {
		hor *= mash;
		ver *= mash;
	}
	for (let i = 0; i < h; i += hor)
		this.drawLine(i, 0, i, w);

	for (let i = 0; i < w; i += ver)
		this.drawLine(0, i, h, i);
};

retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		switch (cs) {
		case 1:
			return (a * x).cos() + (b * x).sin();
		case 2:
			return -a * (a * x).sin() + b * (b * x).cos();
		}

	}
	let cs = sl(1,2);
	let a = sl(1, 5, 0.1).pm();
	let b = slKrome([a.abs(), (a / 2).abs()], 0.1, 5, 0.1).pm();
	let pi = Math.PI;
	let mash = 2 / 3;
	let points = [];
	let answ = 0;
	let gran = mash * 4;
	for (let n = -10; n < 10; n++) {
		let root1 = 0.5 * (pi - 4 * pi * n) / (a - b);
		if (f(root1).abs() > 3.5 * mash)
			return;
		if (root1 < gran && root1 > -gran) {
			points.push([root1, f(root1)]);
			answ++;
		}
		let root2 = -0.5 * (pi - 4 * pi * n) / (a + b);
		if (f(root2).abs() > 3.5 * mash)
			return;
		if (root2 < gran && root2 > -gran) {
			points.push([root2, f(root2)]);
			answ++;
		}
	}
	let text;
	switch(cs){
		case 1:
			text='$y=f\'(x)$ - производная функции $f(x)$, определённой на интервале [-4;4]. Найдите количество точек экстремума функции';
			break;
		case 2:
			text='$y=f(x)$, определённой на интервале [-4;4]. Найдите количество точек, где производная этой функции равна нулю';
			break;
	}
	let paint1 = function(ct) {
		let h = 350;
		let w = 400;
		//Оси координат
		ct.drawCoordPlane(w, h, {
			hor: 2,
			ver: 2
		}, {
			x1: '1',
			y1: '1',
			sh1: 17,
		}, 20);
		//График
		ct.scale(60, -60);
		ct.lineWidth = 0.05;
		graph9AdrawFunction(ct, f, {
			minX: -mash * 4,
			maxX: mash * 4,
			minY: -5 * mash,
			maxY: 4 * mash,
			step: 0.01,
		});
		//точки
	 /*ct.fillStyle = "red";
	 graph9AmarkCircles(ct, points, 30, 0.04);*/

		ct.fillStyle = "black";
		graph9AmarkCircles(ct, [
			[-mash * 4, f(-mash * 4)]
		], 1, 0.04);
		graph9AmarkCircles(ct, [
			[mash * 4, f(mash * 4)]
		], 1, 0.04);
		ct.fillStyle = "white";
		graph9AmarkCircles(ct, [
			[-mash * 4, f(-mash * 4)]
		], 1, 0.03);
		graph9AmarkCircles(ct, [
			[mash * 4, f(mash * 4)]
		], 1, 0.03);
	};
	NAtask.setTask({
		text: 'на рисунке изображён график функции '+text+'.',
		answers: answ,
		/*analys: ('$cos(' + a.ts() + 'x)+sin(' + b.ts() + 'x)$').plusminus() + '<br>' +
			('$' + (-a).ts() + 'sin(' + a.ts() + 'x)+' + b.ts() + 'cos(' + b.ts() + 'x)$').plusminus(),*/
	});
	chas2.task.modifiers.addCanvasIllustration({
		height: 350,
		width: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//27489
