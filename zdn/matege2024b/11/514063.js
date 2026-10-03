(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '514063';
		let preference = ['centimeters', 'liters'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let text, answers, analys;
		let S, dh, h1, hRest, H;

		if (rand === 0) {
			// centimeters — исходная версия
			S = sl(4, 10) * 10; // площадь основания бака, см²
			dh = sl(4, 12); // поднятие уровня жидкости, см
			h1 = sl(8, 14);
			hRest = sl(4, 8);
			H = h1 + dh + hRest;

			text = 'В бак цилиндрической формы, площадь основания которого равна $' + S + '$ квадратным сантиметрам, ' +
				'налита жидкость. Чтобы измерить объём детали сложной формы, её полностью погружают в эту жидкость. ' +
				'Найдите объём детали, если после её погружения уровень жидкости в баке поднялся на $' + dh + '$ см. ' +
				'Ответ дайте в кубических сантиметрах.';
			answers = S * dh;
			analys = 'Объём детали равен объёму вытесненной жидкости: произведению площади основания бака ' +
				'на высоту поднятия уровня, то есть $' + S + '\\cdot ' + dh + '=' + S * dh + '$ кубических сантиметров.';
		} else {
			// liters — новая версия
			let V_liters = sl(2, 10) * 10; // объём воды в литрах
			let multStep = sl(1, 5); // множитель k = 1 + multStep/10
			let k = 1 + multStep / 10; // например, 1.2
			// Ответ: V_l * 1000 * (k - 1) = V_l * 100 * multStep
			let V_cm3 = V_liters * 1000;
			let newLevel = V_cm3 * k;
			let answer = newLevel - V_cm3;

			// Для чертежа подберём площадь основания и уровни так, чтобы пропорции совпадали
			S = sl(4, 10) * 10;
			h1 = V_cm3 / S;
			dh = h1 * (k - 1);
			hRest = sl(4, 8);
			H = h1 + dh + hRest;

			text = 'В бак, имеющий форму цилиндра, налито $' + V_liters + '$ л воды. После полного погружения в воду детали ' +
				'уровень воды в баке поднялся в $' + k.toFixed(1) + '$ раза. Найдите объём детали. ' +
				'Ответ дайте в кубических сантиметрах, зная, что в одном литре $1000$ кубических сантиметров.';
			answers = answer;
			analys = 'Начальный объём воды: $' + V_liters + '\\cdot 1000 = ' + V_cm3 + '$ см³. ' +
				'После погружения детали объём воды и детали вместе составил $' + V_cm3 + '\\cdot ' + k.toFixed(1) + ' = ' + newLevel + '$ см³. ' +
				'Объём детали равен разности этих объёмов: $' + newLevel + ' - ' + V_cm3 + ' = ' + answer + '$ см³.';
		}

		let paint = function (ct) {
			let kScale = 300 / H;
			let R = Math.sqrt(S / Math.PI) * kScale;
			let e = 0.35 * R;
			let cx = 160;
			let yBottom = 350;
			let yTop = yBottom - H * kScale;
			let yL = yBottom - h1 * kScale;
			let yN = yBottom - (h1 + dh) * kScale;

			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();

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

			ct.drawLine(cx - R, yTop, cx - R, yBottom);
			ct.drawLine(cx + R, yTop, cx + R, yBottom);
			ct.drawEllipse(cx, yTop, R, e);

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
			text: text,
			answers: answers,
			analys: analys,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 320,
			height: 400,
			paint: paint,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
