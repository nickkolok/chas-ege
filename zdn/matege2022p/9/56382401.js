retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return (k * x.abs() + b).abs();
	}
	let k = sl(0.1, 3, 0.1);
	let b = sl(0, 3, 0.5);
	if (b / k > 6)
		return;
	let points = intPoints(f, {
		minX: -5,
		maxX: 6,
		minY: -5.5,
		maxY: 5.5
	});
	if (points.length < 2)
		return;
	let find = 0,
		answ = 0;
	switch (sl(1, 4)) {
	case 1:
		find = 'произведение коэффициентов';
		answ = k * b;
		break;
	case 2:
		find = 'сумму коэффициентов';
		answ = k + b;
		break;
	case 3:
		let num1 = sl(6, 10, 05);
		find = '$f(' + num1 + ')$';
		answ = f(num1).ts();
		break;
	case 4:
		let num2 = sl(6, 10, 05);
		answ = num2;
		find = 'точку, где $f(x)=' + f(num2).ts() + '$';
		break;
	}



	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		ct.lineWidth = 0.1;
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		//График
		graph9AdrawFunction(ct, f, {
			minX: -6,
			maxX: 6,
			minY: -7,
			maxY: 5.7,
			step: 0.05,
		});

		//точки
		graph9AmarkCircles(ct, points, 2, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображен график функций $f(x)=|k|x|+b|$, где $k,b>0$. Найдите ' + find +
			'.',
		answers: answ,
		analys: ('$f(x)=|' + k.ts() + '|x|+' + b.ts() + '|').plusminus() + '$'
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//56382401
