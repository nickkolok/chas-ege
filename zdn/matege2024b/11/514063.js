(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let S = sl(4, 10) * 10; // площадь основания бака, см²
		let dh = sl(4, 12); // поднятие уровня жидкости, см
		let h1 = sl(8, 14); // уровень жидкости до погружения, см
		let hRest = sl(4, 8); // от нового уровня до края бака, см
		let H = h1 + dh + hRest; // высота бака, см

		let paint = function (ct) {
			let k = 300 / H; // пикселей на сантиметр
			let R = Math.sqrt(S / Math.PI) * k; // радиус основания, px
			let e = 0.35 * R; // вертикальная полуось эллипсов, px
			let cx = 160;
			let yBottom = 350;
			let yTop = yBottom - H * k;
			let yL = yBottom - h1 * k; // уровень до погружения
			let yN = yBottom - (h1 + dh) * k; // уровень после погружения

			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			// жидкость: эллипс поверхности + прямоугольник стенки + эллипс дна
			ct.fillStyle = om.transparentBrandColors.iz();
			ct.beginPath();
			ct.ellipse(cx, yL, R, e, 0, 0, 2 * Math.PI);
			ct.fill();
			ct.beginPath();
			ct.rect(cx - R, yL, 2 * R, yBottom - yL);
			ct.fill();
			ct.beginPath();
			ct.ellipse(cx, yBottom, R, e, 0, 0, 2 * Math.PI);
			ct.fill();

			// стенки бака
			ct.drawLine(cx - R, yTop, cx - R, yBottom);
			ct.drawLine(cx + R, yTop, cx + R, yBottom);

			// верхний обод
			ct.drawEllipse(cx, yTop, R, e);

			// дно и уровни жидкости: передняя половина сплошная, задняя пунктиром
			[yBottom, yL, yN].forEach(function (y) {
				ct.beginPath();
				ct.ellipse(cx, y, R, e, 0, 0, Math.PI);
				ct.stroke();
				ct.setLineDash([6, 4]);
				ct.beginPath();
				ct.ellipse(cx, y, R, e, 0, Math.PI, 2 * Math.PI);
				ct.stroke();
				ct.setLineDash([]);
			});
		};

		NAtask.setTask({
			text: 'В бак цилиндрической формы, площадь основания которого равна $' + S + '$ квадратным сантиметрам, ' +
				'налита жидкость. Чтобы измерить объём детали сложной формы, её полностью погружают в эту жидкость. ' +
				'Найдите объём детали, если после её погружения уровень жидкости в баке поднялся на $' + dh + '$ см. ' +
				'Ответ дайте в кубических сантиметрах.',
			answers: S * dh,
			analys: 'Объём детали равен объёму вытесненной жидкости: произведению площади основания бака ' +
				'на высоту поднятия уровня, то есть $' + S + '\\cdot ' + dh + '=' + S * dh + '$ кубических сантиметров.',
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 320,
			height: 400,
			paint: paint,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
