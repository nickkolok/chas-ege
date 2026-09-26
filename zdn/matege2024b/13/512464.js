//13. Задание 13 № 512464
//Найдите объём правильной четырёхугольной пирамиды, сторона основания
//которой равна 4, а боковое ребро равно 2√11.

(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);

	let a = [2, 4, 6, 8, 12].iz(); //сторона основания
	let H = (a % 6 == 0) ? sl(5, 12) : 3 * sl(1, 4); //высота пирамиды
	genAssert(H > 0.75 * a, 'Вершина пирамиды ниже верхнего ребра основания - чертёж нечитаем');

	let l2 = H * H + a * a / 2; //квадрат бокового ребра
	let lTex = l2.texsqrt(true);
	let V = a * a * H / 3;

	NAtask.setTask({
		text: [
			`Найдите объём правильной четырёхугольной пирамиды, сторона основания которой равна ${a}, а боковое ребро равно $${lTex}$.`,
			`У правильной четырёхугольной пирамиды сторона основания равна ${a}, а боковое ребро равно $${lTex}$. Найдите объём пирамиды.`,
		].iz(),
		answers: V,
		analys: `Высота правильной пирамиды проходит через центр основания. Диагональ квадратного основания со стороной ${a} равна $${a}\\sqrt{2}$, поэтому половина диагонали равна $${(a * a / 2).texsqrt(true)}$. Из прямоугольного треугольника, образованного высотой, половиной диагонали и боковым ребром, по теореме Пифагора $H=\\sqrt{\\left(${lTex}\\right)^2-\\left(${(a * a / 2).texsqrt(true)}\\right)^2}=\\sqrt{${l2}-${a * a / 2}}=${H}$. Площадь основания равна $${a * a}$, значит, объём пирамиды $V=\\frac{1}{3}\\cdot${a * a}\\cdot${H}=${V}$.`,
		authors: ['Селена'],
	});

	let canvasW = 320;
	let canvasH = 300;
	let angle = Math.PI / 6;
	NAtask.modifiers.addCanvasIllustration({
		width: canvasW,
		height: canvasH,
		paint: function(ct) {
			let figW = a * (1 + angle.cos());
			let figH = H + (a - a * angle.sin()) / 2;
			let u = Math.min((canvasW - 40) / figW, (canvasH - 40) / figH);
			let edgePx = a * u;
			let heightPx = H * u;
			let figX = edgePx * (1 + angle.cos());
			let apexY = heightPx - edgePx * (1 + angle.sin()) / 2;
			let figY = apexY + edgePx;
			ct.save();
			ct.translate((canvasW - figX) / 2, (canvasH - figY) / 2 + apexY);
			ct.scale(1, -1);
			ct.drawRightPyramid4({
				edge: edgePx,
				height: heightPx,
				angle: angle,
				strokeStyle: 'black',
			}, [1, 3, 6], [5, 2], true);
			ct.fillKrug(figX / 2, -edgePx * (1 + angle.sin()) / 2, 2);
			ct.restore();
		},
	});
})();
//512464
//Селена (chas-ege-selena)
