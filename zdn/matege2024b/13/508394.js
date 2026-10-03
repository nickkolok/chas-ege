(function() {
	retryWhileError(function() {
		'use strict';
		NAinfo.requireApiVersion(0, 2);

		let key = "508394";
		let preference1 = ['liquid_ask_pour', 'liquid_ask_total', 'total_ask_pour', 'total_ask_liquid'];
		let preference2 = ['cone', 'pyr3', 'pyr4', 'cyl', 'par'];
		let randPref = getSelectedPreferenceFromList(key, preference1);
		let randShape = getSelectedPreferenceFromList(key, preference2);

		let shapeNames = {
			cone: 'конуса',
			pyr3: 'правильной треугольной пирамиды',
			pyr4: 'правильной четырёхугольной пирамиды',
			cyl: 'цилиндра',
			par: 'прямоугольного параллелепипеда',
		};
		let type = preference2[randShape];
		let shape = shapeNames[type];
		let pointed = (type === 'cone' || type === 'pyr3' || type === 'pyr4');
		let power = pointed ? 3 : 1;

		let N = sl(2, 4);
		let k = 1 / N;

		// Геометрия сосуда задаётся классами из lib/figure.js
		let figure;
		if (type === 'cone')
			figure = new Cone({ radius: 140, height: 270 });
		else if (type === 'cyl')
			figure = new Cylinder({ radius: 140, height: 270 });
		else if (type === 'pyr3')
			figure = new RegularPyramid({ height: 160, baseSide: 100, numberSide: 3 });
		else if (type === 'pyr4')
			figure = new RegularPyramid({ height: 160, baseSide: 100, numberSide: 4 });
		else
			figure = new Parallelepiped({ height: 160, width: 100, depth: 70 });

		let fractionText = `\\frac{1}{${N}}`;
		let text = '';
		let answers = 0;

		if (randPref === 0) {
			let V = sl(10, 100);
			answers = V * (Math.pow(N, power) - 1);
			text = `В сосуде, имеющем форму ${shape}, уровень жидкости достигает $${fractionText}$ высоты. Объём жидкости равен $${V}$ мл. Сколько миллилитров жидкости нужно долить, чтобы наполнить сосуд доверху?`;
		} else if (randPref === 1) {
			let V = sl(10, 100);
			answers = V * Math.pow(N, power);
			text = `В сосуде, имеющем форму ${shape}, уровень жидкости достигает $${fractionText}$ высоты. Объём жидкости равен $${V}$ мл. Какова вместимость сосуда (в мл)?`;
		} else if (randPref === 2) {
			let C = sl(10, 100);
			let Vtotal = C * Math.pow(N, power);
			answers = C * (Math.pow(N, power) - 1);
			text = `В сосуде, имеющем форму ${shape}, уровень жидкости достигает $${fractionText}$ высоты. Объём сосуда равен $${Vtotal}$ мл. Сколько миллилитров жидкости нужно долить, чтобы наполнить сосуд доверху?`;
		} else {
			let C = sl(10, 100);
			let Vtotal = C * Math.pow(N, power);
			answers = C;
			text = `В сосуде, имеющем форму ${shape}, уровень жидкости достигает $${fractionText}$ высоты. Объём сосуда равен $${Vtotal}$ мл. Сколько миллилитров жидкости уже налито в сосуд?`;
		}

		let paint1 = function(ctx) {
			let w = 360;
			let h = 360;
			let lineColor = om.secondaryBrandColors.iz();
			let liquidColor = om.transparentBrandColors.iz();
			let COS = Math.cos(Math.PI / 6);
			let SIN = Math.sin(Math.PI / 6);

			ctx.lineWidth = 2;
			ctx.strokeStyle = lineColor;

			let strokeSeg = function(a, b, dash) {
				if (dash)
					ctx.setLineDash([6, 4]);
				ctx.drawLine(a[0], a[1], b[0], b[1]);
				ctx.setLineDash([]);
			};
			let strokePoly = function(pts, dashedIdx) {
				dashedIdx = dashedIdx || [];
				for (let i = 0; i < pts.length; i++)
					strokeSeg(pts[i], pts[(i + 1) % pts.length], dashedIdx.includes(i));
			};

			// ===== Многогранники: система координат lib/canvas.js =====
			if (type === 'pyr3' || type === 'pyr4' || type === 'par') {
				let rim, apex = null, basePts = null, surfPts;
				if (type === 'pyr3') {
					let E = figure.baseSide, Hv = figure.height;
					rim = [[0, -E], [E, -E], [COS * E, -SIN * E]];
					apex = [(COS * E + E) / 3, (-SIN * E - 2 * E) / 3 + Hv];
					surfPts = rim.map((p) => [apex[0] + k * (p[0] - apex[0]), apex[1] + k * (p[1] - apex[1])]);
				} else if (type === 'pyr4') {
					let E = figure.baseSide, Hv = figure.height;
					rim = [[0, -E], [E, -E], [E + COS * E, -SIN * E], [COS * E, -SIN * E]];
					apex = [(E + COS * E) / 2, (-E - SIN * E) / 2 + Hv];
					surfPts = rim.map((p) => [apex[0] + k * (p[0] - apex[0]), apex[1] + k * (p[1] - apex[1])]);
				} else {
					let d = figure.depth, wP = figure.width, hP = figure.height;
					let dc = COS * d;
					rim = [[dc, d / 2], [0, 0], [wP, 0], [dc + wP, d / 2]];
					basePts = rim.map((p) => [p[0], p[1] + hP]);
					surfPts = rim.map((p) => [p[0], p[1] + (1 - k) * hP]);
				}

				// Центрирование и автомасштаб по габаритному прямоугольнику каркаса
				let outline = rim.concat(apex ? [apex] : basePts);
				let xs = outline.map((p) => p[0]);
				let ys = outline.map((p) => p[1]);
				let minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
				let minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
				let scale = Math.min((w - 60) / (maxX - minX), (h - 60) / (maxY - minY));
				ctx.translate(w / 2, h / 2);
				ctx.scale(scale, scale);
				ctx.translate(-(minX + maxX) / 2, -(minY + maxY) / 2);
				ctx.lineWidth = 2 / scale;

				// Заливка жидкости нашей функцией drawSection
				ctx.drawSection(surfPts, liquidColor);
				if (apex) {
					for (let i = 0; i < surfPts.length; i++)
						ctx.drawSection([surfPts[i], surfPts[(i + 1) % surfPts.length], apex], liquidColor);
				} else {
					ctx.drawSection(basePts, liquidColor);
					for (let i = 0; i < surfPts.length; i++)
						ctx.drawSection([surfPts[i], surfPts[(i + 1) % surfPts.length], basePts[(i + 1) % basePts.length], basePts[i]], liquidColor);
				}

				// Контуры сосуда — наши функции из lib/canvas.js
				if (type === 'pyr3')
					ctx.drawRightPyramid3({ edge: figure.baseSide, height: figure.height }, [], [6, 4], false, false);
				else if (type === 'pyr4')
					ctx.drawRightPyramid4({ edge: figure.baseSide, height: figure.height, strokeStyle: lineColor }, [], [6, 4], false, false);
				else
					ctx.drawParallelepiped({ width: figure.width, height: figure.height, depth: figure.depth, strokeStyle: lineColor }, [], false, [6, 4]);

				// Поверхность жидкости: заднее ребро пунктиром
				strokePoly(surfPts, type === 'par' ? [1] : [0]);

				// Ось сосуда и точка в центре верхнего основания
				let center = rim.reduce((acc, p) => [acc[0] + p[0] / rim.length, acc[1] + p[1] / rim.length], [0, 0]);
				let bottom = apex ? apex : basePts.reduce((acc, p) => [acc[0] + p[0] / basePts.length, acc[1] + p[1] / basePts.length], [0, 0]);
				ctx.setLineDash([6, 4]);
				ctx.drawLine(center[0], center[1], bottom[0], bottom[1]);
				ctx.setLineDash([]);
				ctx.fillStyle = lineColor;
				ctx.fillKrug(center[0], center[1], 3 / scale);

			// ===== Тела вращения: конус и цилиндр =====
			} else {
				let cx = w / 2;
				let topY = (h - figure.height) / 2;
				let botY = topY + figure.height;
				let yL = botY - k * figure.height;
				let R = figure.radius;
				let e = R * 0.26;

				if (type === 'cone') {
					let Rl = k * R;
					let el = k * e;
					ctx.fillStyle = liquidColor;
					ctx.beginPath();
					ctx.ellipse(cx, yL, Rl, el, 0, 0, 2 * Math.PI);
					ctx.fill();
					ctx.drawSection([[cx - Rl, yL], [cx + Rl, yL], [cx, botY]], liquidColor);

					strokeSeg([cx - R, topY], [cx, botY], false);
					strokeSeg([cx + R, topY], [cx, botY], false);
					ctx.drawEllipse(cx, topY, R, e);
					ctx.drawEllipse(cx, yL, Rl, el, 0, 0, Math.PI);
					ctx.setLineDash([6, 4]);
					ctx.drawEllipse(cx, yL, Rl, el, 0, Math.PI, 2 * Math.PI);
					ctx.setLineDash([]);
				} else {
					ctx.fillStyle = liquidColor;
					ctx.beginPath();
					ctx.ellipse(cx, yL, R, e, 0, 0, 2 * Math.PI);
					ctx.fill();
					ctx.drawSection([[cx - R, yL], [cx + R, yL], [cx + R, botY], [cx - R, botY]], liquidColor);
					ctx.beginPath();
					ctx.ellipse(cx, botY, R, e, 0, 0, Math.PI);
					ctx.fill();

					strokeSeg([cx - R, topY], [cx - R, botY], false);
					strokeSeg([cx + R, topY], [cx + R, botY], false);
					ctx.drawEllipse(cx, topY, R, e);
					ctx.drawEllipse(cx, yL, R, e, 0, 0, Math.PI);
					ctx.setLineDash([6, 4]);
					ctx.drawEllipse(cx, yL, R, e, 0, Math.PI, 2 * Math.PI);
					ctx.drawEllipse(cx, botY, R, e, 0, Math.PI, 2 * Math.PI);
					ctx.setLineDash([]);
					ctx.drawEllipse(cx, botY, R, e, 0, 0, Math.PI);
				}

				ctx.setLineDash([6, 4]);
				ctx.drawLine(cx, topY, cx, botY);
				ctx.setLineDash([]);
				ctx.fillStyle = lineColor;
				ctx.fillKrug(cx, topY, 3);
			}
		};

		NAtask.setTask({
			text: text,
			answers: answers,
			authors: ['Селена'],
			preference: [preference1, preference2],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 360,
			height: 360,
			paint: paint1,
		});
	}, 2000);
})();
//508394
