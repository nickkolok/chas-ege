(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		function kf(x) {
			return k * x + d;
		}

		function pf(x) {
			return a * x * x + b * x + c;
		}

		let key = '509149';
		let preference1 = ['findAbscissa', 'findOrdinate'];
		let preference2 = ['simpleLinearFunc', 'difficultLinearFunc'];
		let randFind = getSelectedPreferenceFromList(key, preference1);
		let randGraph = getSelectedPreferenceFromList(key, preference2);

		let x1 = sluchch(-6, 5);
		let x2 = slKrome(x1, -20, 20);
		let y1 = sluchch(-7, 5);
		let y2 = sluchch(7, 20).pm();
		let k = (y1 - y2) / (x1 - x2);
		genAssertAlmostInteger(k);

		let d = y1 - k * x1;
		genAssertAlmostInteger(d);

		if (randGraph == 0) {
			genAssert(d == 0, 'd не равно нулю');
		}

		let a = sluchch(1, 3).pm();
		let b = k - a * (x1 + x2);
		let c = d + x1 * x2 * a;

		let D = b * b - 4 * a * c;
		genAssert(D >= 0, 'Дискриминант меньше нуля');
		genAssert(D.isPolnKvadr(), 'Дискриминант не полный квадрат');

		let x0 = -b / (2 * a);
		let y0 = pf(x0);
		genAssert(Math.abs(x0) <= 6, 'Абсцисса вершины параболы не видна');
		genAssert(Math.abs(y0) <= 5, 'Ордината вершины параболы не видна');

		let pointsP = intPoints(pf, {
			minX: -8,
			maxX: 8,
			minY: -9,
			maxY: 7,
		});
		genAssert(pointsP.length >= 3, 'Точек недостаточно');

		let pointsK = intPoints(kf, {
			minX: -8,
			maxX: 8,
			minY: -9,
			maxY: 7,
		});
		genAssert(pointsK.length >= 2, 'Точек недостаточно');

		let answ, find;
		if (randFind) {
			find = 'ординату';
			answ = y2;
		} else {
			find = 'абсциссу';
			answ = x2;
		}
		
		let pryamay;

		switch (randGraph) {
		case 0:
			pryamay = 'kx';
			break;
		case 1:
			if (!d && sl1())
				pryamay = 'kx+d';
			else
				pryamay = (['k', k].iz() + 'x +' + ['d', d].iz()).replace('+0', '').plusminus();
			break;
		}
		
		let paint1 = function(ct) {
			let h = 400;
			let w = 400;
			//Оси координат
			ct.drawCoordPlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);

			ct.lineWidth = 0.1;
			ct.scale(20, -20);
			//График
			graph9AdrawFunction(ct, kf, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 8.7,
				step: 0.05,
			});
			graph9AdrawFunction(ct, pf, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 8.7,
				step: 0.05,
			});
			//точки
			graph9AmarkCircles(ct, pointsK, 2, 0.15);
			graph9AmarkCircles(ct, pointsP, 3, 0.15);
			graph9AmarkCircles(ct, [x1, y1], 1, 0.15); //на всякий случай точку пересечения
			//буква
			ct.fillStyle = om.primaryBrandColors[0];
			ct.font = "18px liberation_sans";
			ct.scale(1 / 20, -1 / 20);
			ct.fillText('A', 20 * x1 - 10, -20 * y1 - 10);
		};
		
		NAtask.setTask({
			text: 'На рисунке изображены графики функций $f(x)=' + pryamay + '$ и $g(x)=ax^2+bx+c$,' +
				' которые пересекаются в точках $A$ и $B$. Найдите ' + find + ' точки $B$.',
			answers: answ,
			analys: `$f(x)=${(k + 'x+' + d).replace('+0', '').plusminus()};$<br>$g(x)=${(a + 'x^2+' + b + 'x+' + c).replace('+0', '').plusminus()}.$<br>$A(${x1};${y1})$<br>$B(${x2};${y2})$`,
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//509149 509158
