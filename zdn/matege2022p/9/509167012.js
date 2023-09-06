retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f2(x) {
		return (a2 * x + d2) / (x + c2);
	}

	function f1(x) {
		return (a1 * x + d1) / (x + c1);
	}

	let x1 = sluchch(1, 6).pm();
	let x2 = sluchch(8, 20);
	let y1 = sl(-6, 6);
	let y2 = sl(1, 20).pm();
	let c1 = sl(-5, 5);
	let a1 = (y1 * x1 - y2 * x2 + c1 * (y1 - y2)) / (x1 - x2);
	if (a1 == 1 || !a1)
		return;
	let d1 = y1 * (x1 + c1) - a1 * x1;
	let k = (y1 - y2) / (x1 - x2);
	let c2 = sl(-5, 5);
	let a2 = (y1 * x1 - y2 * x2 + c2 * (y1 - y2)) / (x1 - x2);
	if (a2 == 1 || !a2 || a1 == a2)
		return;
	let d2 = y1 * (x1 + c2) - a2 * x1;
	if (d1 / a1 == c1)
		return;
	if (d2 / a2 == c2)
		return;
	if (!(a1 * 100).isZ() || !(d1 * 100).isZ())
		return;
	if (!(a2 * 100).isZ() || !(d2 * 100).isZ())
		return;
	let points1 = intPoints(f1, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (points1.length < 3)
		return;
	let points2 = intPoints(f2, {
		minX: -8,
		maxX: 8,
		minY: -9,
		maxY: 7,
		step: 1,
	});
	if (points2.length < 3)
		return;
	let answ;
	if (sl1()) {
		answ = x2;
		find1 = 'абсциссу';
	} else {
		answ = y2;
		find1 = 'ординату';
	}
	let paint1 = function(ct) {
		let h = 400;
		let w = 400;
		//Оси координат
		ct.drawCoordinatePlane (w, h, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13,
		}, 20);
		//График
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, [f1, f2], {
			minX: -8.5,
			maxX: 8.5,
			minY: -9.5,
			maxY: 7.7,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, points1, 3, 0.15);
		graph9AmarkCircles(ct, points2, 3, 0.15);
		graph9AmarkCircles(ct, [[x1, y1]], 2, 0.15);
		//буква
		ct.fillStyle = "blue";
		ct.font = "18px liberation_sans";
		ct.scale(1 / 20, -1 / 20);
		ct.fillText('A', 20 * x1 - 10, -20 * y1 - 10);
	};
	NAtask.setTask({
		text: 'На рисунке изображены графики функций $f(x)=\\frac{a_1 x'+['+','-'].iz()+'d_1}{x'+['+','-'].iz()+'c_1}$ и $g(x)=\\frac{a_2 x'+['+','-'].iz()+'d_2}{x'+['+','-'].iz()+'c_2 }$,' +
			' которые пересекаются в точках $A$ и $B$. Найдите ' + find1 + ' точки $B$.',
		answers: answ,
		analys: '$f(x)=\\frac{' + (a1 + 'x+' + d1).plusminus() + '}{' + ('x+' + c1).plusminus() + '}' + '$<br>' +
			'$g(x)=\\frac{' + (a2 + 'x+' + d2).plusminus() + '}{' + ('x+' + c2).plusminus() + '}' + '$<br>' +
			'$A(' + x1 + ';' + y1 + ')$<br>' +
			'$B(' + x2 + ';' + y2 + ')$',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	return true;
}, 100000);
//509167012
