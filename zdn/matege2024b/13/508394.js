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
			let cx = w / 2;
			let topY = 60;
			let botY = 330;
			let H = botY - topY;
			let k = 1 / N;
			let yL = botY - k * H;
			let R = 140;
			let e = 36;

			let lineColor = om.secondaryBrandColors.iz();
			let fillColor = om.primaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.strokeStyle = lineColor;

			let fillPoly = function(pts) {
				ctx.beginPath();
				ctx.moveTo(pts[0][0], pts[0][1]);
				for (let i = 1; i < pts.length; i++)
					ctx.lineTo(pts[i][0], pts[i][1]);
				ctx.closePath();
				ctx.fill();
			};
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
			let rimPoly = function() {
				if (type === 'pyr3')
					return [[cx - R, topY + e * 0.6], [cx + R, topY + e * 0.6], [cx, topY - e * 0.9]];
				return [[cx - R, topY + e * 0.7], [cx + R, topY + e * 0.7], [cx + R * 0.55, topY - e * 0.7], [cx - R * 0.55, topY - e * 0.7]];
			};

			// --- заливка жидкости ---
			ctx.save();
			ctx.globalAlpha = 0.35;
			ctx.fillStyle = fillColor;
			if (pointed) {
				let apex = [cx, botY];
				if (type === 'cone') {
					let Rl = k * R;
					let el = k * e;
					ctx.beginPath();
					ctx.ellipse(cx, yL, Rl, el, 0, 0, 2 * Math.PI);
					ctx.fill();
					fillPoly([[cx - Rl, yL], [cx + Rl, yL], apex]);
				} else {
					let rim = rimPoly();
					let liq = rim.map((p) => [apex[0] + k * (p[0] - apex[0]), apex[1] + k * (p[1] - apex[1])]);
					fillPoly(liq);
					for (let i = 0; i < liq.length; i++)
						fillPoly([liq[i], liq[(i + 1) % liq.length], apex]);
				}
			} else {
				let dy = yL - topY;
				if (type === 'cyl') {
					ctx.beginPath();
					ctx.ellipse(cx, yL, R, e, 0, 0, 2 * Math.PI);
					ctx.fill();
					ctx.beginPath();
					ctx.ellipse(cx, botY, R, e, 0, 0, 2 * Math.PI);
					ctx.fill();
					fillPoly([[cx - R, yL], [cx + R, yL], [cx + R, botY], [cx - R, botY]]);
				} else {
					let rim = rimPoly();
					let surf = rim.map((p) => [p[0], p[1] + dy]);
					let base = rim.map((p) => [p[0], p[1] + H]);
					fillPoly(surf);
					fillPoly(base);
					for (let i = 0; i < rim.length; i++)
						fillPoly([surf[i], surf[(i + 1) % surf.length], base[(i + 1) % base.length], base[i]]);
				}
			}
			ctx.restore();

			// --- контуры сосуда и поверхности жидкости ---
			if (pointed) {
				let apex = [cx, botY];
				if (type === 'cone') {
					strokeSeg([cx - R, topY], apex, false);
					strokeSeg([cx + R, topY], apex, false);
					ctx.drawEllipse(cx, topY, R, e);
					let Rl = k * R;
					let el = k * e;
					ctx.drawEllipse(cx, yL, Rl, el, 0, 0, Math.PI);
					ctx.setLineDash([6, 4]);
					ctx.drawEllipse(cx, yL, Rl, el, 0, Math.PI, 2 * Math.PI);
					ctx.setLineDash([]);
				} else {
					let rim = rimPoly();
					let liq = rim.map((p) => [apex[0] + k * (p[0] - apex[0]), apex[1] + k * (p[1] - apex[1])]);
					strokePoly(rim);
					for (let i = 0; i < rim.length; i++)
						strokeSeg(rim[i], apex, false);
					let dashedIdx = (type === 'pyr3') ? [1, 2] : [2];
					for (let i = 0; i < liq.length; i++)
						strokeSeg(liq[i], liq[(i + 1) % liq.length], dashedIdx.includes(i));
				}
			} else {
				if (type === 'cyl') {
					strokeSeg([cx - R, topY], [cx - R, botY], false);
					strokeSeg([cx + R, topY], [cx + R, botY], false);
					ctx.drawEllipse(cx, topY, R, e);
					ctx.drawEllipse(cx, yL, R, e, 0, 0, Math.PI);
					ctx.setLineDash([6, 4]);
					ctx.drawEllipse(cx, yL, R, e, 0, Math.PI, 2 * Math.PI);
					ctx.drawEllipse(cx, botY, R, e, 0, Math.PI, 2 * Math.PI);
					ctx.setLineDash([]);
					ctx.drawEllipse(cx, botY, R, e, 0, 0, Math.PI);
				} else {
					let rim = rimPoly();
					let dy = yL - topY;
					let surf = rim.map((p) => [p[0], p[1] + dy]);
					let base = rim.map((p) => [p[0], p[1] + H]);
					strokePoly(rim);
					for (let i = 0; i < rim.length; i++)
						strokeSeg(rim[i], base[i], false);
					strokePoly(surf, [2]);
					strokePoly(base, [2]);
				}
			}

			// --- ось сосуда и точка в центре верхнего основания ---
			ctx.setLineDash([6, 4]);
			ctx.drawLine(cx, topY, cx, botY);
			ctx.setLineDash([]);
			ctx.fillStyle = lineColor;
			ctx.fillKrug(cx, topY, 3);
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
