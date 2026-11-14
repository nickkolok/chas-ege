(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	// У ФИПИ (FB2C42, 578969) точка смены цвета - всегда середина образующей.
	// Точка, делящая образующую в заданном отношении, - расширение прототипа,
	// поэтому оно включается через preference. Ветку выбираем до retryWhileError,
	// чтобы отбраковка не меняла частоту веток.
	let key = '16460866';
	let preference = ['midpoint', 'ratio'];
	let midpoint = getSelectedPreferenceFromList(key, preference) === 0;

	retryWhileError(function () {
		// Угол наклона образующей к основанию - 60°, как у ФИПИ: тогда
		// cos 60° = 1/2 и образующая l = r / cos 60° = 2r целая. При других
		// табличных углах (30°, 45°) образующая иррациональна.
		//
		// Доля образующей от вершины до точки смены цвета: p / (p + q).
		// Отношение - несократимое и не 1 : 1; радиус - из тех, при которых
		// расстояние до точки - не больше двух знаков после запятой. Выбираем
		// из подходящих, а не отбраковкой: иначе малые радиусы выпадали бы чаще.
		let p = 1, q = 1;
		if (!midpoint) {
			let ratios = [];
			for (let a = 1; a <= 4; a++) {
				for (let b = 1; b <= 4; b++) {
					if (a !== b && a.nod(b) === 1) {
						ratios.push([a, b]);
					}
				}
			}
			let ratio = ratios.iz();
			p = ratio[0];
			q = ratio[1];
		}
		let t = p / (p + q);
		let radii = [];
		for (let x = 2; x <= 12; x++) {
			if ((2 * x * t * 100).isAlmostInteger()) {
				radii.push(x);
			}
		}
		let r = radii.iz();
		let l = 2 * r;
		let ans = Math.round(l * t * 100) / 100;

		let pointText = midpoint ?
			', угол $60^\\circ$, точка смены цвета — середина образующей.' :
			', угол $60^\\circ$; точка смены цвета делит образующую в отношении $' + p + ' : ' + q + '$, считая от вершины.';

		let analys = 'Высота, радиус основания и образующая конуса образуют прямоугольный треугольник, ' +
			'в котором радиус — катет, прилежащий к углу $60^\\circ$ между образующей и основанием. ' +
			'Поэтому $r = l \\cos 60^\\circ = \\frac{l}{2}$, и образующая $l = 2r = ' + l + '$ см. ' +
			(midpoint ?
				'Середина образующей удалена от вершины на $\\frac{l}{2} = ' + ans + '$ см.' :
				'Точка смены цвета удалена от вершины на $\\frac{' + p + '}{' + (p + q) + '} \\cdot ' + l + ' = ' + ans + '$ см.');

		NAtask.setTask({
			text: 'Для печати на 3D-принтере двухцветного конуса используются три параметра: радиус основания, ' +
				'угол наклона образующей к основанию и точка смены цвета на образующей. ' +
				'В программу введены: радиус $' + r + '$ см' + pointText + ' ' +
				'На каком расстоянии от вершины конуса будет отмечена точка смены цвета? Ответ дайте в сантиметрах.',
			answers: ans,
			analys: analys,
			authors: ['chas-ege-ellariya'],
			preference: [preference],
		});

		// Чертёж, как у ФИПИ: конус, высота и радиус основания пунктиром,
		// образующая к концу этого радиуса и точка смены цвета на ней.
		// Пропорции - настоящие: высота r * tg 60° = r * sqrt(3).
		// Часть поверхности ниже точки смены цвета закрашена вторым цветом.
		let paint = function (ct) {
			let w = ct.canvas.width;
			let h = ct.canvas.height;
			let R = 0.36 * w;
			let ry = 0.28 * R;
			let H = Math.min(R * Math.sqrt(3), h - 2 * ry - 24);
			R = H / Math.sqrt(3);
			ry = 0.28 * R;
			let cx = w / 2;
			let apexY = (h - H - ry) / 2;
			let baseY = apexY + H;

			let edgeColor = om.secondaryBrandColors.iz();
			let fillColor = om.transparentBrandColors.iz();

			// Точка основания, к которой идёт образующая: передняя правая
			let phi = 0.32 * Math.PI;
			let bx = cx + R * Math.cos(phi);
			let by = baseY + ry * Math.sin(phi);
			// Точка смены цвета и окружность смены цвета на поверхности
			let px = cx + t * (bx - cx);
			let py = apexY + t * (by - apexY);
			let cy = apexY + t * H;
			let cr = t * R, cry = t * ry;

			// Нижняя часть поверхности (под окружностью смены цвета) - вторым цветом
			ct.beginPath();
			ct.moveTo(cx - cr, cy);
			ct.lineTo(cx - R, baseY);
			ct.ellipse(cx, baseY, R, ry, 0, Math.PI, 0, true);
			ct.lineTo(cx + cr, cy);
			ct.ellipse(cx, cy, cr, cry, 0, 0, Math.PI, false);
			ct.closePath();
			ct.fillStyle = fillColor;
			ct.fill();

			ct.lineWidth = 2;
			ct.strokeStyle = edgeColor;
			// Образующие контура и основание: передняя дуга сплошная, задняя пунктирная
			ct.drawLine(cx, apexY, cx - R, baseY);
			ct.drawLine(cx, apexY, cx + R, baseY);
			ct.drawEllipse(cx, baseY, R, ry, 0, 0, Math.PI);
			ct.drawEllipse(cx, cy, cr, cry, 0, 0, Math.PI);
			ct.setLineDash([6, 4]);
			ct.drawEllipse(cx, baseY, R, ry, 0, Math.PI, 2 * Math.PI);
			ct.drawEllipse(cx, cy, cr, cry, 0, Math.PI, 2 * Math.PI);
			// Высота и радиус основания - внутри конуса
			ct.drawLine(cx, apexY, cx, baseY);
			ct.drawLine(cx, baseY, bx, by);
			ct.setLineDash([]);
			// Образующая к концу радиуса и точка смены цвета
			ct.drawLine(cx, apexY, bx, by);
			ct.fillStyle = edgeColor;
			ct.fillKrug(px, py, 3.5);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 260,
			height: 300,
			paint: paint,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
//16460866
//Открытый банк заданий FB2C42, 578969
//chas-ege-ellariya
