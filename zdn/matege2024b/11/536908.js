(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '536908';
		let preference = ['cutCone', 'frustum'];
		let questionType = getSelectedPreferenceFromList(key, preference);

		//Точка делит высоту конуса в отношении a : b (несократимом),
		//d = a + b - знаменатель коэффициента подобия отсекаемого конуса
		let d = sl(2, 5);
		let a = sl(1, d - 1);
		genAssert(a.nod(d) == 1, 'Отношение частей высоты должно быть несократимым');
		let b = d - a;

		let fromVertex = sl1(); //1 - считая от вершины, 0 - считая от основания
		let k = fromVertex ? a : b; //числитель коэффициента подобия отсекаемого конуса
		genAssert(4 * k <= 3 * d, 'Сечение не должно проходить слишком близко к основанию');

		let n = sl(1, 9);
		let V = n * d.pow(3); //объём данного конуса - всегда целое
		let smallCone = n * k.pow(3); //объём отсекаемого конуса
		let restPart = V - smallCone; //объём оставшейся части
		let kk = k / d; //коэффициент подобия для чертежа

		let paint1 = function (ct) {
			let w = 400;
			let h = 400;
			let H = 230; //высота конуса на чертеже
			let R = 130; //радиус основания на чертеже
			let ry = 36; //перспективное сжатие основания

			ct.translate(w / 2, h / 2 + 60);
			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.lineWidth = 2;

			//основание: дальняя половина - пунктиром, ближняя - сплошной
			ct.setLineDash([7, 5]);
			ct.drawEllipse(0, 0, R, ry, 0, Math.PI, 2 * Math.PI);
			ct.setLineDash([]);
			ct.drawEllipse(0, 0, R, ry, 0, 0, Math.PI);

			//образующие
			ct.drawLine(0, -H, -R, 0);
			ct.drawLine(0, -H, R, 0);

			//сечение, параллельное основанию
			let ys = -H * (1 - kk);
			let rs = R * kk;
			let rys = ry * kk;
			let savedFill = ct.fillStyle;
			ct.fillStyle = om.transparentBrandColors.iz();
			ct.beginPath();
			ct.ellipse(0, ys, rs, rys, 0, 0, 2 * Math.PI);
			ct.fill();
			ct.fillStyle = savedFill;
			ct.setLineDash([7, 5]);
			ct.drawEllipse(0, ys, rs, rys, 0, Math.PI, 2 * Math.PI);
			ct.setLineDash([]);
			ct.drawEllipse(0, ys, rs, rys, 0, 0, Math.PI);

			//высота конуса
			ct.lineWidth = 1;
			ct.drawLine(0, -H, 0, 0);
			ct.fillKrug(0, 0, 3);
		};

		let analys = 'Проведённая плоскость отсекает от данного конуса конус, подобный данному, ' +
			'с коэффициентом подобия $\\frac{' + k + '}{' + d + '}$ (отношение высот). ' +
			'Объёмы подобных тел относятся как кубы коэффициентов подобия, поэтому объём отсекаемого конуса равен $' +
			V + '\\cdot\\frac{' + k.pow(3) + '}{' + d.pow(3) + '}=' + smallCone + '$.';
		if (questionType)
			analys += ' Объём оставшейся части конуса равен $' + V + '-' + smallCone + '=' + restPart + '$.';

		NAtask.setTask({
			text: 'Объём данного конуса равен ' + V +
				'. Через точку, делящую высоту конуса в отношении ' + a + ' : ' + b +
				', считая от ' + ['основания', 'вершины'][fromVertex] +
				', проведена плоскость, параллельная основанию. ' +
				['Найдите объём конуса, отсекаемого от данного конуса проведённой плоскостью.',
					'Найдите объём оставшейся части конуса.'][questionType],
			analys: analys,
			answers: [smallCone, restPart][questionType],
			authors: ['chas-ege-selena'],
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//536908
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=536908
