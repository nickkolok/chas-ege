//13. Задание 13 № 512464
//Найдите объём правильной четырёхугольной пирамиды, сторона основания
//которой равна 4, а боковое ребро равно 2√11.

(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	let a = [2, 4, 6, 8, 12].iz(); //сторона основания
	let H;
	// Объём a^2*H/3 должен быть целым: при a, не кратном 3, высота кратна 3.
	// Наборы ФИПИ (FB0748): a = 4 при H = 3 и 6; a = 6 при H = 3...8; a = 8 при H = 3.
	// Плоские пирамиды (H = 3 при a = 8) иглой не являются, а самые высокие
	// (H = 12 при a = 4) вытянуты в 1:3 - чертёж остаётся читаемым. Отношение
	// H : a держим в пределах от 3 : 8 (самая плоская пирамида ФИПИ) до 3 : 1.
	// При a = 2 высоты 9 и 12 дают иглу 1:4.5...1:6 (md/task_geometry.md), их нет.
	switch (a) {
		case 2: H = [3, 6].iz(); break;
		case 4: H = [3, 6, 9, 12].iz(); break;
		case 6: H = sl(3, 12); break;
		case 8: H = [3, 6, 9, 12].iz(); break;
		case 12: H = sl(5, 12); break;
	}

	let l2 = H * H + a * a / 2; //квадрат бокового ребра
	let lTex = l2.texsqrt(true);
	let V = a * a * H / 3;

	NAtask.setTask({
		text: [
			`Найдите объём правильной четырёхугольной пирамиды, сторона основания которой равна $${a}$, а боковое ребро равно $${lTex}$.`,
			`У правильной четырёхугольной пирамиды сторона основания равна $${a}$, а боковое ребро равно $${lTex}$. Найдите объём пирамиды.`,
		].iz(),
		answers: V,
		analys: `Высота правильной пирамиды проходит через центр основания. Диагональ квадратного основания со стороной $${a}$ равна $${a}\\sqrt{2}$, поэтому половина диагонали равна $${(a * a / 2).texsqrt(true)}$. Из прямоугольного треугольника, образованного высотой, половиной диагонали и боковым ребром, по теореме Пифагора $H=\\sqrt{\\left(${lTex}\\right)^2-\\left(${(a * a / 2).texsqrt(true)}\\right)^2}=\\sqrt{${l2}-${a * a / 2}}=${H}$. Площадь основания равна $${a * a}$, значит, объём пирамиды $V=\\frac{1}{3}\\cdot${a * a}\\cdot${H}=${V}$.`,
		authors: ['chas-ege-selena'],
	});

	let canvasW = 320;
	let canvasH = 300;
	let angle = Math.PI / 6;
	NAtask.modifiers.addCanvasIllustration({
		width: canvasW,
		height: canvasH,
		paint: function(ct) {
			let figW = a * (1 + Math.cos(angle));
			let figH = H + (a - a * Math.sin(angle)) / 2;
			let u = Math.min((canvasW - 40) / figW, (canvasH - 40) / figH);
			let edgePx = a * u;
			let heightPx = H * u;
			let figX = edgePx * (1 + Math.cos(angle));
			let apexY = heightPx - edgePx * (1 + Math.sin(angle)) / 2;
			let figY = apexY + edgePx;
			ct.save();
			ct.translate((canvasW - figX) / 2, (canvasH - figY) / 2 + apexY);
			ct.scale(1, -1);
			ct.lineWidth = 2;
			ct.drawRightPyramid4({
				edge: edgePx,
				height: heightPx,
				angle: angle,
				strokeStyle: om.secondaryBrandColors.iz(),
			}, [1, 3, 6], [5, 2], true);
			ct.fillStyle = om.secondaryBrandColors.iz();
			ct.fillKrug(figX / 2, -edgePx * (1 + Math.sin(angle)) / 2, 2);
			ct.restore();
		},
	});
})();
//512464
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=512464
