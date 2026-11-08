(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4).concat('O');
		let key = '1930';
		let preference = ['inscribed_angle', 'central_angle'];
		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));
		
		let danoOrFind = [[`COD`, `BOA`].iz(), [`ACD`,`BDC`].iz()];

		let circle = new Circle(new Point(0, 0), 180);

		let angle = slKrome(45, 30, 80);
		let AC = circle.diameter(angle, {
			angleInDegrees: true
		});
		let BD = circle.diameter(-angle, {
			angleInDegrees: true
		});

		let connectionMatrix = [
			[0],
			[1, 0],
			[0, 1, 1]
		];

		let points = [AC.pe, BD.ps, AC.ps, BD.pe, circle.pc];
		
		let angles = [180 - 2*angle, angle];

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, connectionMatrix);
			ctx.drawArc(0, 0, 180, 0, 2 * Math.PI);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В окружности с центром $O$ отрезки $AC $ и $BD$ – диаметры. 
			${[`Центральный`, `Вписанный`][rand]} угол $${danoOrFind[rand]}$ равен $${angles[rand]}^\\circ$. 
			Найдите угол $${danoOrFind[1-rand]}$. Ответ дайте в градусах.`,
			answers: angles[1-rand],
			authors: ['Александра Суматохина'],
			preference
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=&parent=1930
