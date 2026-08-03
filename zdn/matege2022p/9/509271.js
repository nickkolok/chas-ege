(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		function fp(x) {
			return k * x + b;
		}

		function fs(x) {
			return a * Math.sqrt(x) + c;
		}

		let key = '509271';
		let preference1 = ['findAbscissa', 'findOrdinate'];
		let preference2 = ['withB', 'withoutB'];
		let preference3 = ['withC', 'withoutC'];
		let randFind = getSelectedPreferenceFromList(key, preference1);
		let randB = getSelectedPreferenceFromList(key, preference2);
		let randC = getSelectedPreferenceFromList(key, preference3);

		let x1 = [Math.pow(sluchch(1, 2), 2), 0][randB];
		let y1 = [sluchch(-7, 6), 0][randB];
		let x2 = Math.pow(sluchch(3, 20), 2);
		let y2 = sluchch(8, 20).pm();

		let k = (y1 - y2) / (x1 - x2);
		genAssert(k, 'k не определено');
		if (!randB) {
			genAssertAlmostInteger(k);
		}

		let kView = [k, k.texfrac(1)][randB];
		if (randB)
			if ((kView).match(/\{(\d+)\}/)[1] > 100) {
				kView = k;
				genAssertZ1000(kView);
			}


		let b = y1 - k * x1;
		if (randB) {
			genAssert(b == 0, 'b не ноль');
		}

		let a = (y1 - y2) / (Math.sqrt(x1) - Math.sqrt(x2));
		genAssertAlmostInteger(a);
		let c = y1 - a * Math.sqrt(x1);

		if (randC) {
			genAssert(c == 0, 'c не ноль');
		}

		let count = 0;
		for (let i = 0; i <= 8; i += 0.1) {
			if ((fs(i) - fp(i)).abs() < 0.5) {
				count++;
			}
		}

		genAssert(count < 4, 'Графики слиплись');

		let pointss = intPoints(fs, {
			minX: -8,
			maxX: 8,
			minY: -9,
			maxY: 7,
			step: 1,
		});

		genAssert(pointss.length >= 2, 'Недостаточно точек');
		let pointsp = intPoints(fp, {
			minX: -8,
			maxX: 8,
			minY: -9,
			maxY: 7,
			step: 1,
		});
		genAssert(pointsp.length >= 2, 'Недостаточно точек');
		let find, answ;
		if (!randFind) {
			answ = x2;
			find = 'абсциссу';
		} else {
			answ = y2;
			find = 'ординату';
		}
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
			graph9AdrawFunction(ct, fs, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 7.7,
				step: 0.01,
			});
			graph9AdrawFunction(ct, fp, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 7.7,
				step: 0.01,
			});
			//точки
			graph9AmarkCircles(ct, pointss, 2, 0.15);
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
			text: `На рисунке изображены графики функций $f(x)=a\\sqrt{x}${` + c `.esli(!randC)}$ и $g(x)=kx${` + b `.esli(!randB)}$, которые пересекаются в точках $A$ и $B$. Найдите ${find} точки $B$.`,
			answers: answ,
			analys: '$f(x)=' + (a + '\\sqrt{x}+' + c + '$').replace('+0', '').plusminus() + '<br>' +
				'$g(x)=' + (kView + 'x+' + b).replace('+0', '').plusminus() + '$<br>' +
				'$A(' + x1 + ';' + y1 + ')$<br>' +
				'$B(' + x2 + ';' + y2 + ')$',
			preference: [preference1, preference2, preference3],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
//509271
