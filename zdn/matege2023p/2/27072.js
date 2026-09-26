(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('площадь', 'большого круга');
	let measurements = [{
		name: 'радиус',
		power: 1,
	}, {
		name: 'объём',
		power: 3,
	}, {
		name: 'площадь поверхности',
		power: 2,
	}, {
		name: 'площадь большого круга',
		power: 2,
	}, ].iz(2);
	
	let dilationCoefficient = sl(2, 3);
	
	let paint1 = function(ctx) {
		ctx.translate(-10, -40);
		ctx.lineWidth = 2;
		
		let isSurfaceArea = [measurements[0].name.ie, measurements[1].name.ie].includes('площадь поверхности');
		let isCircleArea = [measurements[0].name.ie, measurements[1].name.ie].includes('площадь большого круга');
		
		// Первый шар - базовый радиус
		let radius1 = 40;
		// Второй шар - радиус пропорционален коэффициенту
		let radius2 = radius1 * dilationCoefficient;
		
		// Цвета для шаров
		let color1 = om.secondaryBrandColors.iz();
		let color2 = om.secondaryBrandColors.iz();
		
		// Заливка (если нужно показать площадь)
		ctx.beginPath();
		if (isSurfaceArea)
			ctx.arc(100, 150, radius1, 0, Math.PI * 2, true);
		else if (isCircleArea)
			ctx.ellipse(100, 150, 20, radius1, Math.PI / 2, 0, 2 * Math.PI);
		
		ctx.fillStyle = color1;
		ctx.fill();
		ctx.closePath();

		//шар 1 - контур
		ctx.strokeStyle = color1;
		ctx.beginPath();
		ctx.arc(100, 150, radius1, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.closePath();

		ctx.drawEllipse(100, 150, 20, radius1, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

		ctx.setLineDash([5, 5]);
		ctx.drawEllipse(100, 150, 20, radius1, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
		ctx.setLineDash([]);

		ctx.drawLine(100, 150, 100 + radius1, 150);

		//шар 2
		ctx.translate(radius1 + radius2 + 20, 0);
		
		// Заливка
		ctx.beginPath();
		if (isSurfaceArea)
			ctx.arc(100, 150, radius2, 0, Math.PI * 2, true);
		else if (isCircleArea)
			ctx.ellipse(100, 150, 20, radius2, Math.PI / 2, 0, 2 * Math.PI);
		
		ctx.fillStyle = color2;
		ctx.fill();
		ctx.closePath();

		//шар 2 - контур
		ctx.strokeStyle = color2;
		ctx.beginPath();
		ctx.arc(100, 150, radius2, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.closePath();

		ctx.drawEllipse(100, 150, 20, radius2, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

		ctx.setLineDash([5, 5]);
		ctx.drawEllipse(100, 150, 20, radius2, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
		ctx.setLineDash([]);

		ctx.drawLine(100, 150, 100 + radius2, 150);
	};

	NAtask.setDilationTask({
		measurements: measurements,
		figureName: 'шар',
		dilationCoefficient: dilationCoefficient,
		authors: ['Суматохина Ася'],
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 250,
		paint: paint1,
	});
})();

//27072 5075 73287 520653 520694 26551 73243 73245 73247 73249 73251 73253 73255 73257 73259 73261 73263 73265 73267 73269 73271 73273 73275 73277 73279 73281 73283 73285  27097 74403 74405 74407 74409 74411 74413 74415
