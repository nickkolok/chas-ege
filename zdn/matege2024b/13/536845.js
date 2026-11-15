(function(){
	'use strict';
	retryWhileError(function(){
		NAinfo.requireApiVersion(0, 2);
		let key = '536845';
		let preference = ['findTotalGivenSmall', 'findSmallGivenTotal', 'findTotalGivenFrustum', 'findFrustumGivenTotal'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let n = sl(2, 5);
		let m = sl(1, n - 1);
		let k1 = m;
		let k2 = n - m;

		let X = sl(1, 10);
		let V_small = X * m**3;
		let V_total = X * n**3;
		let V_frustum = V_total - V_small;

		// Варианты формулировок вопросов и ответы к ним
		let questions = [
			"Найдите объём данного конуса, если объём конуса, отсечённого проведённой плоскостью, равен " + V_small + ".",
			"Найдите объём конуса, отсечённого проведённой плоскостью, если объём данного конуса равен " + V_total + ".",
			"Найдите объём данного конуса, если объём усечённого конуса, отсечённого проведённой плоскостью, равен " + V_frustum + ".",
			"Найдите объём усечённого конуса, отсечённого проведённой плоскостью, если объём данного конуса равен " + V_total + ".",
		];
		let answers = [V_total, V_small, V_total, V_frustum];

		let text = "Через точку, делящую высоту конуса в отношении " + k1 + " : " + k2 + ", считая от вершины, проведена плоскость, параллельная основанию. " + questions[rand];

		// Создаём объекты конусов для хранения геометрических параметров
		let mainConeRadius = sl(4, 8);
		let mainConeHeight = sl(8, 15);
		let mainCone = new Cone({ radius: mainConeRadius, height: mainConeHeight });
		
		let k = m / n;
		let cutCone = new Cone({ 
			radius: mainCone.radius * k, 
			height: mainCone.height * k 
		});

		// Цвета чертежа выбираем на этапе генерации - отрисовка детерминирована
		let mainColor = om.secondaryBrandColors[0];
		let cutColorIdx = sl(0, om.primaryBrandColors.length - 1);
		let cutOutline = om.primaryBrandColors[cutColorIdx];
		let cutFill = om.transparentBrandColors[cutColorIdx];

		NAtask.setTask({
			text: text,
			answers: answers[rand],
			preference: preference,
		});

		NAtask.modifiers.allDecimalsToStandard();

		NAtask.modifiers.addCanvasIllustration({
			width: 320,
			height: 340,
			paint: function(ctx){
				let R = 120;                 // горизонтальный радиус основания, px
				let ry = 30;                 // вертикальный радиус основания (перспектива), px
				let cx = 160;                // ось конуса по горизонтали
				let apexY = 20;              // вершина конуса
				let baseY = 300;             // центр основания
				let H = baseY - apexY;       // высота конуса, px

				// Сечение подобно основанию с коэффициентом m/n - чертёж пропорционален условию
				let cutY = apexY + H * k;
				let rCut = R * k;
				let ryCut = ry * k;

				ctx.lineWidth = 2;
				ctx.strokeStyle = mainColor;

				// Основание: дальняя дуга пунктиром (скрыта), ближняя - сплошная
				ctx.setLineDash([7, 5]);
				ctx.drawEllipse(cx, baseY, R, ry, 0, Math.PI, 2 * Math.PI);
				ctx.setLineDash([]);
				ctx.drawEllipse(cx, baseY, R, ry, 0, 0, Math.PI);

				// Образующие
				ctx.drawLine(cx, apexY, cx - R, baseY);
				ctx.drawLine(cx, apexY, cx + R, baseY);

				// Секущая плоскость: заливка и контур в парном брендовом оттенке
				ctx.beginPath();
				ctx.ellipse(cx, cutY, rCut, ryCut, 0, 0, 2 * Math.PI);
				ctx.fillStyle = cutFill;
				ctx.fill();
				ctx.strokeStyle = cutOutline;
				ctx.setLineDash([7, 5]);
				ctx.drawEllipse(cx, cutY, rCut, ryCut, 0, Math.PI, 2 * Math.PI);
				ctx.setLineDash([]);
				ctx.drawEllipse(cx, cutY, rCut, ryCut, 0, 0, Math.PI);

				// Ось (высота) конуса - пунктиром
				ctx.strokeStyle = mainColor;
				ctx.setLineDash([7, 5]);
				ctx.drawLine(cx, apexY, cx, baseY);
				ctx.setLineDash([]);

				// Центр основания
				ctx.beginPath();
				ctx.arc(cx, baseY, 2.5, 0, 2 * Math.PI);
				ctx.fillStyle = mainColor;
				ctx.fill();
			},
		});
	}, 20000);
})();
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=536845
