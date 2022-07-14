retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return a * x.pow(3) + b * x.pow(2) + c * x + d;
	}
	let a = sl(0.1, 2, 0.1).pm();
	let b = sl(1, 10, 0.5).pm();
	let c = sl(-10, 10, 0.5);
	let d = sl(-10, 10, 0.5);
	let p = intPoints(f, {
		minX: -5,
		maxX: 5,
		minY: -6,
		maxY: 5
	});
	if (p.length < 2)
		return;
	let formula = 'ax^3+bx^2+cx+d';
	if (p.length != 4) {
		let variant = [
			['a', a.ts()],
			['b', b.ts()],
			['c', c.ts()],
		].iz(p.length);
		formula = formula.replace(variant[0][0], variant[0][1]).replace(variant[1][0], variant[1][1]).plusminus();
	}

	let question, answ;
	switch (sl(1, 2)) {
	case 1:
		let x = sl(6, 10).pm();
		question = '$f(' + x + ')$';
		answ = f(x);
		break;
	case 2:
		let mng = [d];
		let st = ['d'];
		if (formula.includes('a')) {
			st.push('a');
			mng.push(a);
		}
		if (formula.includes('b')) {
			st.push('b');
			mng.push(b);
		}
		if (formula.includes('c')) {
			st.push('c');
			mng.push(c);
		}
		if (sl1()) {
			question = 'сумму $' + st.slag() + '$';
			answ = mng.sum();
		} else {
			for (let i = 0; i < st.length; i++) {
				question += st[i];
				if (i != st.length - 1)
					question += '\\cdot ';
			}
			question = 'произведение $' + question + '$';
			answ = mng.production();
		}
	}
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		ct.drawCoordPlane(w, h, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13,
		}, 20);
		//график
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {
			minX: -6,
			maxX: 7,
			minY: -7,
			maxY: 6,
			step: 0.05,
		});
		//точки
		graph9AmarkCircles(ct, p, 4, 0.15);
	};

	NAtask.setTask({
		text: 'На рисунке изображён график функции вида $f(x)=' + formula +
			'$. Найдите ' + question + '.',
		answers: answ,
		analys: '$f(x)=' + (a.ts() + 'x^3+' + b.ts() + 'x^2+' + c.ts() + 'x+' + d.ts()).plusminus() + '$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//50914901
