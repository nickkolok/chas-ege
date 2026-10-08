(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '522699';
		let preference1 = ['lateral', 'volume'];
		let preference2 = ['firstGreater', 'secondGreater'];
		let kind = getSelectedPreferenceFromList(key, preference1);
		let v = getSelectedPreferenceFromList(key, preference2);

		// Чертёж обязан быть читаемым, поэтому у каждого конуса высота не меньше
		// радиуса и не больше двух радиусов (md/task_geometry.md: избегать данных,
		// по которым трудно построить читаемый чертёж). Без этого при l ~= r конус
		// вырождался в «блин», а при r << h - в «иглу», и пара выглядела криво.
		let coneParams = function (rMax, lMax) {
			let r = sl(2, rMax, 1);
			let l = sl(Math.ceil(r * Math.SQRT2), Math.min(lMax, Math.floor(r * Math.sqrt(5))), 1);
			genAssert(l > r, 'Образующая конуса должна быть больше радиуса');
			return { r: r, l: l, h: Math.sqrt(l * l - r * r) };
		};

		let big, small;
		if (kind === 0) {
			// даны радиус и образующая — сравниваем площади боковых поверхностей
			let pB = coneParams(10, 15);
			let pS = coneParams(8, 12);
			big = new Cone({ radius: pB.r, height: pB.h });
			small = new Cone({ radius: pS.r, height: pS.h });
		} else {
			// даны радиус и высота — сравниваем объёмы
			let rB = sl(2, 9, 1);
			let hB = sl(rB, 2 * rB, 1);
			let rS = sl(2, 8, 1);
			let hS = sl(rS, 2 * rS, 1);
			big = new Cone({ radius: rB, height: hB });
			small = new Cone({ radius: rS, height: hS });
		}

		// Для сравнения используем коэффициенты без π (π сокращается)
		let mBig = kind === 0 ? big.radius * big.generatrix : big.radius * big.radius * big.height;
		let mSmall = kind === 0 ? small.radius * small.generatrix : small.radius * small.radius * small.height;

		if (mBig <= mSmall) throw new Error('The bigger cone must actually be bigger');

		let ratio = mBig / mSmall;

		let ratioTimes10 = ratio * 10;
		if (Math.abs(ratioTimes10 - Math.round(ratioTimes10)) > 1e-9) throw new Error('Ratio is not nice');

		if (ratio > 20) throw new Error('Ratio too large');

		genAssertZ1000(ratio);

		let cones = [big, small];
		if (v)
			cones.reverse();

		let r1 = cones[0].radius, h1 = cones[0].height, l1 = cones[0].generatrix;
		let r2 = cones[1].radius, h2 = cones[1].height, l2 = cones[1].generatrix;
		let m1 = kind === 0 ? r1 * l1 : r1 * r1 * h1;
		let m2 = kind === 0 ? r2 * l2 : r2 * r2 * h2;

		let biggerWord = ['первого', 'второго'][v];
		let smallerWord = ['второго', 'первого'][v];
		let givenWord = kind ? 'высота' : 'образующая';
		let given1 = kind ? h1 : l1;
		let given2 = kind ? h2 : l2;
		let subjectNom = kind ? 'объём' : 'площадь боковой поверхности';
		let subjectGen = kind ? 'объёма' : 'площади боковой поверхности';
		let letter = kind ? 'V' : 'S';

		let paint1 = function (ct) {
			let w = 400;
			let h = 300;
			let k = 0.3;
			let gap = 2;

			let maxR = Math.max(r1, r2);
			let maxH = Math.max(h1, h2);
			let totalWidth = 2 * r1 + gap + 2 * r2;
			let totalHeight = maxH + 2 * k * maxR;
			let scale = Math.min((w - 40) / totalWidth, (h - 40) / totalHeight);

			let xLeft = (w - totalWidth * scale) / 2;
			let y0 = h / 2 + (maxH - k * maxR) * scale / 2;
			let cx1 = xLeft + r1 * scale;
			let cx2 = xLeft + (2 * r1 + gap + r2) * scale;

			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			let drawCone = function (cx, r, hh) {
				let R = r * scale;
				let H = hh * scale;
				let ry = k * R;
				ct.drawLine(cx - R, y0, cx, y0 - H);
				ct.drawLine(cx + R, y0, cx, y0 - H);
				ct.drawEllipse(cx, y0, R, ry, 0, 0, Math.PI);
				ct.setLineDash([6, 4]);
				ct.drawEllipse(cx, y0, R, ry, 0, Math.PI, 2 * Math.PI);
				ct.setLineDash([]);
			};

			drawCone(cx1, r1, h1);
			drawCone(cx2, r2, h2);
		};

		let analys;
		if (kind === 0) {
			analys = `Площадь боковой поверхности конуса вычисляется по формуле $${letter} = \\pi r l$, где $r$ — радиус основания, $l$ — образующая. ` +
				`Площадь боковой поверхности первого конуса: $${letter}_1 = \\pi \\cdot ${r1} \\cdot ${l1} = ${m1}\\pi$. ` +
				`Площадь боковой поверхности второго конуса: $${letter}_2 = \\pi \\cdot ${r2} \\cdot ${l2} = ${m2}\\pi$. ` +
				`Отношение площадей: $\\frac{${letter}_${v + 1}}{${letter}_${2 - v}} = \\frac{${m1}\\pi}{${m2}\\pi} = \\frac{${m1}}{${m2}} = ${ratio}$.`;
		} else {
			analys = `Объём конуса вычисляется по формуле $${letter} = \\frac{1}{3}\\pi r^2 h$, где $r$ — радиус основания, $h$ — высота. ` +
				`Объём первого конуса: $${letter}_1 = \\frac{1}{3}\\pi \\cdot ${r1}^2 \\cdot ${h1} = \\frac{1}{3}\\pi \\cdot ${m1}$. ` +
				`Объём второго конуса: $${letter}_2 = \\frac{1}{3}\\pi \\cdot ${r2}^2 \\cdot ${h2} = \\frac{1}{3}\\pi \\cdot ${m2}$. ` +
				`Отношение объёмов: $\\frac{${letter}_${v + 1}}{${letter}_${2 - v}} = \\frac{${m1}}{${m2}} = ${ratio}$.`;
		}

		NAtask.setTask({
			text: `Даны два конуса. Радиус основания и ${givenWord} первого конуса равны соответственно $${r1}$ и $${given1}$, а второго — $${r2}$ и $${given2}$. Во сколько раз ${subjectNom} ${biggerWord} конуса больше ${subjectGen} ${smallerWord} конуса?`,
			answers: ratio,
			analys: analys,
			preference: [preference1, preference2],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=522699
