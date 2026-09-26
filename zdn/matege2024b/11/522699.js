(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '522699';
		let preference1 = ['lateral', 'volume'];
		let preference2 = ['firstGreater', 'secondGreater'];
		let kind = getSelectedPreferenceFromList(key, preference1);
		let v = getSelectedPreferenceFromList(key, preference2);

		let big, small;
		if (kind === 0) {
			// даны радиус и образующая — сравниваем площади боковых поверхностей
			let rB = sl(2, 10, 1);
			let lB = sl(rB + 1, 15, 1);
			let rS = sl(1, 8, 1);
			let lS = sl(rS + 1, 12, 1);
			big = { r: rB, l: lB, h: Math.sqrt(lB * lB - rB * rB), m: rB * lB };
			small = { r: rS, l: lS, h: Math.sqrt(lS * lS - rS * rS), m: rS * lS };
		} else {
			// даны радиус и высота — сравниваем объёмы
			let rB = sl(1, 9, 1);
			let hB = sl(1, 15, 1);
			let rS = sl(1, 8, 1);
			let hS = sl(1, 12, 1);
			big = { r: rB, h: hB, m: rB * rB * hB };
			small = { r: rS, h: hS, m: rS * rS * hS };
		}

		if (big.m <= small.m) throw new Error('The bigger cone must actually be bigger');

		let ratio = big.m / small.m;

		let ratioTimes10 = ratio * 10;
		if (Math.abs(ratioTimes10 - Math.round(ratioTimes10)) > 1e-9) throw new Error('Ratio is not nice');

		if (ratio > 20) throw new Error('Ratio too large');

		genAssertZ1000(ratio);

		let cones = [big, small];
		if (v)
			cones.reverse();

		let r1 = cones[0].r, h1 = cones[0].h, m1 = cones[0].m, l1 = cones[0].l;
		let r2 = cones[1].r, h2 = cones[1].h, m2 = cones[1].m, l2 = cones[1].l;

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
			ct.strokeStyle = om.secondaryBrandColors;

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
				`Отношение площадей: $\\frac{${letter}_${v + 1}}{${letter}_${2 - v}} = \\frac{${cones[v].m}\\pi}{${cones[1 - v].m}\\pi} = \\frac{${cones[v].m}}{${cones[1 - v].m}} = ${ratio}$.`;
		} else {
			analys = `Объём конуса вычисляется по формуле $${letter} = \\frac{1}{3}\\pi r^2 h$, где $r$ — радиус основания, $h$ — высота. ` +
				`Объём первого конуса: $${letter}_1 = \\frac{1}{3}\\pi \\cdot ${r1}^2 \\cdot ${h1} = \\frac{1}{3}\\pi \\cdot ${m1}$. ` +
				`Объём второго конуса: $${letter}_2 = \\frac{1}{3}\\pi \\cdot ${r2}^2 \\cdot ${h2} = \\frac{1}{3}\\pi \\cdot ${m2}$. ` +
				`Отношение объёмов: $\\frac{${letter}_${v + 1}}{${letter}_${2 - v}} = \\frac{${cones[v].m}}{${cones[1 - v].m}} = ${ratio}$.`;
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
