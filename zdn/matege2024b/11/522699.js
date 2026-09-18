(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let r1 = sl(2, 10, 1);
		let l1 = sl(r1 + 1, 15, 1);
		let r2 = sl(1, 8, 1);
		let l2 = sl(r2 + 1, 12, 1);

		let s1 = r1 * l1;
		let s2 = r2 * l2;

		if (s1 <= s2) throw new Error('s1 must be greater than s2');

		let ratio = s1 / s2;

		let ratioTimes10 = ratio * 10;
		if (Math.abs(ratioTimes10 - Math.round(ratioTimes10)) > 1e-9) throw new Error('Ratio is not nice');

		if (ratio > 10) throw new Error('Ratio too large');

		genAssertZ1000(ratio);

		let h1 = Math.sqrt(l1 * l1 - r1 * r1);
		let h2 = Math.sqrt(l2 * l2 - r2 * r2);

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

		NAtask.setTask({
			text: `Даны два конуса. Радиус основания и образующая первого конуса равны соответственно $${r1}$ и $${l1}$, а второго — $${r2}$ и $${l2}$. Во сколько раз площадь боковой поверхности первого конуса больше площади боковой поверхности второго?`,
			answers: ratio,
			analys: `Площадь боковой поверхности конуса вычисляется по формуле $S = \\pi r l$, где $r$ — радиус основания, $l$ — образующая. ` +
				`Площадь боковой поверхности первого конуса: $S_1 = \\pi \\cdot ${r1} \\cdot ${l1} = ${s1}\\pi$. ` +
				`Площадь боковой поверхности второго конуса: $S_2 = \\pi \\cdot ${r2} \\cdot ${l2} = ${s2}\\pi$. ` +
				`Найдём отношение площадей: $\\frac{S_1}{S_2} = \\frac{${s1}\\pi}{${s2}\\pi} = \\frac{${s1}}{${s2}} = ${ratio}$.`
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
