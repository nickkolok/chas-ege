(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		function fg(x) {
			return k2 / x + b2;
		}

		function fp(x) {
			return k1 * x + b1;
		}

		let key = '509192';
		let preference1 = ['findAbscissa', 'findOrdinate'];
		let preference2 = ['withB2', 'withoutB2'];
		let randFind = getSelectedPreferenceFromList(key, preference1);
		let randB = getSelectedPreferenceFromList(key, preference2);

		let x1 = sluchch(-6, 6);
		let y1 = sluchch(-7, 6);
		let x2 = sluchch(-10, 10);
		let y2 = sluchch(9, 20).pm();

		let k1 = (y1 - y2) / (x1 - x2);
		genAssert(k1);
		genAssertAlmostInteger(k1);

		let b1 = y1 - k1 * x1;

		if (randB) {
			genAssert(b1 == 0);
		}

		let b2 = (y1 * x1 - y2 * x2) / (x1 - x2);
		genAssert(b2);
		genAssertAlmostInteger(b2);

		let k2 = (y1 - b2) * x1;
		genAssert(k2);
		genAssert(k2 <= 50);

		let count = 0;
		for (let i = -8; i <= 8; i += 0.1) {
			if ((fg(i) - fp(i)).abs() < 1) {
				count++;
			}
		}

		genAssert(count < 3, 'Графики слиплись');

		let find, answ;
		if (randFind) {
			find = 'ординату';
			answ = y2;
		} else {
			find = 'абсциссу';
			answ = x2;
		}

		let pointsg = intPoints(fg, {
			minX: -8,
			maxX: 8,
			minY: -9,
			maxY: 8,
			step: 1,
		});
		genAssert(pointsg.length >= 2);

		let pointsp = intPoints(fp, {
			minX: -8,
			maxX: 8,
			minY: -9,
			maxY: 8,
			step: 1,
		});
		genAssert(pointsp.length >= 2);

		let paint1 = function (ct) {
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
			//График
			ct.scale(20, -20);
			ct.lineWidth = 0.1;
			graph9AdrawFunction(ct, fg, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 8.7,
				step: 0.05,
			});
			graph9AdrawFunction(ct, fp, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 8.7,
				step: 0.05,
			});
			//точки
			graph9AmarkCircles(ct, pointsg, 2, 0.15);
			graph9AmarkCircles(ct, pointsp, 2, 0.15);
			graph9AmarkCircles(ct, [
				[x1, y1]
			], 2, 0.15);
			//буква
			ct.fillStyle = om.primaryBrandColors[0];
			ct.font = "18px liberation_sans";
			ct.scale(1 / 20, -1 / 20);
			ct.fillText('A', 20 * x1 - 10, -20 * y1 - 10);
		};
		NAtask.setTask({
			text: `На рисунке изображены графики функций $f(x)=k_1 x+b_1$ и $g(x)=\\frac{k_2}{x}${`+b_2`.esli(randB)}$, которые пересекаются в точках $A$ и $B$.  Найдите ${find} точки $B$. `,
			analys: '$f(x)=' + (k1 + 'x+' + b1).plusminus() + '$<br>' +
				'$g(x)=' + ('\\frac{' + k2 + '}{x}+' + b2 + '$').plusminus() + '<br>' +
				'$A(' + x1 + ';' + y1 + ')$<br>' +
				'$B(' + x2 + ';' + y2 + ')$',
			answers: answ,
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
//509192 509167
